import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { validateDesignForProduction, sanitizePromptForProduction } from '@/lib/manufacturing-rules';
import { createServerSupabaseClient } from '@/lib/supabase';
import { logger } from '@/lib/secure-logger';

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
- NEVER include hands, fingers, body parts, or models in product shots
- Show ONLY the jewelry piece isolated on background
`.trim();

// Simplified consistency guardrails (embedded in master spec now)

// Image types for jewelry photography - SAME design, different views
// Reduced to 2 images for faster generation and to avoid problematic hand anatomy
const IMAGE_TYPES = [
  {
    type: 'hero_angle', 
    description: 'luxury editorial photography, dramatic 3/4 perspective on rich black velvet with cinematic studio lighting, capturing every facet and sparkle, romantic atmosphere with soft bokeh background, museum-quality presentation, no hands or models',
    consistency_note: 'Three-quarter hero angle showing the complete design with breathtaking depth, dimension, and emotional appeal'
  },
  {
    type: 'packshot_front',
    description: 'pristine white seamless background, perfectly centered top-down view, bright even studio lighting showing every intricate detail, magazine-quality product photography, crystal-clear sharpness, no hands or models',
    consistency_note: 'Direct overhead view of the same exact piece revealing all details, settings, and craftsmanship'
  }
];

export async function POST(request: NextRequest) {
  try {
    // OPTIONAL AUTHENTICATION - Allow anonymous design generation for trial
    // Users only need to authenticate when saving designs
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    const body = await request.json();
    const { user_vision, ...designData } = body;

    if (!user_vision || typeof user_vision !== 'string' || user_vision.trim().length < 10) {
      logger.info('Invalid design prompt', { userId: user?.id || 'anonymous', promptLength: user_vision?.length || 0 });
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
    
    logger.info('Design generation started', { userId: user?.id || 'anonymous' });
    
    if (!validation.isValid) {
      console.warn('Design validation issues:', validation.issues);
    }

    // Extract KEY DESIGN ELEMENTS for absolute consistency
    const designElements = {
      metalColors: (sanitizedVision.match(/(?:rose|white|yellow|platinum|gold|silver)/gi) || []) as string[],
      gemstones: (sanitizedVision.match(/(?:diamond|ruby|sapphire|emerald|pearl)/gi) || []) as string[],
      style: (sanitizedVision.match(/(?:solitaire|halo|vintage|modern|classic|art deco|minimalist)/gi) || []) as string[],
      finish: (sanitizedVision.match(/(?:polished|matte|brushed|hammered|textured)/gi) || []) as string[]
    };

    // Create MASTER design specification with LOCKED-IN details
    const masterDesignSpec = `
CREATE A STUNNING, EMOTIONALLY COMPELLING JEWELRY PIECE WITH ABSOLUTE CONSISTENCY:

USER VISION: ${sanitizedVision}

🔒 LOCKED DESIGN SPECIFICATIONS (MUST BE IDENTICAL IN ALL PHOTOS):
• Metal Combination: ${designElements.metalColors.length > 0 ? designElements.metalColors.join(' + ') : 'mixed metals - rose gold, white gold, yellow gold'}
• Center Stone: ONE brilliant-cut diamond in a ${designElements.style.includes('solitaire') ? '4-prong solitaire' : 'secure prong'} setting
• Band Design: Interwoven triple-band design with THREE distinct metal colors flowing together
• Finish: ${designElements.finish.length > 0 ? designElements.finish[0] : 'matte brushed'} texture on metal bands
• Setting Style: Simple elegant prongs holding center diamond
• Design Features: Contemporary fusion of three precious metals in braided/twisted pattern

🎨 EXACT VISUAL SPECIFICATIONS (UNCHANGEABLE):
1. METALS: Three separate bands of rose, white, and yellow gold intertwined/braided together
2. CENTER STONE: ONE round brilliant diamond (approx 1 carat appearance) in white gold prongs
3. BAND PATTERN: Twisted/braided tri-color metal design that wraps around the finger
4. PROPORTIONS: Medium width band (~4-5mm), substantial but elegant
5. STYLE: Contemporary meets timeless - modern aesthetic with classic solitaire

⚠️ CRITICAL CONSISTENCY RULES:
• This is THE SAME PHYSICAL RING photographed from different angles
• EXACT same number of metal bands (3 - rose, white, yellow)
• EXACT same diamond size, cut, and setting
• EXACT same braided/twisted pattern in the metal
• EXACT same proportions and scale
• ONLY camera angle and background/lighting changes between photos
• The ring must be INSTANTLY RECOGNIZABLE as the same piece in both views

DESIGN EXCELLENCE REQUIREMENTS:
• Create ONE exquisite, photorealistic jewelry piece with breathtaking beauty
• Capture the emotional essence: romance, elegance, timeless luxury, heirloom quality
• Showcase the sparkle, brilliance, and fire of gemstones with cinematic lighting
• Professional museum-quality photography that makes viewers fall in love

${MANUFACTURING_GUARDRAILS}
`.trim();
    
    // Generate images SEQUENTIALLY to reduce server load and improve consistency
    const images: any[] = [];
    
    for (let index = 0; index < IMAGE_TYPES.length; index++) {
      const imageType = IMAGE_TYPES[index];
      
      const fullPrompt = `${masterDesignSpec}

📸 PHOTOGRAPHY SETUP FOR THIS SPECIFIC VIEW:
View Type: ${imageType.type.toUpperCase()} ${index > 0 ? `(Photo ${index + 1} of THE SAME RING)` : '(Primary View)'}
Camera Setup: ${imageType.description}
What to Show: ${imageType.consistency_note}

${index > 0 ? `
⚠️⚠️⚠️ CONSISTENCY WARNING - THIS IS PHOTO #${index + 1}:
You MUST photograph the EXACT SAME RING you created in Photo #1:
• SAME tri-color metal braid pattern (rose + white + yellow gold)
• SAME center diamond size and setting
• SAME band width and proportions  
• SAME twisted/braided metal design
• ONLY the camera angle changes - NOTHING about the ring itself changes
• If you create a different ring, this photo series will FAIL
` : ''}

FINAL QUALITY CHECK:
• Ultra-high resolution, photorealistic, magazine-quality
• Emotionally compelling - viewers should feel desire and admiration  
• Perfect lighting that makes gemstones sparkle and metals gleam
• Professional luxury jewelry photography worthy of a cover shoot
• ${index > 0 ? 'CRITICAL: This must be THE SAME ring as photo #1, just a different angle!' : 'Create the definitive version of this design'}`;


      console.log(`Generating ${imageType.type} (${index + 1}/${IMAGE_TYPES.length})...`);
      
      try {
        const imageResponse = await openai.images.generate({
          model: "dall-e-3",
          prompt: fullPrompt,
          n: 1,
          size: "1024x1024",
          quality: "hd", // High definition for compelling, breathtaking imagery
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
      
      // Small delay between images to avoid rate limiting and improve quality
      if (index < IMAGE_TYPES.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Longer delay for HD quality
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
