/**
 * Setup Image Storage Bucket
 * 
 * Run this once to create the Supabase Storage bucket for images
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupImageStorage() {
  console.log('🚀 Setting up image storage bucket...\n');

  try {
    // Check if bucket already exists
    console.log('📋 Checking existing buckets...');
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      throw new Error(`Failed to list buckets: ${listError.message}`);
    }

    const bucketExists = buckets?.some(b => b.name === 'images');

    if (bucketExists) {
      console.log('✅ Bucket "images" already exists');
      console.log('\n📊 Bucket configuration:');
      const bucket = buckets.find(b => b.name === 'images');
      console.log('   Name:', bucket.name);
      console.log('   Public:', bucket.public);
      console.log('   Created:', bucket.created_at);
      console.log('\n✨ Setup complete! No action needed.');
      return;
    }

    // Create bucket
    console.log('📦 Creating "images" bucket...');
    const { data, error } = await supabase.storage.createBucket('images', {
      public: true, // Make images publicly accessible
      fileSizeLimit: 10485760, // 10MB per file
      allowedMimeTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
    });

    if (error) {
      throw new Error(`Failed to create bucket: ${error.message}`);
    }

    console.log('✅ Bucket "images" created successfully!\n');
    console.log('📊 Bucket configuration:');
    console.log('   Name: images');
    console.log('   Public: true');
    console.log('   Max file size: 10MB');
    console.log('   Allowed types: PNG, JPEG, JPG, WebP');
    console.log('\n✨ Setup complete!');
    console.log('\n📝 Next steps:');
    console.log('   1. Images will now be automatically saved to Supabase Storage');
    console.log('   2. URLs will be permanent (not expiring like OpenAI URLs)');
    console.log('   3. Check Supabase Dashboard > Storage to view uploaded images');

  } catch (error) {
    console.error('\n❌ Setup failed:', error.message);
    process.exit(1);
  }
}

setupImageStorage();

