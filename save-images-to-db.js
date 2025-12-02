#!/usr/bin/env node

/**
 * Save Generated Images to Database and Supabase Storage
 * Downloads temporary OpenAI images and saves them permanently
 */

require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Load our generated examples
const exampleDesigns = JSON.parse(fs.readFileSync('public/example-designs.json', 'utf8'));

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https:') ? https : http;
    const file = fs.createWriteStream(filename);
    
    protocol.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filename);
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {}); // Delete partial file
      reject(err);
    });
  });
}

async function uploadToSupabase(filePath, fileName) {
  try {
    const fileBuffer = fs.readFileSync(filePath);
    
    const { data, error } = await supabase.storage
      .from('design-images')
      .upload(`examples/${fileName}`, fileBuffer, {
        contentType: 'image/png',
        upsert: true
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return null;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('design-images')
      .getPublicUrl(`examples/${fileName}`);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Upload error:', err);
    return null;
  }
}

async function saveImagesToDatabase() {
  console.log('💾 Saving generated images to database and storage...\n');

  // Create temp directory for downloads
  const tempDir = path.join(__dirname, 'temp-images');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const results = [];

  for (let i = 0; i < exampleDesigns.length; i++) {
    const design = exampleDesigns[i];
    
    if (!design.image_url) {
      console.log(`${i + 1}. Skipping ${design.title} - no image URL`);
      continue;
    }

    console.log(`${i + 1}/10 Processing: ${design.title}`);
    
    try {
      // Download image
      const fileName = `${design.id}.png`;
      const tempPath = path.join(tempDir, fileName);
      
      console.log('   Downloading image...');
      await downloadImage(design.image_url, tempPath);

      // Upload to Supabase Storage
      console.log('   Uploading to Supabase...');
      const publicUrl = await uploadToSupabase(tempPath, fileName);
      
      if (!publicUrl) {
        throw new Error('Failed to upload to Supabase');
      }

      // First, insert/update the design record
      const { data: designData, error: designError } = await supabase
        .from('designs')
        .upsert({
          id: design.id,
          user_id: '00000000-0000-0000-0000-000000000000', // Example user
          intent: design.tags?.[3] || 'custom', // Celebrity name as intent
          category: design.tags?.[0] || 'ring',
          metal: design.tags?.[2] || 'gold',
          karat: '14k',
          style_tags: design.tags || [],
          price_band: '2000-3000',
          stone_config: { center_stone: { type: 'diamond', shape: 'round', carat: 1 } },
          size_fit: { ring_size: 7 },
          user_vision: design.prompt,
          status: 'approved',
          user_facing_description: design.title
        }, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        })
        .select()
        .single();

      if (designError) {
        console.error('   Design insert error:', designError);
        // Continue anyway, just log the error
      }

      // Insert image record
      const { data: imageData, error: imageError } = await supabase
        .from('design_images')
        .insert({
          design_id: design.id,
          shot_type: 'hero_angle',
          image_url: publicUrl,
          storage_path: `examples/${fileName}`,
          prompt: design.prompt,
          user_facing_description: design.title,
          order: 1
        });

      if (imageError) {
        console.error('   Image insert error:', imageError);
      } else {
        console.log('   ✅ Saved to database');
      }

      // Clean up temp file
      fs.unlinkSync(tempPath);

      results.push({
        ...design,
        permanent_url: publicUrl,
        saved_to_db: !imageError,
        design_saved: !designError
      });

      console.log(`   ✅ Complete: ${publicUrl}\n`);

    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}\n`);
      results.push({
        ...design,
        error: error.message,
        saved_to_db: false
      });
    }
  }

  // Clean up temp directory
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
  }

  // Save updated results
  fs.writeFileSync('public/example-designs-db.json', JSON.stringify(results, null, 2));

  // Summary
  const successful = results.filter(r => r.permanent_url).length;
  console.log(`\n📊 Results Summary:`);
  console.log(`✅ Successfully saved: ${successful}/10 images`);
  console.log(`💾 Database records created: ${results.filter(r => r.saved_to_db).length}`);
  console.log(`🌐 Permanent URLs generated: ${successful}`);
  console.log(`📁 Results saved to: public/example-designs-db.json`);

  return results;
}

// Check Supabase connection first
async function checkSupabase() {
  try {
    // Test connection
    const { data, error } = await supabase.from('designs').select('*').limit(1);
    if (error && !error.message.includes('RLS')) {
      throw error;
    }
    console.log('✅ Supabase connection successful');
    
    // Check storage bucket
    const { data: buckets } = await supabase.storage.listBuckets();
    const designBucket = buckets?.find(b => b.name === 'design-images');
    
    if (!designBucket) {
      console.log('⚠️  design-images bucket not found, creating...');
      const { error: bucketError } = await supabase.storage.createBucket('design-images', {
        public: true
      });
      if (bucketError) {
        throw new Error(`Failed to create bucket: ${bucketError.message}`);
      }
      console.log('✅ Created design-images bucket');
    } else {
      console.log('✅ design-images bucket exists');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Supabase check failed:', error.message);
    return false;
  }
}

// Run the process
async function main() {
  console.log('🚀 Starting image save process...\n');
  
  const supabaseOk = await checkSupabase();
  if (!supabaseOk) {
    console.log('Please fix Supabase configuration and try again.');
    process.exit(1);
  }

  const results = await saveImagesToDatabase();
  
  console.log('\n🎉 Image save process complete!');
  console.log('Images are now permanently stored and linked to database records.');
}

main().catch(err => {
  console.error('❌ Process failed:', err.message);
  process.exit(1);
});
