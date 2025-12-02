-- Create custom enums
CREATE TYPE design_status AS ENUM (
  'draft',
  'generating',
  'qa_review',
  'pending_approval',
  'approved',
  'rejected',
  'deposit_paid',
  'in_production',
  'completed'
);

CREATE TYPE shot_type AS ENUM (
  'packshot_front',
  'hero_angle',
  'macro_detail',
  'on_model_closeup',
  'on_model_lifestyle'
);

CREATE TYPE order_status AS ENUM (
  'deposit_pending',
  'deposit_paid',
  'in_production',
  'quality_check',
  'shipped',
  'delivered'
);

CREATE TYPE production_stage AS ENUM (
  'design_approved',
  'materials_sourced',
  'wax_model',
  'casting',
  'stone_setting',
  'polishing',
  'final_qa',
  'ready_to_ship'
);

-- Users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Celebrity collections table
CREATE TABLE IF NOT EXISTS public.celebrity_collections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Designs table
CREATE TABLE IF NOT EXISTS public.designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status design_status DEFAULT 'draft',
  
  -- User input data
  intent TEXT NOT NULL,
  category TEXT NOT NULL,
  metal TEXT NOT NULL,
  karat TEXT NOT NULL,
  style_tags TEXT[] NOT NULL,
  price_band TEXT NOT NULL,
  stone_config JSONB NOT NULL,
  size_fit JSONB NOT NULL,
  user_vision TEXT NOT NULL,
  
  -- AI generated data
  design_spec JSONB,
  original_spec JSONB,
  user_facing_description TEXT,
  ai_adjustments_explanation TEXT,
  qa_score NUMERIC(3,2),
  qa_notes TEXT,
  
  -- Admin data
  final_price NUMERIC(10,2),
  lead_time_days INTEGER,
  jeweler_notes TEXT,
  approved_by UUID REFERENCES public.users(id),
  approved_at TIMESTAMPTZ,
  rejected_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Design images table
CREATE TABLE IF NOT EXISTS public.design_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  design_id UUID NOT NULL REFERENCES public.designs(id) ON DELETE CASCADE,
  shot_type shot_type NOT NULL,
  image_url TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  prompt TEXT NOT NULL,
  user_facing_description TEXT NOT NULL,
  vision_qa_score NUMERIC(3,2),
  vision_qa_notes TEXT,
  "order" INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Orders table
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  design_id UUID NOT NULL REFERENCES public.designs(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status order_status DEFAULT 'deposit_pending',
  deposit_amount NUMERIC(10,2) NOT NULL,
  final_amount NUMERIC(10,2) NOT NULL,
  
  -- Stripe data
  stripe_deposit_session_id TEXT,
  stripe_deposit_payment_id TEXT,
  stripe_final_session_id TEXT,
  stripe_final_payment_id TEXT,
  
  deposit_paid_at TIMESTAMPTZ,
  final_paid_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Production stages table
CREATE TABLE IF NOT EXISTS public.production_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  stage production_stage NOT NULL,
  completed BOOLEAN DEFAULT false,
  notes TEXT,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_designs_user_id ON public.designs(user_id);
CREATE INDEX idx_designs_status ON public.designs(status);
CREATE INDEX idx_design_images_design_id ON public.design_images(design_id);
CREATE INDEX idx_orders_user_id ON public.orders(user_id);
CREATE INDEX idx_orders_design_id ON public.orders(design_id);
CREATE INDEX idx_production_stages_order_id ON public.production_stages(order_id);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.celebrity_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.designs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.design_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.production_stages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- RLS Policies for celebrity_collections (public read)
CREATE POLICY "Anyone can view active collections"
  ON public.celebrity_collections FOR SELECT
  USING (is_active = true);

-- RLS Policies for designs
CREATE POLICY "Users can view own designs"
  ON public.designs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own designs"
  ON public.designs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own designs"
  ON public.designs FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for design_images
CREATE POLICY "Users can view images of own designs"
  ON public.design_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.designs
      WHERE designs.id = design_images.design_id
      AND designs.user_id = auth.uid()
    )
  );

-- RLS Policies for orders
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON public.orders FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for production_stages
CREATE POLICY "Users can view production stages of own orders"
  ON public.production_stages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = production_stages.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_designs_updated_at
  BEFORE UPDATE ON public.designs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket for design images (run this in Supabase dashboard or via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('design-images', 'design-images', true);
