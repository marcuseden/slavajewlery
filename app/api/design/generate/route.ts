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
    const lowerVision = sanitizedVision.toLowerCase();
    
    const designElements = {
      metalColors: (sanitizedVision.match(/(?:rose|white|yellow|platinum|gold|silver)/gi) || []) as string[],
      gemstones: (sanitizedVision.match(/(?:diamond|ruby|sapphire|emerald|pearl|topaz|amethyst|garnet|opal|turquoise)/gi) || []) as string[],
      style: (sanitizedVision.match(/(?:solitaire|halo|vintage|modern|classic|art deco|minimalist|bohemian|contemporary|romantic|glamorous)/gi) || []) as string[],
      finish: (sanitizedVision.match(/(?:polished|matte|brushed|hammered|textured)/gi) || []) as string[],
      jewelryType: (sanitizedVision.match(/(?:ring|earring|earrings|bracelet|necklace|pendant|chain|brooch|anklet|cuff|bangle|stud|hoop|charm)/gi) || ['ring']) as string[]
    };

    // Determine the primary jewelry type - PRIORITIZE NECKLACE over CHAIN
    let primaryType = '';
    if (lowerVision.includes('necklace')) {
      primaryType = 'necklace';
    } else if (lowerVision.includes('bracelet') && !lowerVision.includes('necklace')) {
      primaryType = 'bracelet';
    } else if (lowerVision.includes('earring') || lowerVision.includes('stud') || lowerVision.includes('hoop')) {
      primaryType = 'earring';
    } else if (lowerVision.includes('pendant')) {
      primaryType = 'necklace'; // Pendants are necklaces
    } else if (lowerVision.includes('chain') && !lowerVision.includes('bracelet')) {
      primaryType = 'necklace'; // Chain defaults to necklace unless bracelet mentioned
    } else if (lowerVision.includes('ring')) {
      primaryType = 'ring';
    } else {
      primaryType = designElements.jewelryType[0]?.toLowerCase() || 'ring';
    }
    
    const isRing = primaryType.includes('ring');
    const isEarring = primaryType.includes('earring');
    const isBracelet = primaryType.includes('bracelet');
    const isNecklace = primaryType.includes('necklace');
    
    // Extract setting type if mentioned
    const hasProngSetting = sanitizedVision.toLowerCase().includes('prong');
    const hasBezelSetting = sanitizedVision.toLowerCase().includes('bezel');
    const hasPaveSetting = sanitizedVision.toLowerCase().includes('pave') || sanitizedVision.toLowerCase().includes('pavé');
    
    // Simple, direct type specifications
    let typeSpec = '';
    if (isEarring) {
      typeSpec = `This is a pair of EARRINGS (TWO matching earrings). Show both earrings clearly with identical design.`;
    } else if (isBracelet) {
      typeSpec = `This is a BRACELET designed to wrap around the wrist. Include secure clasp.`;
    } else if (isNecklace) {
      typeSpec = `This is a NECKLACE designed to be worn around the neck. Include delicate chain(s) and clasp.`;
    } else {
      typeSpec = `This is a RING designed to be worn on a finger.`;
    }

    // Simple gemstone specification
    let gemstoneSpec = '';
    if (designElements.gemstones.length > 0) {
      const stones = designElements.gemstones.join(', ');
      gemstoneSpec = `Include ${stones} gemstones with brilliant sparkle and secure setting.`;
    }

    // Simple metal specification
    const metalSpec = designElements.metalColors.length > 0 
      ? designElements.metalColors.join(' and ') + ' metal'
      : 'precious metal';

    // Extract specific details for locked consistency - NAME IS CRITICAL
    // Handle all quote types: regular quotes, smart quotes, backticks
    const extractedName = sanitizedVision.match(/["'"'`]([A-Za-z]+)["'"'`]|(?:with|name)\s+["'"'`]?([A-Za-z]+)["'"'`]?/i);
    const nameText = extractedName ? (extractedName[1] || extractedName[2]) : '';
    
    console.log('🔍 Name extraction:', { extractedName, nameText, originalVision: sanitizedVision.substring(0, 100) });
    
    const chainCount = sanitizedVision.match(/(\w+)\s+chain/i);
    const numberOfChains = chainCount && chainCount[1] ? chainCount[1] : '';
    
    // Create LOCKED design specification with NAME as TOP priority
    const nameWarning = nameText ? `
🚨🚨🚨 CRITICAL NAME REQUIREMENT 🚨🚨🚨
THE JEWELRY MUST DISPLAY THE NAME: "${nameText}"
NOT "Small", NOT "Cute", NOT any other word - ONLY "${nameText}"
This is a CUSTOM NAME PENDANT - the customer specified "${nameText}" and that's what must appear.
Write this EXACT name in elegant script font: ${nameText}
🚨🚨🚨 DO NOT SUBSTITUTE ANY OTHER WORD 🚨🚨🚨
` : '';

    const lockedDesignDetails = `
${nameWarning}

🔒 LOCKED DESIGN SPECIFICATIONS - THESE MUST BE IDENTICAL IN ALL PHOTOS:

USER'S EXACT VISION: "${sanitizedVision}"

JEWELRY TYPE: ${typeSpec}
METAL: ${metalSpec} 
${gemstoneSpec}
${numberOfChains ? `CHAINS: ${numberOfChains} separate chains (CRITICAL: show exactly ${numberOfChains} distinct chains)` : ''}
${nameText ? `⚠️ NAME ON PENDANT: "${nameText}" - Write this EXACT name, letter by letter: ${nameText.split('').join('-')}` : ''}
FINISH: ${designElements.finish.length > 0 ? designElements.finish[0] : 'polished'}
STYLE: ${designElements.style.length > 0 ? designElements.style.join(', ') : 'elegant, timeless'}
`.trim();

    // Create SIMPLE, DIRECT master spec that prioritizes USER VISION
    const masterDesignSpec = `
YOU ARE CREATING A SINGLE PHYSICAL JEWELRY PIECE THAT WILL BE PHOTOGRAPHED FROM MULTIPLE ANGLES.

${nameText ? `
⚠️⚠️⚠️ MOST CRITICAL REQUIREMENT ⚠️⚠️⚠️
This is a CUSTOM NAME NECKLACE/PENDANT featuring the name: "${nameText}"
You MUST write this EXACT name on the pendant: ${nameText}
Do NOT write "Small", "Cute", "Love", or any other word.
ONLY write: ${nameText}
Letter by letter: ${nameText.split('').join(' - ')}
⚠️⚠️⚠️ THIS NAME IS THE CENTERPIECE OF THE DESIGN ⚠️⚠️⚠️
` : ''}

${lockedDesignDetails}

⚠️ ABSOLUTE CONSISTENCY REQUIREMENT - THIS IS CRITICAL:
You are photographing ONE REAL PHYSICAL PIECE from different angles. Think of this like a product photographer shooting the same ring from different positions.

WHAT MUST BE IDENTICAL IN ALL PHOTOS:
✓ The EXACT same number and type of gemstones in EXACT same positions
✓ The EXACT same metal colors and finish
✓ The EXACT same chain count (if chains) - ${numberOfChains ? numberOfChains + ' chains' : 'same number'}
✓ The EXACT same text/name in EXACT same font - ${nameText ? '"' + nameText + '"' : 'if any text'}
✓ The EXACT same design details, patterns, textures
✓ The EXACT same size and proportions
✓ The EXACT same structural elements

WHAT CHANGES BETWEEN PHOTOS:
✗ ONLY the camera angle/position
✗ ONLY the lighting setup
✗ ONLY the background

If someone looks at both photos they must say "that's the exact same piece of jewelry from a different angle" - NOT "those are two similar pieces"

QUALITY REQUIREMENTS:
- Professional luxury jewelry photography
- Ultra-high resolution, photorealistic, magazine quality  
- Beautiful lighting that makes metals gleam and gemstones sparkle
- Emotionally compelling presentation
- Show craftsmanship and fine details

${MANUFACTURING_GUARDRAILS}
`.trim();
    
    // Generate images SEQUENTIALLY to reduce server load and improve consistency
    const images: any[] = [];
    let firstImageRevisedPrompt = '';
    
    for (let index = 0; index < IMAGE_TYPES.length; index++) {
      const imageType = IMAGE_TYPES[index];
      
      const fullPrompt = `${masterDesignSpec}

📸 PHOTOGRAPHY SHOT #${index + 1}: ${imageType.type.toUpperCase()}
Camera Setup: ${imageType.description}
What to Show: ${imageType.consistency_note}

${index > 0 && firstImageRevisedPrompt ? `
🚨🚨🚨 CRITICAL CONSISTENCY REQUIREMENT - PHOTO #${index + 1} 🚨🚨🚨

You MUST photograph the EXACT SAME PHYSICAL JEWELRY PIECE you created in Photo #1.

WHAT YOU CREATED IN PHOTO #1:
"${firstImageRevisedPrompt.substring(0, 500)}..."

Imagine you are a professional product photographer. You shot Photo #1, now you're moving your camera to a different position to shoot Photo #${index + 1} of THE SAME PIECE.

MANDATORY CHECKLIST - THE JEWELRY MUST HAVE:
${nameText ? '☑ EXACT name on pendant: "' + nameText + '" (NOT "Small" or any other word - ONLY "' + nameText + '")' : ''}
☑ EXACT same gemstone count and placement as Photo #1
☑ EXACT same metal colors as Photo #1  
☑ EXACT same chain count as Photo #1 ${numberOfChains ? '(' + numberOfChains + ' chains)' : ''}
☑ EXACT same design details as Photo #1
☑ EXACT same proportions and size as Photo #1

ONLY THESE CHANGE: Camera angle, lighting, background

If you create a DIFFERENT piece of jewelry, this entire photo series is REJECTED and FAILED.
The customer needs to see the SAME piece from multiple angles to make a purchase decision.
` : 'This is the PRIMARY view - establish the design that will be shown from different angles in subsequent photos.'}
`.trim();

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

        const revisedPrompt = imageResponse.data?.[0]?.revised_prompt || null;
        
        // Store first image's revised prompt for consistency in subsequent images
        if (index === 0 && revisedPrompt) {
          firstImageRevisedPrompt = revisedPrompt;
        }
        
        images.push({
          type: imageType.type,
          url: imageResponse.data?.[0]?.url || null,
          prompt: fullPrompt,
          revised_prompt: revisedPrompt
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
      
      // Delay between images to avoid rate limiting and improve consistency
      if (index < IMAGE_TYPES.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 2000)); // 2 second delay for better consistency
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
