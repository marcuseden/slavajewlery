
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generateManhattanPhoto() {
  try {
    console.log('🏙️ Generating black and white Manhattan skyline photograph...');
    
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: 'Professional black and white panoramic photograph of Manhattan skyline from across the water, dramatic contrast, iconic NYC buildings including Empire State Building, One World Trade Center, Chrysler Building, shot during golden hour with moody lighting, high contrast monochrome photography, architectural photography style, wide angle view, realistic photograph not illustration',
      n: 1,
      size: '1792x1024',
      quality: 'hd',
      style: 'natural'
    });

    const imageUrl = response.data[0]?.url;
    if (!imageUrl) {
      throw new Error('No image URL received');
    }

    console.log('📸 Image generated:', imageUrl);
    
    // Download the image
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    
    // Save to public folder
    fs.writeFileSync('./public/manhattan-skyline-photo.jpg', Buffer.from(imageBuffer));
    console.log('✅ Manhattan skyline photo saved to public/manhattan-skyline-photo.jpg');
    
  } catch (error) {
    console.error('❌ Error generating Manhattan photo:', error);
  }
}

generateManhattanPhoto();
