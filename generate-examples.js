#!/usr/bin/env node

/**
 * Generate Example Prompts with DALL-E Images
 * Creates 10 diverse jewelry design examples with actual AI-generated images
 */

require('dotenv').config({ path: '.env.local' });
const OpenAI = require('openai');
const fs = require('fs');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 10 diverse example prompts with celebrity/subculture inspiration
const EXAMPLE_PROMPTS = [
  {
    id: 'madonna-punk',
    title: 'Madonna Punk Ring',
    prompt: 'A bold punk rock cocktail ring inspired by Madonna, chunky black metal band with silver spikes and dark gemstone, edgy 1980s rebellion style, professional jewelry photography, studio lighting',
    tags: ['ring', 'punk', 'silver', 'Madonna', '1980s']
  },
  {
    id: 'audrey-minimalist',
    title: 'Audrey Minimalist Necklace', 
    prompt: 'An elegant minimalist necklace inspired by Audrey Hepburn, delicate platinum chain with simple geometric pendant, 1960s sophistication, timeless grace, professional jewelry photography, white background',
    tags: ['necklace', 'minimalist', 'platinum', 'Audrey Hepburn', '1960s']
  },
  {
    id: 'bowie-artdeco',
    title: 'Bowie Art Deco Earrings',
    prompt: 'Statement art deco earrings inspired by David Bowie, geometric gold design with angular patterns, 1920s glamour meets rock star attitude, dramatic lighting, luxury jewelry photography',
    tags: ['earrings', 'art deco', 'gold', 'David Bowie', '1920s']
  },
  {
    id: 'frida-bohemian',
    title: 'Frida Bohemian Bracelet',
    prompt: 'A bohemian charm bracelet inspired by Frida Kahlo, rose gold with colorful gemstones and artistic charms, Mexican folk art influence, organic flowing design, artistic jewelry photography',
    tags: ['bracelet', 'bohemian', 'rose gold', 'Frida Kahlo', 'folk art']
  },
  {
    id: 'grace-classic',
    title: 'Grace Kelly Classic',
    prompt: 'A classic engagement ring inspired by Grace Kelly, platinum setting with brilliant round diamond, timeless elegant design, 1950s Hollywood glamour, professional bridal photography, white background',
    tags: ['ring', 'classic', 'platinum', 'Grace Kelly', '1950s']
  },
  {
    id: 'basquiat-contemporary',
    title: 'Basquiat Contemporary Pendant',
    prompt: 'A contemporary geometric pendant inspired by Jean-Michel Basquiat, abstract angular design in yellow gold, modern street art aesthetic, urban artistic expression, museum-quality jewelry',
    tags: ['pendant', 'contemporary', 'yellow gold', 'Basquiat', 'street art']
  },
  {
    id: 'cher-disco',
    title: 'Cher Disco Statement',
    prompt: 'Bold disco-era statement earrings inspired by Cher, large geometric hoops in white gold with sparkling crystals, 1970s glamour and drama, studio lighting, luxury fashion photography',
    tags: ['earrings', 'disco', 'white gold', 'Cher', '1970s']
  },
  {
    id: 'twiggy-mod',
    title: 'Twiggy Mod Ring',
    prompt: 'A mod geometric ring inspired by Twiggy, clean lines and bold shapes in brushed silver, 1960s London fashion, minimalist yet striking, professional product photography',
    tags: ['ring', 'mod', 'silver', 'Twiggy', '1960s']
  },
  {
    id: 'nina-jazz',
    title: 'Nina Simone Jazz Necklace',
    prompt: 'An elegant jazz-era necklace inspired by Nina Simone, flowing curves in rose gold with pearl accents, sophisticated 1950s style, musical elegance, luxury jewelry photography',
    tags: ['necklace', 'jazz', 'rose gold', 'Nina Simone', '1950s']
  },
  {
    id: 'banksy-punk',
    title: 'Banksy Punk Cuff',
    prompt: 'A punk rock cuff bracelet inspired by Banksy street art, industrial brushed steel with subtle engraved details, underground rebellion aesthetic, urban contemporary jewelry, artistic photography',
    tags: ['bracelet', 'punk', 'steel', 'Banksy', 'street art']
  }
];

async function generateExampleImages() {
  console.log('🎨 Generating 10 example jewelry designs with DALL-E...\n');

  const results = [];

  for (let i = 0; i < EXAMPLE_PROMPTS.length; i++) {
    const example = EXAMPLE_PROMPTS[i];
    console.log(`${i + 1}/10 Generating: ${example.title}`);
    console.log(`Tags: ${example.tags.join(', ')}`);
    console.log(`Prompt: ${example.prompt.slice(0, 100)}...`);

    try {
      const imageResponse = await openai.images.generate({
        model: "dall-e-3",
        prompt: example.prompt,
        n: 1,
        size: "1024x1024",
        quality: "hd",
        style: "natural"
      });

      const result = {
        ...example,
        image_url: imageResponse.data[0].url,
        revised_prompt: imageResponse.data[0].revised_prompt,
        generated_at: new Date().toISOString()
      };

      results.push(result);
      console.log(`✅ Generated: ${imageResponse.data[0].url}\n`);

      // Small delay to be respectful to API
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`❌ Failed to generate ${example.title}:`, error.message);
      results.push({
        ...example,
        error: error.message,
        generated_at: new Date().toISOString()
      });
    }
  }

  // Save results to JSON file
  const outputFile = 'public/example-designs.json';
  fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));

  console.log(`\n📁 Results saved to ${outputFile}`);
  console.log(`✅ Generated ${results.filter(r => r.image_url).length}/10 images successfully`);
  
  // Calculate costs
  const successCount = results.filter(r => r.image_url).length;
  const cost = successCount * 0.04;
  console.log(`💰 Total cost: $${cost.toFixed(2)} (${successCount} images × $0.04)`);

  return results;
}

// Run the generation
generateExampleImages().then((results) => {
  console.log('\n🎉 Example generation complete!');
  console.log('Ready to update the design form with real examples.');
}).catch(err => {
  console.error('❌ Generation failed:', err.message);
  process.exit(1);
});
