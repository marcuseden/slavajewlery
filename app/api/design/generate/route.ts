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

const CONSISTENCY_GUARDRAILS = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  CRITICAL: ABSOLUTE ZERO-VARIATION CONSISTENCY REQUIREMENT  ⚠️
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

YOU ARE PHOTOGRAPHING ONE SINGLE PHYSICAL JEWELRY PIECE FROM DIFFERENT ANGLES.
DO NOT CREATE VARIATIONS. DO NOT REINTERPRET. DO NOT REDESIGN.

IMAGINE: A professional photographer takes 4 photos of the SAME bracelet/ring/necklace that is sitting on the table in front of them. Each photo is a different angle of that ONE EXACT PIECE.

LOCKED DESIGN ELEMENTS (DO NOT CHANGE BETWEEN IMAGES):

1. METAL SPECIFICATION (LOCKED):
   - Exact same metal type and color (yellow gold = yellow gold in ALL images)
   - Exact same finish (polished = polished in ALL, matte = matte in ALL)
   - Exact same thickness and weight appearance

2. GEMSTONE SPECIFICATION (LOCKED):
   - EXACT same number of stones (if 20 diamonds in image 1, must be 20 in ALL)
   - EXACT same stone sizes and shapes
   - EXACT same stone colors and clarity
   - EXACT same stone arrangement/pattern
   - EXACT same setting style for each stone

3. DESIGN PATTERN (LOCKED):
   - EXACT same repeating pattern (e.g., if alternating diamond-sapphire, keep exact pattern)
   - EXACT same number of pattern repeats
   - EXACT same link/element shapes
   - EXACT same proportions between elements

4. DIMENSIONS (LOCKED):
   - EXACT same width/height/depth
   - EXACT same length (if chain/bracelet)
   - EXACT same scale relationships

5. DECORATIVE ELEMENTS (LOCKED):
   - EXACT same engravings, if any
   - EXACT same texture details
   - EXACT same architectural elements
   - NO adding or removing details between images

WHAT CHANGES: ONLY THE CAMERA ANGLE AND LIGHTING
WHAT NEVER CHANGES: EVERYTHING ABOUT THE JEWELRY ITSELF

VIOLATION CHECK:
❌ If image 1 has round diamonds, image 2 CANNOT have baguette diamonds
❌ If image 1 has 15 stones, image 2 CANNOT have 20 stones
❌ If image 1 has geometric links, image 2 CANNOT have curved links
❌ If image 1 is yellow gold, image 2 CANNOT be white gold
❌ DO NOT "improve" or "enhance" the design between images

✅ CORRECT: Same bracelet, rotated 45 degrees
✅ CORRECT: Same ring, zoomed in to show detail
✅ CORRECT: Same necklace, now worn on model
`.trim();

// Image types for jewelry photography - SAME design, different views
const IMAGE_TYPES = [
  {
    type: 'packshot_front',
    description: 'clean white background, perfectly centered front view, professional product photography, studio lighting',
    consistency_note: 'Front facing view showing full design, same piece as all other images'
  },
  {
    type: 'hero_angle', 
    description: '3/4 angle view with dramatic studio lighting creating natural shadows, professional jewelry photography',
    consistency_note: 'Three-quarter angle of the exact same piece, showing depth and dimension'
  },
  {
    type: 'on_model_worn',
    description: 'worn on elegant hand/neck/ear with natural skin tone, lifestyle photography in natural light',
    consistency_note: 'The exact same piece being worn, maintaining all design details'
  },
  {
    type: 'macro_detail',
    description: 'extreme close-up macro photography showing intricate craftsmanship details, sharp focus on gemstone or metalwork',
    consistency_note: 'Close-up of the exact same piece showing fine details and quality'
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

    // First, generate a detailed design lock
    const designLockPrompt = `Based on this jewelry description: "${sanitizedVision}"

Create a precise technical specification with LOCKED parameters that will be IDENTICAL in all 4 photos:

1. Metal: [specific type, color, finish]
2. Gemstones: [exact count, type, size, cut, color, setting]
3. Design Pattern: [exact pattern description with count]
4. Dimensions: [width, length, thickness]
5. Key Features: [list all distinctive elements]

Be extremely specific with numbers and descriptions.`;

    // Get design lock (we'll use this across all images)
    let designLock = '';
    try {
      const lockResponse = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: designLockPrompt }],
        max_tokens: 300,
        temperature: 0.1 // Very low for consistency
      });
      designLock = lockResponse.choices[0].message.content || '';
      console.log('Design Lock Created:', designLock);
    } catch (err) {
      console.error('Failed to create design lock:', err);
      designLock = sanitizedVision; // Fallback
    }

    // Create MASTER design specification for consistency
    const masterDesignSpec = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MASTER JEWELRY SPECIFICATION - DESIGN LOCKED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

THIS IS THE SINGLE PHYSICAL PIECE YOU ARE PHOTOGRAPHING:

${designLock}

ORIGINAL USER VISION:
${sanitizedVision}

${MANUFACTURING_GUARDRAILS}

${CONSISTENCY_GUARDRAILS}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
⚠️  REMINDER: You are creating 4 photos of ONE piece, not 4 different pieces
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`.trim();
    
    const imagePromises = IMAGE_TYPES.map(async (imageType, index) => {
      const fullPrompt = `${masterDesignSpec}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PHOTO ${index + 1} OF 4: ${imageType.type.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CAMERA ANGLE FOR THIS PHOTO:
${imageType.description}

⚠️ CRITICAL CONSISTENCY CHECK:
${imageType.consistency_note}

YOU MUST USE THE EXACT SAME DESIGN AS SPECIFIED IN THE DESIGN LOCK ABOVE.
DO NOT CREATE A NEW INTERPRETATION. DO NOT VARY THE DESIGN.
ONLY CHANGE: Camera angle and lighting
NEVER CHANGE: The jewelry design itself

Photo Requirements:
- Professional luxury jewelry photography
- 4K resolution, photorealistic rendering
- Same piece as all other photos, just different angle`;

      console.log(`Generating ${imageType.type} (${index + 1}/${IMAGE_TYPES.length})...`);
      
      try {
        const imageResponse = await openai.images.generate({
          model: "dall-e-3", // Best for consistency and quality
          prompt: fullPrompt,
          n: 1,
          size: "1024x1024",
          quality: "hd", // Essential for jewelry detail
          style: "natural" // Most realistic for product photography
        });

        return {
          type: imageType.type,
          url: imageResponse.data?.[0]?.url || null,
          prompt: fullPrompt,
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
