-- Create user_designs table for saved/private designs
-- This is separate from the complex designs workflow and shared_designs

CREATE TABLE IF NOT EXISTS public.user_designs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Design details
  title TEXT,
  prompt TEXT NOT NULL,
  images JSONB NOT NULL, -- Array of image objects with url, local_url, etc.
  specifications JSONB, -- Design specifications
  pricing_breakdown JSONB, -- Pricing details
  
  -- Metadata
  jewelry_type TEXT DEFAULT 'custom',
  style_tags TEXT[] DEFAULT '{}',
  materials JSONB DEFAULT '{}',
  status TEXT DEFAULT 'saved' CHECK (status IN ('saved', 'archived', 'ordered')),
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_designs_user_id ON public.user_designs(user_id);
CREATE INDEX IF NOT EXISTS idx_user_designs_created_at ON public.user_designs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_designs_status ON public.user_designs(status);

-- Enable Row Level Security
ALTER TABLE public.user_designs ENABLE ROW LEVEL SECURITY;

-- RLS Policies: users can only see and manage their own designs
CREATE POLICY "Users can view their own designs" 
  ON public.user_designs 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own designs" 
  ON public.user_designs 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own designs" 
  ON public.user_designs 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own designs" 
  ON public.user_designs 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_user_designs_updated_at
  BEFORE UPDATE ON public.user_designs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

