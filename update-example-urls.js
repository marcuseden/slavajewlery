#!/usr/bin/env node

/**
 * Update Example URLs to point to local static files
 * Creates a simpler approach using local storage instead of Supabase
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

// Load our generated examples
const exampleDesigns = JSON.parse(fs.readFileSync('public/example-designs.json', 'utf8'));

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filename);
    
    https.get(url, (response) => {
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

async function downloadAndSaveImages() {
  console.log('📥 Downloading and saving example images locally...\n');

  // Create public/examples directory
  const examplesDir = path.join(__dirname, 'public', 'examples');
  if (!fs.existsSync(examplesDir)) {
    fs.mkdirSync(examplesDir, { recursive: true });
  }

  const updatedDesigns = [];

  for (let i = 0; i < exampleDesigns.length; i++) {
    const design = exampleDesigns[i];
    
    if (!design.image_url) {
      console.log(`${i + 1}. Skipping ${design.title} - no image URL`);
      updatedDesigns.push(design);
      continue;
    }

    console.log(`${i + 1}/10 Processing: ${design.title}`);
    
    try {
      // Download image to public/examples/
      const fileName = `${design.id}.png`;
      const localPath = path.join(examplesDir, fileName);
      
      console.log('   Downloading image...');
      await downloadImage(design.image_url, localPath);

      // Update design with local URL
      const updatedDesign = {
        ...design,
        local_image_url: `/examples/${fileName}`,
        original_url: design.image_url,
        saved_locally: true,
        file_size: fs.statSync(localPath).size
      };

      updatedDesigns.push(updatedDesign);
      console.log(`   ✅ Saved: /examples/${fileName}\n`);

    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}\n`);
      updatedDesigns.push({
        ...design,
        error: error.message,
        saved_locally: false
      });
    }
  }

  // Save updated results
  fs.writeFileSync('public/example-designs-local.json', JSON.stringify(updatedDesigns, null, 2));

  // Summary
  const successful = updatedDesigns.filter(d => d.saved_locally).length;
  const totalSize = updatedDesigns
    .filter(d => d.file_size)
    .reduce((sum, d) => sum + d.file_size, 0);

  console.log(`\n📊 Results Summary:`);
  console.log(`✅ Successfully downloaded: ${successful}/10 images`);
  console.log(`📁 Saved to: public/examples/ directory`);
  console.log(`💾 Total size: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📋 Updated manifest: public/example-designs-local.json`);

  return updatedDesigns;
}

// Run the process
downloadAndSaveImages().then((results) => {
  console.log('\n🎉 Local image save complete!');
  console.log('Images are now served from /examples/ and won\'t expire.');
}).catch(err => {
  console.error('❌ Process failed:', err.message);
  process.exit(1);
});
