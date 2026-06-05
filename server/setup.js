#!/usr/bin/env node

/**
 * Setup Initialization Script
 * Runs the Supabase SQL setup directly using the service role key
 */

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL) {
  console.error('❌ ERROR: SUPABASE_URL environment variable is required');
  process.exit(1);
}

console.log('🔧 Starting Zaderi Admin Panel Setup...\n');

// Note: SUPABASE_SERVICE_KEY would be needed for full automation
// For now, we'll provide manual instructions
console.log('📋 Setup Steps:\n');

console.log('1️⃣  CREATE SUPABASE TABLES');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Go to: https://app.supabase.com');
console.log('  • Select your project');
console.log('  • Open SQL Editor (left sidebar)');
console.log('  • Click "New Query"');
console.log('  • Copy content from supabase-setup.sql');
console.log('  • Paste it and click Run');
console.log('  • Wait for: ✅ Executed successfully\n');

console.log('2️⃣  VERIFY TABLES CREATED');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Run this SQL query to verify:');
console.log('  SELECT COUNT(*) FROM users;');
console.log('  SELECT COUNT(*) FROM forms;\n');

console.log('3️⃣  SET ADMIN PASSWORD (Optional - if using hardcoded admin)');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// Generate bcrypt hash for common password
const defaultPassword = 'hOst@2026';
const defaultHash = bcrypt.hashSync(defaultPassword, 10);

console.log('Default admin credentials in database:');
console.log(`  Username: admin`);
console.log(`  Password hash: ${defaultHash}`);
console.log(`  (This is bcrypt hash for the default password)\n`);

console.log('To reset admin password manually:');
console.log('  UPDATE users SET password = \'NEW_BCRYPT_HASH\' WHERE username = \'admin\';\n');

console.log('4️⃣  START THE SERVER');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Run: npm start\n');

console.log('5️⃣  TEST LOGIN');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('Visit: http://localhost:5173/adminpanel');
console.log('  Username: admin');
console.log(`  Password: ${defaultPassword}\n`);

console.log('📊 ENVIRONMENT VARIABLES CHECK');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`✓ SUPABASE_URL: ${SUPABASE_URL ? '✅ Set' : '❌ Missing'}`);
console.log(`✓ SUPABASE_ANON_KEY: ${process.env.SUPABASE_ANON_KEY ? '✅ Set' : '❌ Missing'}`);
console.log(`✓ JWT_SECRET: ${process.env.JWT_SECRET ? '✅ Set' : '❌ Missing'}`);
console.log(`✓ PORT: ${process.env.PORT || '3001'} ✅\n`);

console.log('🚀 Next: Open https://app.supabase.com and run the SQL setup!');
