#!/usr/bin/env node

/**
 * OpenAI Integration Test
 * Tests GPT-4 text generation and DALL-E 3 image generation
 */

require('dotenv').config({ path: '.env.local' });
const OpenAI = require('openai');

async function testOpenAI() {
  console.log('🤖 Testing OpenAI Integration...\n');

  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.log('❌ Missing OPENAI_API_KEY in .env.local');
    process.exit(1);
  }

  if (!apiKey.startsWith('sk-')) {
    console.log('❌ Invalid OpenAI API key format');
    process.exit(1);
  }

  const openai = new OpenAI({ apiKey });

  try {
    // Test GPT-4 for jewelry design specifications
    console.log('📝 Testing GPT-4 for jewelry specifications...');
    
    const designPrompt = `You are a master jeweler creating detailed manufacturing specifications. 

User wants: "A vintage-inspired engagement ring with art deco elements, platinum setting, 1.5 carat oval diamond, with small sapphire accents"

Generate detailed manufacturing specifications including:
1. Metal specifications
2. Stone specifications  
3. Setting details
4. Dimensions
5. Manufacturing notes

Keep response under 300 words and focus on technical details a jeweler needs.`;

    const gptResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: designPrompt }],
      max_tokens: 500,
      temperature: 0.7
    });

    console.log('✅ GPT-4 Response:');
    console.log(gptResponse.choices[0].message.content.slice(0, 200) + '...\n');

    // Test DALL-E 3 for jewelry image generation
    console.log('🎨 Testing DALL-E 3 for jewelry images...');
    
    const imagePrompt = `Professional product photography of a vintage art deco engagement ring with platinum setting and oval diamond center stone with small sapphire accents. Studio lighting, white background, packshot style, high detail, jewelry photography, 4k resolution`;

    console.log('🔄 Generating image... (this may take 10-20 seconds)');
    
    const imageResponse = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "natural"
    });

    console.log('✅ DALL-E 3 Image Generated:');
    console.log(`   URL: ${imageResponse.data[0].url}`);
    console.log(`   Revised Prompt: ${imageResponse.data[0].revised_prompt?.slice(0, 100)}...`);

    // Test usage and costs
    console.log('\n💰 Usage Information:');
    console.log('   GPT-4o: ~$0.01-0.03 per design specification');
    console.log('   DALL-E 3: $0.040 per HD image (5 images per design = $0.20)');
    console.log('   Total per design: ~$0.21-0.23');

    // Test model availability
    console.log('\n🔍 Checking model availability...');
    const models = await openai.models.list();
    const availableModels = models.data.map(m => m.id);
    
    const requiredModels = ['gpt-4o', 'dall-e-3'];
    requiredModels.forEach(model => {
      if (availableModels.includes(model)) {
        console.log(`✅ ${model}: Available`);
      } else {
        console.log(`❌ ${model}: Not available`);
      }
    });

  } catch (error) {
    console.log('❌ OpenAI Error:', error.message);
    
    if (error.code === 'insufficient_quota') {
      console.log('💳 Your OpenAI account needs billing setup or credits');
    } else if (error.code === 'invalid_api_key') {
      console.log('🔑 Invalid API key - please check your key');
    } else if (error.code === 'rate_limit_exceeded') {
      console.log('🚦 Rate limit exceeded - try again in a moment');
    }
    
    process.exit(1);
  }
}

// Run the test
testOpenAI().then(() => {
  console.log('\n🎉 OpenAI integration test complete!');
  console.log('✅ Ready for AI-powered jewelry design generation');
}).catch(err => {
  console.log('❌ Test failed:', err.message);
  process.exit(1);
});
