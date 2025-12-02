-- Add tables for prompt library and orders system
-- Run this after the initial schema

-- Shared designs/prompts library
CREATE TABLE IF NOT EXISTS shared_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  prompt TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  jewelry_type TEXT NOT NULL, -- ring, necklace, etc.
  style_tags TEXT[] DEFAULT '{}',
  materials TEXT[] DEFAULT '{}',
  estimated_price INTEGER, -- in cents
  pricing_breakdown JSONB,
  images JSONB, -- array of image objects
  is_public BOOLEAN DEFAULT true,
  total_orders INTEGER DEFAULT 0,
  total_revenue INTEGER DEFAULT 0, -- in cents
  creator_commission_rate DECIMAL(5,4) DEFAULT 0.05, -- 5%
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  featured_at TIMESTAMP,
  
  -- Search optimization (will use trigger instead of generated column)
  search_vector tsvector
);

-- Orders table  
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  shared_design_id UUID REFERENCES shared_designs(id) ON DELETE SET NULL,
  
  -- Order details
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'manufacturing', 'shipped', 'delivered', 'cancelled')),
  
  -- Pricing
  subtotal_cents INTEGER NOT NULL,
  discount_cents INTEGER DEFAULT 0,
  commission_cents INTEGER DEFAULT 0,
  total_cents INTEGER NOT NULL,
  
  -- Custom design details (if not from shared design)
  custom_prompt TEXT,
  custom_images JSONB,
  custom_pricing JSONB,
  
  -- Stripe payment info
  stripe_payment_intent_id TEXT,
  stripe_charge_id TEXT,
  
  -- Shipping
  shipping_address JSONB NOT NULL,
  tracking_number TEXT,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  shipped_at TIMESTAMP,
  delivered_at TIMESTAMP
);

-- User favorites
CREATE TABLE IF NOT EXISTS user_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  shared_design_id UUID REFERENCES shared_designs(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, shared_design_id)
);

-- Design shares/social media tracking
CREATE TABLE IF NOT EXISTS design_shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shared_design_id UUID REFERENCES shared_designs(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  platform TEXT NOT NULL, -- instagram, facebook, pinterest, etc.
  share_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Commission payments tracking
CREATE TABLE IF NOT EXISTS commission_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  shared_design_id UUID REFERENCES shared_designs(id) ON DELETE SET NULL,
  amount_cents INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'cancelled')),
  stripe_transfer_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_shared_designs_search ON shared_designs USING gin(search_vector);
CREATE INDEX IF NOT EXISTS idx_shared_designs_creator ON shared_designs(creator_id);
CREATE INDEX IF NOT EXISTS idx_shared_designs_public ON shared_designs(is_public) WHERE is_public = true;
CREATE INDEX IF NOT EXISTS idx_shared_designs_featured ON shared_designs(featured_at) WHERE featured_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_shared_designs_popular ON shared_designs(total_orders DESC);

CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created ON orders(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_user_favorites_user ON user_favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_design_shares_design ON design_shares(shared_design_id);

-- Row Level Security
ALTER TABLE shared_designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_shares ENABLE ROW LEVEL SECURITY;
ALTER TABLE commission_payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Shared designs: public designs visible to all, private only to creator
DROP POLICY IF EXISTS "Public designs are visible to everyone" ON shared_designs;
CREATE POLICY "Public designs are visible to everyone" ON shared_designs
  FOR SELECT USING (is_public = true OR auth.uid() = creator_id);

DROP POLICY IF EXISTS "Users can create shared designs" ON shared_designs;
CREATE POLICY "Users can create shared designs" ON shared_designs
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

DROP POLICY IF EXISTS "Users can update their own designs" ON shared_designs;
CREATE POLICY "Users can update their own designs" ON shared_designs
  FOR UPDATE USING (auth.uid() = creator_id);

-- Orders: users can only see their own orders
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
CREATE POLICY "Users can view their own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create orders" ON orders;
CREATE POLICY "Users can create orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own orders" ON orders;
CREATE POLICY "Users can update their own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

-- User favorites: users can only manage their own favorites
DROP POLICY IF EXISTS "Users can manage their own favorites" ON user_favorites;
CREATE POLICY "Users can manage their own favorites" ON user_favorites
  FOR ALL USING (auth.uid() = user_id);

-- Design shares: all authenticated users can create shares
DROP POLICY IF EXISTS "Authenticated users can create shares" ON design_shares;
CREATE POLICY "Authenticated users can create shares" ON design_shares
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Users can view all shares" ON design_shares;
CREATE POLICY "Users can view all shares" ON design_shares
  FOR SELECT TO authenticated;

-- Commission payments: creators can view their own payments
DROP POLICY IF EXISTS "Creators can view their commission payments" ON commission_payments;
CREATE POLICY "Creators can view their commission payments" ON commission_payments
  FOR SELECT USING (auth.uid() = creator_id);

-- Create function to update search vector
DROP FUNCTION IF EXISTS update_shared_designs_search_vector() CASCADE;
CREATE OR REPLACE FUNCTION update_shared_designs_search_vector()
RETURNS TRIGGER AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('english', NEW.title), 'A') ||
    setweight(to_tsvector('english', NEW.prompt), 'B') ||
    setweight(to_tsvector('english', array_to_string(NEW.tags, ' ')), 'C');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Create trigger to automatically update search vector
DROP TRIGGER IF EXISTS trigger_update_search_vector ON shared_designs;
CREATE TRIGGER trigger_update_search_vector
  BEFORE INSERT OR UPDATE ON shared_designs
  FOR EACH ROW
  EXECUTE FUNCTION update_shared_designs_search_vector();
