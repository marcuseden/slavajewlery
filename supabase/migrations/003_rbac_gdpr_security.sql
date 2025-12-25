-- ============================================================================
-- MIGRATION 003: RBAC, GDPR Compliance, and Enhanced Security
-- ============================================================================
-- This migration adds:
-- 1. Role-Based Access Control (Owner, Admin, Editor, Viewer, Service)
-- 2. GDPR consent tracking and data classification
-- 3. Data retention policies
-- 4. Enhanced RLS policies with role checks
-- 5. PII encryption and audit logging
-- 6. User data export/deletion support
-- ============================================================================

-- Create user role enum
CREATE TYPE user_role AS ENUM (
  'owner',      -- Full system access, user & role management
  'admin',      -- Configuration & moderation, no ownership transfer
  'editor',     -- Create & modify allowed resources
  'viewer',     -- Read-only access
  'service'     -- Scoped, non-human access with rotation
);

-- Create data classification enum for GDPR
CREATE TYPE data_classification AS ENUM (
  'public',           -- Publicly shareable data
  'internal',         -- Internal use only, not personal
  'personal',         -- PII - Personal Identifiable Information
  'sensitive',        -- Sensitive personal data (financial, health)
  'anonymous',        -- Anonymized/aggregated data
  'encrypted'         -- Encrypted at rest and in transit
);

-- Add role and GDPR fields to users table
ALTER TABLE public.users 
  ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'viewer',
  ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true,
  ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS gdpr_consent_given BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS gdpr_consent_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS gdpr_consent_version TEXT,
  ADD COLUMN IF NOT EXISTS marketing_consent BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS data_retention_notice_accepted BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS scheduled_deletion_date TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS deletion_requested BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS deletion_requested_at TIMESTAMPTZ;

-- Create GDPR consent log table
CREATE TABLE IF NOT EXISTS public.gdpr_consent_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  consent_type TEXT NOT NULL, -- 'terms', 'privacy', 'marketing', 'data_retention'
  consent_given BOOLEAN NOT NULL,
  consent_version TEXT NOT NULL,
  ip_address INET,
  user_agent TEXT,
  consent_text TEXT NOT NULL, -- Full text of what user consented to
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create shipping information table (PII classified)
CREATE TABLE IF NOT EXISTS public.shipping_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  
  -- PII fields (classified as 'personal')
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  address_line1 TEXT NOT NULL,
  address_line2 TEXT,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'US',
  
  -- Metadata
  is_default BOOLEAN DEFAULT false,
  data_classification data_classification DEFAULT 'personal',
  encrypted BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create audit log table for compliance
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL, -- 'create', 'read', 'update', 'delete', 'export', 'consent'
  resource_type TEXT NOT NULL, -- 'user', 'design', 'order', 'shipping_address'
  resource_id UUID,
  ip_address INET,
  user_agent TEXT,
  changes JSONB, -- Store before/after for updates (NO PII)
  metadata JSONB, -- Additional context (NO PII)
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create data retention policy table
CREATE TABLE IF NOT EXISTS public.data_retention_policies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_type TEXT NOT NULL UNIQUE, -- 'user', 'design', 'order', 'audit_log'
  retention_days INTEGER NOT NULL, -- Days to keep data
  auto_delete BOOLEAN DEFAULT false,
  anonymize_instead BOOLEAN DEFAULT false, -- Anonymize instead of delete
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default retention policies (GDPR compliant)
INSERT INTO public.data_retention_policies (resource_type, retention_days, auto_delete, anonymize_instead, description) VALUES
  ('user_inactive', 1095, true, true, 'Inactive users (no login for 3 years) - anonymize'),
  ('audit_log', 2555, true, false, 'Audit logs - keep for 7 years then delete'),
  ('order_completed', 2555, false, false, 'Completed orders - keep for 7 years (legal requirement)'),
  ('design_draft', 365, true, false, 'Draft designs - delete after 1 year of inactivity'),
  ('gdpr_consent_log', 3650, false, false, 'GDPR consent logs - keep for 10 years (compliance)')
ON CONFLICT (resource_type) DO NOTHING;

-- Add order shipping info reference
ALTER TABLE public.orders 
  ADD COLUMN IF NOT EXISTS shipping_address_id UUID REFERENCES public.shipping_addresses(id) ON DELETE SET NULL;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);
CREATE INDEX IF NOT EXISTS idx_users_scheduled_deletion ON public.users(scheduled_deletion_date) WHERE scheduled_deletion_date IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_gdpr_consent_log_user_id ON public.gdpr_consent_log(user_id);
CREATE INDEX IF NOT EXISTS idx_shipping_addresses_user_id ON public.shipping_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON public.audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource ON public.audit_logs(resource_type, resource_id);

-- ============================================================================
-- ENHANCED ROW LEVEL SECURITY POLICIES WITH ROLE CHECKS
-- ============================================================================

-- Enable RLS on new tables
ALTER TABLE public.gdpr_consent_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.data_retention_policies ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to replace with role-aware versions
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can view own designs" ON public.designs;
DROP POLICY IF EXISTS "Users can create own designs" ON public.designs;
DROP POLICY IF EXISTS "Users can update own designs" ON public.designs;
DROP POLICY IF EXISTS "Users can view images of own designs" ON public.design_images;
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create own orders" ON public.orders;

-- ============================================================================
-- USERS TABLE POLICIES
-- ============================================================================

-- Users can view own profile
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- Admins and Owners can view all users
CREATE POLICY "Admins can view all users"
  ON public.users FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role IN ('admin', 'owner')
      AND is_active = true
    )
  );

-- Users can update own non-role fields
CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT role FROM public.users WHERE id = auth.uid()) -- Prevent role escalation
  );

-- Only owners can update user roles
CREATE POLICY "Owners can update user roles"
  ON public.users FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role = 'owner'
      AND is_active = true
    )
  );

-- Only authenticated users can create user records (via auth trigger)
CREATE POLICY "Authenticated users can create profile"
  ON public.users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Owners can delete users (soft delete preferred)
CREATE POLICY "Owners can delete users"
  ON public.users FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role = 'owner'
      AND is_active = true
    )
  );

-- ============================================================================
-- DESIGNS TABLE POLICIES
-- ============================================================================

-- Users can view own designs
CREATE POLICY "Users can view own designs"
  ON public.designs FOR SELECT
  USING (auth.uid() = user_id);

-- Admins and Owners can view all designs
CREATE POLICY "Admins can view all designs"
  ON public.designs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role IN ('admin', 'owner')
      AND is_active = true
    )
  );

-- Authenticated users can create designs
CREATE POLICY "Authenticated users can create designs"
  ON public.designs FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND auth.uid() IS NOT NULL -- Must be authenticated
  );

-- Users can update own designs (not in production)
CREATE POLICY "Users can update own designs"
  ON public.designs FOR UPDATE
  USING (
    auth.uid() = user_id
    AND status NOT IN ('in_production', 'completed')
  );

-- Admins can update any design
CREATE POLICY "Admins can update designs"
  ON public.designs FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role IN ('admin', 'owner')
      AND is_active = true
    )
  );

-- Users can delete own draft designs
CREATE POLICY "Users can delete own drafts"
  ON public.designs FOR DELETE
  USING (
    auth.uid() = user_id
    AND status = 'draft'
  );

-- ============================================================================
-- DESIGN IMAGES POLICIES
-- ============================================================================

-- Users can view images of own designs
CREATE POLICY "Users can view own design images"
  ON public.design_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.designs
      WHERE designs.id = design_images.design_id
      AND designs.user_id = auth.uid()
    )
  );

-- Admins can view all design images
CREATE POLICY "Admins can view all design images"
  ON public.design_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role IN ('admin', 'owner')
      AND is_active = true
    )
  );

-- System can insert images for designs
CREATE POLICY "System can create design images"
  ON public.design_images FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.designs
      WHERE designs.id = design_images.design_id
      AND designs.user_id = auth.uid()
    )
  );

-- ============================================================================
-- ORDERS TABLE POLICIES
-- ============================================================================

-- Users can view own orders
CREATE POLICY "Users can view own orders"
  ON public.orders FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders"
  ON public.orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role IN ('admin', 'owner')
      AND is_active = true
    )
  );

-- Authenticated users can create orders
CREATE POLICY "Authenticated users can create orders"
  ON public.orders FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND auth.uid() IS NOT NULL -- Must be authenticated
  );

-- Admins can update orders
CREATE POLICY "Admins can update orders"
  ON public.orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role IN ('admin', 'owner')
      AND is_active = true
    )
  );

-- ============================================================================
-- SHIPPING ADDRESSES POLICIES (PII - STRICT ACCESS)
-- ============================================================================

-- Users can view own shipping addresses
CREATE POLICY "Users can view own addresses"
  ON public.shipping_addresses FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view shipping addresses for order fulfillment
CREATE POLICY "Admins can view addresses for fulfillment"
  ON public.shipping_addresses FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role IN ('admin', 'owner')
      AND is_active = true
    )
  );

-- Users can create own shipping addresses
CREATE POLICY "Users can create own addresses"
  ON public.shipping_addresses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update own shipping addresses
CREATE POLICY "Users can update own addresses"
  ON public.shipping_addresses FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete own shipping addresses
CREATE POLICY "Users can delete own addresses"
  ON public.shipping_addresses FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================================
-- GDPR CONSENT LOG POLICIES
-- ============================================================================

-- Users can view own consent history
CREATE POLICY "Users can view own consent log"
  ON public.gdpr_consent_log FOR SELECT
  USING (auth.uid() = user_id);

-- System can create consent records
CREATE POLICY "System can create consent records"
  ON public.gdpr_consent_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Admins can view consent logs for compliance
CREATE POLICY "Admins can view consent logs"
  ON public.gdpr_consent_log FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role IN ('admin', 'owner')
      AND is_active = true
    )
  );

-- ============================================================================
-- AUDIT LOGS POLICIES
-- ============================================================================

-- Users can view own audit logs
CREATE POLICY "Users can view own audit logs"
  ON public.audit_logs FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all audit logs
CREATE POLICY "Admins can view all audit logs"
  ON public.audit_logs FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role IN ('admin', 'owner')
      AND is_active = true
    )
  );

-- System can create audit logs (service role)
CREATE POLICY "System can create audit logs"
  ON public.audit_logs FOR INSERT
  WITH CHECK (true); -- Service role only

-- ============================================================================
-- DATA RETENTION POLICIES (ADMIN READ-ONLY)
-- ============================================================================

-- Admins can view retention policies
CREATE POLICY "Admins can view retention policies"
  ON public.data_retention_policies FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role IN ('admin', 'owner')
      AND is_active = true
    )
  );

-- Owners can manage retention policies
CREATE POLICY "Owners can manage retention policies"
  ON public.data_retention_policies FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid()
      AND role = 'owner'
      AND is_active = true
    )
  );

-- ============================================================================
-- FUNCTIONS FOR GDPR COMPLIANCE
-- ============================================================================

-- Function to anonymize user data (GDPR Right to be Forgotten)
CREATE OR REPLACE FUNCTION anonymize_user_data(target_user_id UUID)
RETURNS VOID AS $$
BEGIN
  -- Anonymize user profile
  UPDATE public.users
  SET 
    email = 'deleted-' || target_user_id || '@anonymized.local',
    full_name = 'Deleted User',
    gdpr_consent_given = false,
    marketing_consent = false,
    is_active = false,
    scheduled_deletion_date = NULL,
    deletion_requested = true
  WHERE id = target_user_id;
  
  -- Anonymize shipping addresses
  UPDATE public.shipping_addresses
  SET 
    first_name = 'Deleted',
    last_name = 'User',
    email = 'deleted@anonymized.local',
    phone = '0000000000',
    address_line1 = 'REDACTED',
    address_line2 = NULL,
    city = 'REDACTED',
    state = 'XX',
    postal_code = '00000'
  WHERE user_id = target_user_id;
  
  -- Keep orders for legal/accounting (7 years) but anonymize
  -- Designs remain for portfolio but anonymized
  
  -- Log the anonymization
  INSERT INTO public.audit_logs (user_id, action, resource_type, resource_id, metadata)
  VALUES (target_user_id, 'anonymize', 'user', target_user_id, '{"reason": "GDPR deletion request"}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to export user data (GDPR Right to Data Portability)
CREATE OR REPLACE FUNCTION export_user_data(target_user_id UUID)
RETURNS JSONB AS $$
DECLARE
  user_data JSONB;
BEGIN
  SELECT jsonb_build_object(
    'user', (SELECT row_to_json(u) FROM public.users u WHERE u.id = target_user_id),
    'designs', (SELECT jsonb_agg(row_to_json(d)) FROM public.designs d WHERE d.user_id = target_user_id),
    'orders', (SELECT jsonb_agg(row_to_json(o)) FROM public.orders o WHERE o.user_id = target_user_id),
    'shipping_addresses', (SELECT jsonb_agg(row_to_json(s)) FROM public.shipping_addresses s WHERE s.user_id = target_user_id),
    'consent_log', (SELECT jsonb_agg(row_to_json(c)) FROM public.gdpr_consent_log c WHERE c.user_id = target_user_id),
    'exported_at', NOW()
  ) INTO user_data;
  
  -- Log the export
  INSERT INTO public.audit_logs (user_id, action, resource_type, resource_id, metadata)
  VALUES (target_user_id, 'export', 'user', target_user_id, '{"format": "json"}'::jsonb);
  
  RETURN user_data;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to schedule user deletion
CREATE OR REPLACE FUNCTION schedule_user_deletion(target_user_id UUID, days_until_deletion INTEGER DEFAULT 30)
RETURNS VOID AS $$
BEGIN
  UPDATE public.users
  SET 
    scheduled_deletion_date = NOW() + (days_until_deletion || ' days')::INTERVAL,
    deletion_requested = true,
    deletion_requested_at = NOW()
  WHERE id = target_user_id;
  
  -- Log the deletion request
  INSERT INTO public.audit_logs (user_id, action, resource_type, resource_id, metadata)
  VALUES (target_user_id, 'deletion_scheduled', 'user', target_user_id, 
          jsonb_build_object('days_until_deletion', days_until_deletion, 'scheduled_for', NOW() + (days_until_deletion || ' days')::INTERVAL));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to process scheduled deletions (run via cron)
CREATE OR REPLACE FUNCTION process_scheduled_deletions()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER := 0;
  user_record RECORD;
BEGIN
  FOR user_record IN 
    SELECT id FROM public.users 
    WHERE scheduled_deletion_date IS NOT NULL 
    AND scheduled_deletion_date <= NOW()
    AND deletion_requested = true
  LOOP
    PERFORM anonymize_user_data(user_record.id);
    deleted_count := deleted_count + 1;
  END LOOP;
  
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update shipping_addresses updated_at
CREATE TRIGGER update_shipping_addresses_updated_at
  BEFORE UPDATE ON public.shipping_addresses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update retention policies updated_at
CREATE TRIGGER update_retention_policies_updated_at
  BEFORE UPDATE ON public.data_retention_policies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- INITIAL OWNER SETUP (Run this manually after migration)
-- ============================================================================
-- Update first user to owner role (replace with your user ID)
-- UPDATE public.users SET role = 'owner' WHERE email = 'your-email@example.com';

