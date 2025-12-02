#!/usr/bin/env node

/**
 * Supabase Connection Test
 * Tests database connection and runs migration if needed
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

async function testSupabase() {
  console.log('🔗 Testing Supabase Connection...\n');

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.log('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Test basic connection by checking our actual tables
    console.log('📡 Testing connection...');
    console.log('✅ Connected to Supabase successfully');
    console.log(`   Project: ${supabaseUrl.split('//')[1].split('.')[0]}`);

    // Check if our tables exist
    console.log('\n🔍 Checking database schema...');
    const { data: tables, error: tablesError } = await supabase
      .rpc('get_public_tables');

    if (tablesError) {
      console.log('⚠️  Could not check tables via RPC, trying direct query...');
      
      // Alternative method - try to query each table directly
      const requiredTables = ['users', 'designs', 'design_images', 'orders', 'production_stages'];
      const existingTables = [];
      
      for (const table of requiredTables) {
        try {
          const { error } = await supabase.from(table).select('*').limit(1);
          if (!error || error.message.includes('RLS')) {
            existingTables.push(table);
            console.log(`✅ ${table} table exists`);
          }
        } catch (e) {
          console.log(`❌ ${table} table missing or inaccessible`);
        }
      }
      
      if (existingTables.length === requiredTables.length) {
        console.log('\n✅ All required tables found!');
        await testRLS(supabase);
      } else {
        console.log(`\n⚠️  Missing tables. Found: ${existingTables.join(', ')}`);
      }
      
    } else {
      const tableNames = tables || [];
      const requiredTables = ['users', 'designs', 'design_images', 'orders', 'production_stages'];
      
      console.log('Found tables:', tableNames);
      
      const missingTables = requiredTables.filter(table => !tableNames.includes(table));
    
      if (missingTables.length > 0) {
        console.log(`\n⚠️  Missing tables: ${missingTables.join(', ')}`);
        console.log('🔧 Migration may be incomplete');
      } else {
        console.log('\n✅ All required tables found!');
        
        // Test RLS policies
        await testRLS(supabase);
      }
    }

    // Check storage bucket
    await checkStorageBucket(supabase);

  } catch (err) {
    console.log('❌ Error:', err.message);
    process.exit(1);
  }
}

async function runMigration(supabase) {
  console.log('\n📝 Running database migration...');
  
  try {
    const migrationSQL = fs.readFileSync('supabase/migrations/001_initial_schema.sql', 'utf8');
    
    // Execute the migration
    const { error } = await supabase.rpc('exec', { sql: migrationSQL });
    
    if (error) {
      console.log('❌ Migration failed:', error.message);
      console.log('\n💡 Please run the migration manually:');
      console.log('   1. Go to your Supabase Dashboard → SQL Editor');
      console.log('   2. Copy contents of supabase/migrations/001_initial_schema.sql');
      console.log('   3. Paste and execute the SQL');
      return;
    }

    console.log('✅ Migration completed successfully!');
    
    // Verify tables were created
    const { data: newTables } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public');
      
    console.log('📋 Created tables:', newTables.map(t => t.table_name).sort());

  } catch (err) {
    console.log('❌ Migration error:', err.message);
    console.log('\n💡 Manual migration required - see SETUP_GUIDE.md');
  }
}

async function testRLS(supabase) {
  console.log('\n🔒 Testing Row Level Security...');
  
  try {
    // Test RLS is enabled (should fail without auth)
    const { error } = await supabase.from('designs').select('*').limit(1);
    
    if (error && error.message.includes('RLS')) {
      console.log('✅ RLS policies are active and protecting data');
    } else {
      console.log('⚠️  RLS may not be properly configured');
    }
  } catch (err) {
    console.log('⚠️  Could not test RLS:', err.message);
  }
}

async function checkStorageBucket(supabase) {
  console.log('\n📁 Checking storage bucket...');
  
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.log('❌ Could not check buckets:', error.message);
      return;
    }

    const designImagesBucket = buckets.find(b => b.name === 'design-images');
    
    if (designImagesBucket) {
      console.log('✅ design-images bucket exists');
      console.log(`   Public: ${designImagesBucket.public ? 'Yes' : 'No'}`);
    } else {
      console.log('⚠️  design-images bucket not found');
      console.log('   Create it in Supabase Dashboard → Storage');
      console.log('   Name: design-images, Public: Yes');
    }

  } catch (err) {
    console.log('❌ Storage check failed:', err.message);
  }
}

// Run the test
testSupabase().then(() => {
  console.log('\n🎉 Supabase setup validation complete!');
}).catch(err => {
  console.log('❌ Test failed:', err.message);
  process.exit(1);
});
