-- ============================================================================
-- IMAGE STORAGE RLS AND SHARING SYSTEM
-- ============================================================================

-- Create table to track shared images with expiration
CREATE TABLE IF NOT EXISTS public.shared_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  design_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  share_token TEXT UNIQUE NOT NULL DEFAULT gen_random_uuid()::TEXT,
  image_paths JSONB NOT NULL, -- Array of storage paths
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  view_count INTEGER DEFAULT 0,
  last_viewed_at TIMESTAMPTZ
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_shared_images_token ON public.shared_images(share_token);
CREATE INDEX IF NOT EXISTS idx_shared_images_user ON public.shared_images(user_id);
CREATE INDEX IF NOT EXISTS idx_shared_images_expires ON public.shared_images(expires_at);

-- Enable RLS on shared_images table
ALTER TABLE public.shared_images ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own shared images
CREATE POLICY "Users can view own shared images"
  ON public.shared_images
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can create shares
CREATE POLICY "Users can create shares"
  ON public.shared_images
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own shares
CREATE POLICY "Users can delete own shares"
  ON public.shared_images
  FOR DELETE
  USING (auth.uid() = user_id);

-- Policy: Anyone can view non-expired shared images by token (for public links)
CREATE POLICY "Public can view valid shared images"
  ON public.shared_images
  FOR SELECT
  USING (expires_at > NOW());

-- ============================================================================
-- STORAGE BUCKET POLICIES FOR RLS
-- ============================================================================

-- First, make the bucket private (will be controlled by policies)
UPDATE storage.buckets 
SET public = false 
WHERE name = 'images';

-- Policy 1: Users can upload to their own folder
CREATE POLICY "Users can upload own images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'images' AND
    (auth.uid()::text = (storage.foldername(name))[1] OR
     (storage.foldername(name))[1] = 'anonymous')
  );

-- Policy 2: Users can view their own images
CREATE POLICY "Users can view own images"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- Policy 3: Anyone can view images that are shared via valid token
CREATE POLICY "Public can view shared images"
  ON storage.objects
  FOR SELECT
  USING (
    bucket_id = 'images' AND
    EXISTS (
      SELECT 1 FROM public.shared_images
      WHERE 
        expires_at > NOW() AND
        image_paths::jsonb ? name
    )
  );

-- Policy 4: Users can delete their own images
CREATE POLICY "Users can delete own images"
  ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'images' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to clean up expired shares
CREATE OR REPLACE FUNCTION cleanup_expired_shares()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.shared_images
  WHERE expires_at < NOW();
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_share_view(token TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.shared_images
  SET 
    view_count = view_count + 1,
    last_viewed_at = NOW()
  WHERE share_token = token AND expires_at > NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- SCHEDULED CLEANUP (optional - uncomment if pg_cron extension is available)
-- ============================================================================

-- Schedule cleanup of expired shares daily at midnight
-- SELECT cron.schedule(
--   'cleanup-expired-shares',
--   '0 0 * * *', -- Daily at midnight
--   $$SELECT cleanup_expired_shares();$$
-- );

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE public.shared_images IS 'Tracks publicly shared design images with 30-day expiration';
COMMENT ON COLUMN public.shared_images.share_token IS 'Unique token for public access URL';
COMMENT ON COLUMN public.shared_images.expires_at IS 'Automatic expiration after 30 days';
COMMENT ON COLUMN public.shared_images.image_paths IS 'JSON array of storage paths for this design';

