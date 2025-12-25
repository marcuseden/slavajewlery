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
      gemstones: (sanitizedVision.match(/(?:diamond|ruby|sapphire|emerald|pearl|topaz|amethyst|garnet|opal|turquoise)/gi) || []) as string[],
      style: (sanitizedVision.match(/(?:solitaire|halo|vintage|modern|classic|art deco|minimalist|bohemian|contemporary|romantic|glamorous)/gi) || []) as string[],
      finish: (sanitizedVision.match(/(?:polished|matte|brushed|hammered|textured)/gi) || []) as string[],
      jewelryType: (sanitizedVision.match(/(?:ring|earring|earrings|bracelet|necklace|pendant|chain|brooch|anklet|cuff|bangle|stud|hoop|charm)/gi) || ['ring']) as string[]
    };

    // Determine the primary jewelry type
    const primaryType = designElements.jewelryType[0]?.toLowerCase() || 'ring';
    const isRing = primaryType.includes('ring');
    const isEarring = primaryType.includes('earring') || primaryType.includes('stud') || primaryType.includes('hoop');
    const isBracelet = primaryType.includes('bracelet') || primaryType.includes('cuff') || primaryType.includes('bangle');
    const isNecklace = primaryType.includes('necklace') || primaryType.includes('pendant') || primaryType.includes('chain');
    
    // Extract setting type if mentioned
    const hasProngSetting = sanitizedVision.toLowerCase().includes('prong');
    const hasBezelSetting = sanitizedVision.toLowerCase().includes('bezel');
    const hasPaveSetting = sanitizedVision.toLowerCase().includes('pave') || sanitizedVision.toLowerCase().includes('pavé');
    
    // Build dynamic but DETAILED jewelry type description with emotional language
    let typeSpecificDescription = '';
    if (isEarring) {
      typeSpecificDescription = `JEWELRY TYPE: EARRINGS (Matching Pair)
• Structure: TWO perfectly matching earrings with IDENTICAL design in every detail
• Proportions: Elegant, balanced size perfect for showcasing on the ear
• Backing: Professional-grade secure post and butterfly back (for studs) OR smooth hinged closure (for hoops)
• Symmetry: CRITICAL - Both earrings must be perfect mirror images, same size, same stones, same metals
• Wearability: Comfortable weight distribution, designed for all-day elegance
• Impact: Frame the face with timeless beauty and sophisticated sparkle`;
    } else if (isBracelet) {
      typeSpecificDescription = `JEWELRY TYPE: BRACELET (Wrist Adornment)
• Structure: Gracefully wraps around the wrist with fluid, elegant movement
• Dimensions: Substantial presence without overwhelming, perfect balance of weight and delicacy
• Closure: Secure, high-quality clasp (lobster, box, or decorative toggle) with safety catch
• Flexibility: Articulated links OR rigid bangle structure that moves naturally with the wearer
• Fit: Designed for comfortable all-day wear with slight movement allowance
• Impact: Creates a luxurious statement on the wrist, catches light with every gesture`;
    } else if (isNecklace) {
      typeSpecificDescription = `JEWELRY TYPE: NECKLACE (Neck Statement)
• Structure: ${sanitizedVision.toLowerCase().includes('pendant') ? 'Stunning pendant centerpiece suspended from delicate chain' : 'Continuous chain design with flowing, elegant drape'}
• Chain: Professional-grade links with smooth action and luxurious feel
• Proportions: Perfect length that rests elegantly at the décolletage
• Clasp: Secure spring ring or lobster clasp with polished finish
• Movement: Natural drape that follows the curves of the neck and collarbone
• Impact: Draws the eye with sophisticated elegance and timeless beauty`;
    } else {
      // Default to ring with compelling detail
      typeSpecificDescription = `JEWELRY TYPE: RING (Statement of Commitment & Style)
• Structure: Exquisite band that wraps elegantly around the finger
• Proportions: Perfectly balanced width and height - substantial yet refined
• Comfort: Interior comfort-fit design for all-day wearability
• Profile: Dimensionally interesting from every angle - beautiful from top view AND side view
• Presence: Makes a confident statement without overwhelming the hand
• Impact: An heirloom-quality piece that commands attention and admiration`;
    }

    // Build gemstone description with EMOTIONAL, DETAILED language
    let gemstoneDescription = '';
    if (designElements.gemstones.length > 0) {
      const primaryGemstone = designElements.gemstones[0];
      const gemstoneCount = designElements.gemstones.length;
      
      if (primaryGemstone.toLowerCase() === 'pearl') {
        gemstoneDescription = `• Gemstones: ${gemstoneCount > 1 ? 'Multiple luminous' : 'One lustrous'} ${primaryGemstone.toLowerCase()}${gemstoneCount > 1 ? 's' : ''} with natural iridescent glow and mirror-like surface
• Pearl Quality: High-luster cultured pearls with creamy, radiant complexion
• Setting: ${hasProngSetting ? 'Elegant prong or peg setting showcasing pearl beauty' : 'Secure cup setting that cradles the pearl perfectly'}
• Visual Impact: Timeless elegance with soft, romantic luminescence that catches light beautifully`;
      } else {
        const settingStyle = hasProngSetting ? 'Classic prong setting that elevates and showcases the stone brilliance' : 
                           hasBezelSetting ? 'Modern bezel setting with sleek, protective metal embrace' : 
                           hasPaveSetting ? 'Micro-pavé setting with continuous diamond sparkle' : 
                           'Secure, expertly crafted setting that maximizes light performance';
        
        gemstoneDescription = `• Gemstones: ${gemstoneCount > 1 ? `Multiple brilliant ${primaryGemstone}s creating continuous sparkle` : `One breathtaking ${primaryGemstone} center stone with exceptional fire`}
• Cut & Quality: Expertly cut with optimal proportions for maximum brilliance and light return
• Setting: ${settingStyle}
• Visual Impact: Dazzling sparkle that captures light from every angle, creating mesmerizing fire and scintillation`;
      }
    } else {
      gemstoneDescription = `• Design Focus: Pure metal artistry - letting the precious metal's beauty shine through craftsmanship
• Visual Impact: Sculptural elegance through expert metalwork, surface texture, and dimensional design`;
    }

    // Build metal description with luxurious language
    const metalDescription = designElements.metalColors.length > 0 
      ? designElements.metalColors.slice(0, 3).map(m => m.toLowerCase()).join(' beautifully combined with ') + ' in a harmonious fusion'
      : 'premium precious metal with exquisite finish';

    // Create MASTER design specification with DYNAMIC details AND emotional, detailed language
    const masterDesignSpec = `
CREATE A MUSEUM-WORTHY, EMOTIONALLY CAPTIVATING JEWELRY MASTERPIECE WITH ABSOLUTE CONSISTENCY:

USER'S DREAM VISION: ${sanitizedVision}

🎨 MASTER DESIGN BLUEPRINT - LOCK IN THESE EXACT SPECIFICATIONS:

${typeSpecificDescription}

💎 PRECIOUS MATERIALS & CRAFTSMANSHIP:
• Metal Composition: ${metalDescription}
• Surface Treatment: ${designElements.finish.length > 0 ? designElements.finish[0] : 'mirror-polished'} finish with luxurious tactile quality
• Metalwork: Expert craftsmanship with smooth, refined edges and perfect symmetry

${gemstoneDescription}

✨ AESTHETIC & STYLE DIRECTION:
• Design Language: ${designElements.style.length > 0 ? designElements.style.join(', ') + ' styling with' : 'Timeless elegance with'} sophisticated visual appeal
• Emotional Impact: This piece should evoke desire, admiration, and emotional connection
• Heirloom Quality: Designed to be treasured for generations, becoming a family legacy
• Luxury Presence: Museum-worthy presentation that commands attention and respect

⚠️⚠️⚠️ ABSOLUTE CONSISTENCY REQUIREMENTS - CRITICAL:
• You are photographing THE SAME EXACT PHYSICAL PIECE from different camera angles
• IDENTICAL design elements in EVERY photo - no variations allowed
• EXACT same gemstone count, sizes, colors, cuts, and precise placement
• EXACT same metal colors, finish, texture, and surface treatment  
• EXACT same dimensional proportions, scale, and structural details
• EXACT same decorative elements, patterns, engravings, or embellishments
• ONLY the camera position and lighting setup changes between photos
• Someone should look at both photos and INSTANTLY recognize it's the same piece
• If you create even slightly different versions, this entire series FAILS quality control

🏆 DESIGN EXCELLENCE MANDATE - NON-NEGOTIABLE QUALITY STANDARDS:
• Photorealism: Ultra-high resolution, magazine-cover quality, award-winning jewelry photography
• Emotional Resonance: This image should make viewers fall in love, feel desire, imagine wearing it
• Light Performance: Showcase how light dances across metal surfaces and through gemstones
• Dimensional Beauty: Capture depth, dimension, shadows, and three-dimensional form
• Craftsmanship Details: Show the precision, refinement, and expert artisanship
• Aspirational Appeal: This should look like it belongs in a luxury jewelry magazine spread
• Investment Quality: Communicate that this is a significant, valuable, treasured piece

💫 EMOTIONAL STORYTELLING:
• This jewelry represents love, commitment, celebration, personal expression, or treasured memory
• Every detail should communicate luxury, quality, exclusivity, and timeless beauty
• The viewer should imagine the joy of owning this piece, the compliments they'd receive
• Create an image that becomes the standard against which all other jewelry is measured

${MANUFACTURING_GUARDRAILS}
`.trim();
    
    // Generate images SEQUENTIALLY to reduce server load and improve consistency
    const images: any[] = [];
    
    for (let index = 0; index < IMAGE_TYPES.length; index++) {
      const imageType = IMAGE_TYPES[index];
      
      const fullPrompt = `${masterDesignSpec}

📸 PHOTOGRAPHY SETUP FOR THIS SPECIFIC VIEW:
View Type: ${imageType.type.toUpperCase()} ${index > 0 ? `(Photo ${index + 1} of THE SAME JEWELRY PIECE)` : '(Primary View)'}
Camera Setup: ${imageType.description}
What to Show: ${imageType.consistency_note}

${index > 0 ? `
⚠️⚠️⚠️ CONSISTENCY WARNING - THIS IS PHOTO #${index + 1}:
You MUST photograph the EXACT SAME JEWELRY PIECE you created in Photo #1:
• SAME metal colors, finish, and texture
• SAME gemstone types, sizes, colors, and placement (if applicable)
• SAME design patterns, proportions, and scale
• SAME structural elements and decorative details
• ONLY the camera angle changes - NOTHING about the jewelry itself changes
• If you create a different piece, this photo series will FAIL
` : ''}

FINAL QUALITY CHECK:
• Ultra-high resolution, photorealistic, magazine-quality
• Emotionally compelling - viewers should feel desire and admiration  
• Perfect lighting that makes gemstones sparkle and metals gleam (if applicable)
• Professional luxury jewelry photography worthy of a cover shoot
• ${index > 0 ? 'CRITICAL: This must be THE SAME jewelry piece as photo #1, just a different angle!' : 'Create the definitive version of this design'}`;


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
