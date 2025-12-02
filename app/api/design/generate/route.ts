import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Image types for jewelry photography
const IMAGE_TYPES = [
  {
    type: 'packshot_front',
    description: 'Professional packshot with clean white background, front view'
  },
  {
    type: 'hero_angle', 
    description: 'Dramatic 3/4 angle with professional lighting and shadows'
  },
  {
    type: 'macro_detail',
    description: 'Extreme close-up showing intricate details and craftsmanship'
  },
  {
    type: 'lifestyle_shot',
    description: 'Elegant lifestyle context, worn or displayed naturally'
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_vision, ...designData } = body;

    if (!user_vision || typeof user_vision !== 'string' || user_vision.trim().length < 10) {
      return NextResponse.json(
        { error: 'Please provide a detailed description of your jewelry vision' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    console.log('Generating jewelry design for:', user_vision.slice(0, 100) + '...');

    // Generate multiple images in parallel
    const imagePromises = IMAGE_TYPES.map(async (imageType) => {
      const prompt = `Professional jewelry photography: ${user_vision}. ${imageType.description}. Studio lighting, high detail, luxury jewelry photography, 4k resolution, professional product photography`;

      console.log(`Generating ${imageType.type}...`);
      
      try {
        const imageResponse = await openai.images.generate({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024",
          quality: "hd",
          style: "natural"
        });

        return {
          type: imageType.type,
          url: imageResponse.data?.[0]?.url || null,
          prompt: prompt,
          revised_prompt: imageResponse.data?.[0]?.revised_prompt || null
        };
      } catch (imageError) {
        console.error(`Error generating ${imageType.type}:`, imageError);
        return {
          type: imageType.type,
          url: null,
          error: imageError instanceof Error ? imageError.message : 'Image generation failed'
        };
      }
    });

    // Wait for all images to generate
    const images = await Promise.all(imagePromises);

    // Filter out failed generations
    const successfulImages = images.filter(img => img.url);
    const failedImages = images.filter(img => !img.url);

    console.log(`Generated ${successfulImages.length}/${images.length} images successfully`);

    if (successfulImages.length === 0) {
      return NextResponse.json(
        { error: 'Failed to generate any images. Please try again.' },
        { status: 500 }
      );
    }

    // Generate design specifications using GPT-4
    let specifications = null;
    try {
      const specPrompt = `As a master jeweler, create detailed manufacturing specifications for this custom jewelry piece:

Design Vision: ${user_vision}

Provide concise specifications including:
1. Materials and dimensions
2. Stone specifications  
3. Manufacturing techniques
4. Estimated timeline
5. Price range

Keep response under 300 words and focus on technical details.`;

      const specResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: specPrompt }],
        max_tokens: 400,
        temperature: 0.3
      });

      specifications = specResponse.choices[0].message.content;
    } catch (specError) {
      console.error('Error generating specifications:', specError);
      specifications = 'Specifications generation temporarily unavailable. Our team will provide detailed specs upon request.';
    }

    const response = {
      success: true,
      images: successfulImages,
      specifications,
      user_vision,
      generated_at: new Date().toISOString(),
      ...(failedImages.length > 0 && { 
        warnings: `${failedImages.length} image(s) failed to generate` 
      })
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Design generation error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error',
        success: false 
      },
      { status: 500 }
    );
  }
}
