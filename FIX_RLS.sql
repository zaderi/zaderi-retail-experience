-- FIX: Disable RLS or Update Policies to Allow Access
-- Run this in Supabase SQL Editor to fix the admin panel login issue

-- OPTION 1: DISABLE RLS (Quickest - Use for development)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE forms DISABLE ROW LEVEL SECURITY;

-- OPTION 2: If you want to keep RLS, run these policies instead
-- DROP EXISTING POLICIES
DROP POLICY IF EXISTS "Allow all operations on users" ON users;
DROP POLICY IF EXISTS "Allow all operations on forms" ON forms;

-- CREATE NEW PERMISSIVE POLICIES
CREATE POLICY "Allow all operations on users" ON users FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations on forms" ON forms FOR ALL USING (true) WITH CHECK (true);

-- Verify
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
SELECT * FROM users LIMIT 1;
SELECT COUNT(*) as form_count FROM forms;
