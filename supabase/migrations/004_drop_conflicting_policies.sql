-- ============================================================================
-- MIGRATION 004: Clean up conflicting policies from previous migration attempts
-- ============================================================================
-- This migration drops all policies that may already exist before 003 recreates them
-- Run this BEFORE running 003_rbac_gdpr_security.sql if you get policy exists errors
-- ============================================================================

-- Drop all user table policies
DROP POLICY IF EXISTS users_select ON public.users;
DROP POLICY IF EXISTS users_update ON public.users;
DROP POLICY IF EXISTS users_insert ON public.users;
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Admins can view all users" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Owners can update user roles" ON public.users;
DROP POLICY IF EXISTS "Authenticated users can create profile" ON public.users;
DROP POLICY IF EXISTS "Owners can delete users" ON public.users;

-- Drop all design policies
DROP POLICY IF EXISTS designs_select ON public.designs;
DROP POLICY IF EXISTS designs_insert ON public.designs;
DROP POLICY IF EXISTS designs_update ON public.designs;
DROP POLICY IF EXISTS designs_delete ON public.designs;
DROP POLICY IF EXISTS "Users can view own designs" ON public.designs;
DROP POLICY IF EXISTS "Admins can view all designs" ON public.designs;
DROP POLICY IF EXISTS "Authenticated users can create designs" ON public.designs;
DROP POLICY IF EXISTS "Users can update own designs" ON public.designs;
DROP POLICY IF EXISTS "Admins can update designs" ON public.designs;
DROP POLICY IF EXISTS "Users can delete own drafts" ON public.designs;

-- Drop all design_images policies
DROP POLICY IF EXISTS design_images_select ON public.design_images;
DROP POLICY IF EXISTS design_images_insert ON public.design_images;
DROP POLICY IF EXISTS "Users can view own design images" ON public.design_images;
DROP POLICY IF EXISTS "Admins can view all design images" ON public.design_images;
DROP POLICY IF EXISTS "System can create design images" ON public.design_images;

-- Drop all order policies
DROP POLICY IF EXISTS orders_select ON public.orders;
DROP POLICY IF EXISTS orders_insert ON public.orders;
DROP POLICY IF EXISTS orders_update ON public.orders;
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Authenticated users can create orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;

-- Drop shipping address policies (only if table exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'shipping_addresses') THEN
    DROP POLICY IF EXISTS "Users can view own addresses" ON public.shipping_addresses;
    DROP POLICY IF EXISTS "Users can insert own addresses" ON public.shipping_addresses;
    DROP POLICY IF EXISTS "Users can update own addresses" ON public.shipping_addresses;
    DROP POLICY IF EXISTS "Users can delete own addresses" ON public.shipping_addresses;
    DROP POLICY IF EXISTS "Admins can view all addresses" ON public.shipping_addresses;
  END IF;
END $$;

-- Drop GDPR consent log policies (only if table exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'gdpr_consent_log') THEN
    DROP POLICY IF EXISTS "Users can view own consent log" ON public.gdpr_consent_log;
    DROP POLICY IF EXISTS "System can insert consent records" ON public.gdpr_consent_log;
    DROP POLICY IF EXISTS "Admins can view all consent logs" ON public.gdpr_consent_log;
  END IF;
END $$;

-- Drop audit log policies (only if table exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'audit_logs') THEN
    DROP POLICY IF EXISTS "Admins can view audit logs" ON public.audit_logs;
    DROP POLICY IF EXISTS "Owners can view all audit logs" ON public.audit_logs;
    DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;
  END IF;
END $$;

-- Drop retention policy policies (only if table exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'data_retention_policies') THEN
    DROP POLICY IF EXISTS "Admins can view retention policies" ON public.data_retention_policies;
    DROP POLICY IF EXISTS "Owners can manage retention policies" ON public.data_retention_policies;
  END IF;
END $$;

-- Drop user_designs policies (only if table exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'user_designs') THEN
    DROP POLICY IF EXISTS user_designs_select_own ON user_designs;
    DROP POLICY IF EXISTS user_designs_insert_own ON user_designs;
    DROP POLICY IF EXISTS user_designs_update_own ON user_designs;
    DROP POLICY IF EXISTS user_designs_delete_own ON user_designs;
    DROP POLICY IF EXISTS user_designs_select_public ON user_designs;
    DROP POLICY IF EXISTS user_designs_admin_all ON user_designs;
  END IF;
END $$;

-- Drop existing types if needed (uncomment if recreating from scratch)
-- DROP TYPE IF EXISTS user_role CASCADE;
-- DROP TYPE IF EXISTS data_classification CASCADE;

