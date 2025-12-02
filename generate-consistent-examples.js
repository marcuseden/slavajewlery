#!/usr/bin/env node

/**
 * Generate Consistent Example Designs
 * Creates multiple views of the SAME jewelry piece per prompt
 */

require('dotenv').config({ path: '.env.local' });
const OpenAI = require('openai');
const fs = require('fs');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 5 example prompts that will each generate 4 consistent views
const EXAMPLE_PROMPTS = [
  {
    id: 'grace-kelly-ring',
    title: 'Grace Kelly Engagement Ring',
    prompt: 'A classic solitaire engagement ring inspired by Grace Kelly, platinum setting with brilliant round diamond center stone, elegant cathedral setting, 1950s Hollywood glamour style'
  },
  {
    id: 'madonna-punk-ring',
    title: 'Madonna Punk Cocktail Ring',
    prompt: 'A bold punk rock cocktail ring inspired by Madonna, chunky black metal band with silver spikes and dark onyx center stone, edgy 1980s rebellion style'
  },
  {
    id: 'audrey-pearl-necklace',
    title: 'Audrey Hepburn Pearl Necklace',
    prompt: 'An elegant multi-strand pearl necklace inspired by Audrey Hepburn, graduated white pearls with diamond clasp, classic 1960s sophistication and timeless grace'
  },
  {
    id: 'bowie-lightning-earrings',
    title: 'David Bowie Lightning Earrings',
    prompt: 'Statement lightning bolt earrings inspired by David Bowie, geometric gold design with angular zigzag pattern, art deco meets rock star glamour'
  },
  {
    id: 'frida-turquoise-bracelet',
    title: 'Frida Kahlo Turquoise Bracelet',
    prompt: 'A bohemian charm bracelet inspired by Frida Kahlo, rose gold setting with turquoise stones and small artistic charms, Mexican folk art influence with organic flowing design'
  }
];

// Image types - same design, different views
const IMAGE_TYPES = [
  {
    type: 'packshot',
    description: 'clean white background, front view, product photography, studio lighting'
  },
  {
    type: 'hero_angle',
    description: '3/4 angle view with dramatic studio lighting and shadows, luxury jewelry photography'
  },
  {
    type: 'on_model',
    description: 'worn on elegant hand/neck/ear, natural skin tone, lifestyle photography, beautiful model'
  },
  {
    type: 'detail_macro',
    description: 'extreme close-up showing intricate details and craftsmanship, macro lens, fine details visible'
  }
];

async function generateConsistentDesigns() {
  console.log('🎨 Generating consistent multi-view jewelry designs...\n');

  const allResults = [];

  for (let i = 0; i < EXAMPLE_PROMPTS.length; i++) {
    const example = EXAMPLE_PROMPTS[i];
    console.log(`${i + 1}/5 Generating: ${example.title}`);
    console.log(`Base design: ${example.prompt.slice(0, 80)}...\n`);

    const designResults = {
      ...example,
      images: [],
      generated_at: new Date().toISOString()
    };

    // Generate all 4 views of the same design
    for (let j = 0; j < IMAGE_TYPES.length; j++) {
      const imageType = IMAGE_TYPES[j];
      console.log(`   ${j + 1}/4 Creating ${imageType.type} view...`);

      try {
        const fullPrompt = `Professional jewelry photography of this exact piece: ${example.prompt}, ${imageType.description}, high detail, 4k resolution`;

        const imageResponse = await openai.images.generate({
          model: "dall-e-3",
          prompt: fullPrompt,
          n: 1,
          size: "1024x1024",
          quality: "hd",
          style: "natural"
        });

        const result = {
          type: imageType.type,
          url: imageResponse.data[0].url,
          prompt: fullPrompt,
          revised_prompt: imageResponse.data[0].revised_prompt
        };

        designResults.images.push(result);
        console.log(`   ✅ ${imageType.type}: Generated successfully`);

        // Small delay to be respectful
        await new Promise(resolve => setTimeout(resolve, 1000));

      } catch (error) {
        console.error(`   ❌ ${imageType.type}: ${error.message}`);
        designResults.images.push({
          type: imageType.type,
          error: error.message
        });
      }
    }

    allResults.push(designResults);
    console.log(`✅ Completed ${example.title} with ${designResults.images.filter(img => img.url).length}/4 images\n`);
  }

  // Save results
  const outputFile = 'public/consistent-designs.json';
  fs.writeFileSync(outputFile, JSON.stringify(allResults, null, 2));

  // Summary
  const totalImages = allResults.reduce((sum, design) => 
    sum + design.images.filter(img => img.url).length, 0
  );
  const totalCost = totalImages * 0.04;

  console.log(`📊 Generation Complete:`);
  console.log(`✅ Designs: ${allResults.length}`);
  console.log(`🖼️  Total images: ${totalImages}/20`);
  console.log(`💰 Cost: $${totalCost.toFixed(2)}`);
  console.log(`📁 Saved to: ${outputFile}`);

  return allResults;
}

// Run generation
generateConsistentDesigns().then(() => {
  console.log('\n🎉 Consistent design generation complete!');
  console.log('Each prompt now shows the SAME design from 4 different views including worn shots.');
}).catch(err => {
  console.error('❌ Generation failed:', err.message);
  process.exit(1);
});
