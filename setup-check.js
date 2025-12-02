#!/usr/bin/env node

/**
 * Setup Check Script - Validates environment configuration
 * Run with: node setup-check.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Slava Jewelry Studio - Setup Validation\n');

// Check for .env.local file
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found');
  console.log('   Create it by copying from .env.example\n');
  process.exit(1);
}

// Parse environment variables
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  if (line.includes('=') && !line.startsWith('#')) {
    const [key, value] = line.split('=');
    envVars[key] = value;
  }
});

// Required environment variables
const required = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY', 
  'SUPABASE_SERVICE_ROLE_KEY',
  'OPENAI_API_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_SECRET_KEY'
];

console.log('📋 Environment Variables:');
let allConfigured = true;

required.forEach(key => {
  const value = envVars[key];
  const isConfigured = value && !value.includes('your-') && !value.includes('here');
  
  if (isConfigured) {
    console.log(`✅ ${key}: Configured`);
  } else {
    console.log(`❌ ${key}: Not configured`);
    allConfigured = false;
  }
});

console.log('\n📦 Dependencies:');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const nodeModulesExists = fs.existsSync('node_modules');

if (nodeModulesExists) {
  console.log('✅ node_modules: Installed');
} else {
  console.log('❌ node_modules: Run npm install');
  allConfigured = false;
}

console.log('\n📁 Project Structure:');
const requiredFiles = [
  'app/layout.tsx',
  'app/page.tsx',
  'components/ui/button.tsx',
  'lib/supabase.ts',
  'types/database.ts',
  'supabase/migrations/001_initial_schema.sql'
];

requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}: Found`);
  } else {
    console.log(`❌ ${file}: Missing`);
    allConfigured = false;
  }
});

console.log('\n🎯 Next Steps:');
if (allConfigured) {
  console.log('✅ All checks passed! Ready to run:');
  console.log('   npm run dev');
} else {
  console.log('❌ Configuration needed:');
  console.log('   1. Set up Supabase project and update .env.local');
  console.log('   2. Get OpenAI API key');  
  console.log('   3. Set up Stripe account');
  console.log('   4. See SETUP_GUIDE.md for detailed instructions');
}

console.log('\n📖 Documentation:');
console.log('   • SETUP_GUIDE.md - Complete setup instructions');
console.log('   • README.md - Project overview');
console.log('   • QUICKSTART.md - Quick start guide');
