#!/usr/bin/env node

/**
 * Download Consistent Design Images Locally
 */

const fs = require('fs');
const https = require('https');
const path = require('path');

const consistentDesigns = JSON.parse(fs.readFileSync('public/consistent-designs.json', 'utf8'));

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
      fs.unlink(filename, () => {}); 
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('📥 Downloading consistent design images...\n');

  // Create public/designs directory
  const designsDir = path.join(__dirname, 'public', 'designs');
  if (!fs.existsSync(designsDir)) {
    fs.mkdirSync(designsDir, { recursive: true });
  }

  const updatedDesigns = [];

  for (let i = 0; i < consistentDesigns.length; i++) {
    const design = consistentDesigns[i];
    console.log(`${i + 1}/5 Processing: ${design.title}`);

    const updatedImages = [];

    for (let j = 0; j < design.images.length; j++) {
      const image = design.images[j];
      
      if (image.url) {
        try {
          const fileName = `${design.id}-${image.type}.png`;
          const localPath = path.join(designsDir, fileName);
          
          console.log(`   Downloading ${image.type}...`);
          await downloadImage(image.url, localPath);

          updatedImages.push({
            ...image,
            local_url: `/designs/${fileName}`,
            original_url: image.url
          });

          console.log(`   ✅ Saved: /designs/${fileName}`);
        } catch (error) {
          console.error(`   ❌ Failed ${image.type}: ${error.message}`);
          updatedImages.push(image);
        }
      } else {
        updatedImages.push(image);
      }
    }

    updatedDesigns.push({
      ...design,
      images: updatedImages
    });
  }

  // Save updated designs
  fs.writeFileSync('public/consistent-designs-local.json', JSON.stringify(updatedDesigns, null, 2));

  console.log(`\n📊 Download Complete:`);
  console.log(`✅ Processed ${updatedDesigns.length} designs`);
  console.log(`📁 Images saved to: public/designs/`);
  console.log(`📋 Updated manifest: public/consistent-designs-local.json`);

  return updatedDesigns;
}

downloadAllImages().then(() => {
  console.log('\n🎉 All consistent design images downloaded!');
}).catch(err => {
  console.error('❌ Download failed:', err.message);
  process.exit(1);
});
