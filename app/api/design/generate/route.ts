import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { validateDesignForProduction, sanitizePromptForProduction } from '@/lib/manufacturing-rules';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// CRITICAL: Manufacturing and consistency guardrails
const MANUFACTURING_GUARDRAILS = `
STRICT MANUFACTURING REQUIREMENTS - DO NOT DEVIATE:
- Use ONLY real, manufacturable jewelry techniques (casting, forging, stone setting, engraving)
- NO floating elements, impossible geometry, or physics-defying designs
- ALL gemstones must be securely set using standard settings (prong, bezel, channel, pave, halo)
- Metal thickness minimum 1.5mm for structural integrity
- All prongs minimum 0.8mm diameter
- Gemstone settings must have proper depth (min 60% of stone height)
- NO microscopic details smaller than 0.3mm
- All curves and edges must be physically producible with standard jeweler tools
- Avoid thin cantilevers or structurally weak designs
- Each piece must be wearable and durable for daily use
`.trim();

// Simplified consistency guardrails (embedded in master spec now)

// Image types for jewelry photography - SAME design, different views
// Reduced to 3 images for faster generation and lower timeout risk
const IMAGE_TYPES = [
  {
    type: 'hero_angle', 
    description: '3/4 angle view with dramatic studio lighting creating natural shadows, professional jewelry photography on dark background',
    consistency_note: 'Three-quarter angle showing full design with depth and dimension'
  },
  {
    type: 'packshot_front',
    description: 'clean white background, perfectly centered front view, professional product photography, studio lighting',
    consistency_note: 'Front facing view of the exact same piece showing complete design'
  },
  {
    type: 'on_model_worn',
    description: 'worn on elegant hand/neck/ear with natural skin tone, lifestyle photography in natural light, same exact piece',
    consistency_note: 'The exact same piece being worn on model, all design details identical'
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

    // Validate and sanitize for manufacturing
    const validation = validateDesignForProduction(user_vision);
    const sanitizedVision = sanitizePromptForProduction(user_vision);
    
    if (!validation.isValid) {
      console.warn('Design validation issues:', validation.issues);
    }

    // Create MASTER design specification for consistency (NO pre-generation step)
    const masterDesignSpec = `
⚠️ CRITICAL: YOU ARE PHOTOGRAPHING ONE SINGLE PHYSICAL JEWELRY PIECE FROM DIFFERENT ANGLES ⚠️

DESIGN TO CREATE (LOCK THIS SPECIFICATION):
${sanitizedVision}

ABSOLUTE CONSISTENCY RULES:
• SAME metal type, color, finish in ALL 4 images
• SAME number of gemstones (count must match exactly)
• SAME gemstone sizes, colors, cuts, settings
• SAME design pattern/motif (exact repeats, not approximate)
• SAME dimensions and proportions
• ONLY CHANGE: Camera angle and lighting
• NEVER CHANGE: The jewelry design itself

Think: A photographer photographs ONE bracelet 4 times from different angles.
NOT: An artist creates 4 different interpretations.

${MANUFACTURING_GUARDRAILS}
`.trim();
    
    // Generate images SEQUENTIALLY to reduce server load and improve consistency
    const images: any[] = [];
    
    for (let index = 0; index < IMAGE_TYPES.length; index++) {
      const imageType = IMAGE_TYPES[index];
      
      const fullPrompt = `${masterDesignSpec}

PHOTO ${index + 1}/4: ${imageType.type.toUpperCase()}
Camera: ${imageType.description}
Consistency: ${imageType.consistency_note}

Professional luxury jewelry photography, 4K, photorealistic. Same exact piece as other photos, only camera angle changes.`;

      console.log(`Generating ${imageType.type} (${index + 1}/${IMAGE_TYPES.length})...`);
      
      try {
        const imageResponse = await openai.images.generate({
          model: "dall-e-3",
          prompt: fullPrompt,
          n: 1,
          size: "1024x1024",
          quality: "standard", // Changed from "hd" for 2x faster generation
          style: "natural"
        });

        images.push({
          type: imageType.type,
          url: imageResponse.data?.[0]?.url || null,
          prompt: fullPrompt,
          revised_prompt: imageResponse.data?.[0]?.revised_prompt || null
        });
        
        console.log(`✓ Generated ${imageType.type} successfully`);
      } catch (imageError) {
        console.error(`Error generating ${imageType.type}:`, imageError);
        images.push({
          type: imageType.type,
          url: null,
          error: imageError instanceof Error ? imageError.message : 'Image generation failed'
        });
      }
      
      // Small delay between images to avoid rate limiting
      if (index < IMAGE_TYPES.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 500)); // Reduced from 1000ms
      }
    }

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

    // Generate manufacturing specifications using GPT-4
    let specifications = null;
    try {
      const specPrompt = `As a NYC master jeweler with 30+ years experience, create REALISTIC manufacturing specifications for this piece:

DESIGN: ${sanitizedVision}

VALIDATION RESULTS:
${validation.isValid ? '✓ Design is manufacturable' : '⚠ Issues found: ' + validation.issues.join(', ')}
${validation.warnings.length > 0 ? 'Warnings: ' + validation.warnings.join(', ') : ''}

Provide REALISTIC specifications:
1. MATERIALS: Exact metal type, karat/purity, estimated weight in grams
2. GEMSTONES: Type, cut, size in mm or carat, clarity grade, color grade, quantity, setting style
3. DIMENSIONS: Length, width, height in mm; ring size if applicable
4. TECHNIQUES: Specific manufacturing methods (casting, forging, hand-fabrication, stone setting method)
5. PRODUCTION: Realistic timeline in business days, complexity level (1-8)
6. QUALITY CHECKS: Critical inspection points

Keep under 300 words. Be SPECIFIC and REALISTIC. Only suggest what's actually producible.`;

      const specResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { 
            role: "system", 
            content: "You are a master jeweler. Only provide specifications for designs that are physically manufacturable. Be precise with measurements and realistic about production capabilities."
          },
          { 
            role: "user", 
            content: specPrompt 
          }
        ],
        max_tokens: 500,
        temperature: 0.2 // Lower temperature for more consistent, realistic specs
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
      sanitized_vision: sanitizedVision,
      validation: {
        is_manufacturable: validation.isValid,
        issues: validation.issues,
        warnings: validation.warnings
      },
      generated_at: new Date().toISOString(),
      generation_model: "dall-e-3",
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
