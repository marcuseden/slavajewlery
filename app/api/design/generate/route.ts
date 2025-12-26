import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { validateDesignForProduction, sanitizePromptForProduction } from '@/lib/manufacturing-rules';
import { createServerSupabaseClient } from '@/lib/supabase';
import { logger } from '@/lib/secure-logger';
import { 
  createDesignFingerprint, 
  getViewSpec, 
  buildElitePrompt 
} from '@/lib/elite-prompt-engineer';
import {
  extractCustomElements,
  validatePromptInclusion,
  validateRevisedPrompt,
  generateValidationReport,
  suggestPromptImprovements
} from '@/lib/design-validator';
import {
  validateConsistency,
  generateConsistencyReport,
  quickConsistencyCheck
} from '@/lib/consistency-validator';
import { storeDesignImages } from '@/lib/image-storage';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// NOTE: Manufacturing guardrails and consistency enforcement now handled by
// the Elite Prompt Engineering System in lib/elite-prompt-engineer.ts

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

    // ============================================================================
    // ELITE PROMPT SYSTEM - Create Design Fingerprint
    // ============================================================================
    
    console.log('🎯 Creating design fingerprint for elite prompt generation...');
    const designFingerprint = createDesignFingerprint(user_vision, sanitizedVision);
    console.log('✓ Design ID:', designFingerprint.id);
    console.log('✓ Metal:', designFingerprint.metal.type);
    console.log('✓ Gemstones:', designFingerprint.gemstones.map(g => `${g.count}× ${g.type}`).join(', ') || 'none');
    console.log('✓ Distinctive features:', designFingerprint.distinctiveFeatures.length);

    // ============================================================================
    // CUSTOM TEXT VALIDATION - Check for names, engravings, custom text
    // ============================================================================
    
    console.log('\n🔍 Validating custom text and names...');
    const customElements = extractCustomElements(user_vision);
    
    if (customElements.customText.length > 0 || customElements.names.length > 0) {
      console.log('📝 Custom elements detected:');
      if (customElements.customText.length > 0) {
        console.log(`   • Custom text: ${customElements.customText.map(t => `"${t}"`).join(', ')}`);
      }
      if (customElements.names.length > 0) {
        console.log(`   • Names: ${customElements.names.map(n => `"${n}"`).join(', ')}`);
      }
      if (customElements.engravings.length > 0) {
        console.log(`   • Engravings: ${customElements.engravings.map(e => `"${e}"`).join(', ')}`);
      }
      
      // Provide suggestions if helpful
      const suggestions = suggestPromptImprovements(user_vision);
      if (suggestions.length > 0) {
        console.log('\n💡 Suggestions for better text rendering:');
        suggestions.forEach(s => console.log(`   • ${s}`));
      }
    } else {
      console.log('ℹ️  No custom text or names detected');
    }
    
    // ============================================================================
    // ELITE IMAGE GENERATION - Two views of the same design
    // ============================================================================
    
    const images: any[] = [];
    const VIEW_COUNT = 2;
    const allPrompts: string[] = [];
    const allRevisedPrompts: (string | null)[] = [];
    
    for (let viewNumber = 1; viewNumber <= VIEW_COUNT; viewNumber++) {
      const viewSpec = getViewSpec(viewNumber as 1 | 2);
      const elitePrompt = buildElitePrompt(user_vision, designFingerprint, viewSpec);
      allPrompts.push(elitePrompt);
      
      console.log(`\n${'='.repeat(70)}`);
      console.log(`🎨 Generating VIEW ${viewNumber}/${VIEW_COUNT}: ${viewSpec.type}`);
      console.log(`${'='.repeat(70)}`);
      console.log('📸 Camera:', viewSpec.cameraAngle);
      console.log('💡 Lighting:', viewSpec.lighting);
      console.log('🎯 Purpose:', viewSpec.purpose);
      console.log(`Prompt length: ${elitePrompt.length} characters`);
      
      // Validate custom text inclusion BEFORE sending to DALL-E
      if (customElements.customText.length > 0 || customElements.names.length > 0) {
        const promptValidation = validatePromptInclusion(user_vision, elitePrompt, designFingerprint);
        if (!promptValidation.isValid) {
          console.log('\n⚠️  PROMPT VALIDATION WARNINGS:');
          promptValidation.errors.forEach(err => console.log(`   ❌ ${err}`));
        } else {
          console.log('✓ Custom text validation passed');
        }
      }
      
      console.log(`${'='.repeat(70)}\n`);
      
      try {
        const imageResponse = await openai.images.generate({
          model: "dall-e-3",
          prompt: elitePrompt,
          n: 1,
          size: "1024x1024",
          quality: "hd", // HD quality for museum-grade jewelry photography
          style: "natural" // Natural for photorealism
        });

        const revisedPrompt = imageResponse.data?.[0]?.revised_prompt || null;
        allRevisedPrompts.push(revisedPrompt);
        
        images.push({
          type: viewSpec.type.toLowerCase(),
          view_number: viewNumber,
          url: imageResponse.data?.[0]?.url || null,
          prompt: elitePrompt,
          revised_prompt: revisedPrompt,
          camera_angle: viewSpec.cameraAngle,
          lighting: viewSpec.lighting,
          design_id: designFingerprint.id
        });
        
        console.log(`✅ View ${viewNumber} generated successfully`);
        if (revisedPrompt) {
          console.log(`📝 DALL-E revised prompt (first 200 chars): ${revisedPrompt.substring(0, 200)}...`);
          
          // Validate DALL-E understood custom text
          if (customElements.customText.length > 0 || customElements.names.length > 0) {
            const revisedValidation = validateRevisedPrompt(user_vision, revisedPrompt);
            if (!revisedValidation.isValid) {
              console.log(`\n⚠️  DALL-E MAY HAVE MISSED CUSTOM TEXT IN VIEW ${viewNumber}:`);
              revisedValidation.errors.forEach(err => console.log(`   ${err}`));
              logger.warn('DALL-E may not have included custom text', { 
                userId: user?.id || 'anonymous',
                viewNumber,
                missingElements: revisedValidation.errors
              });
            } else {
              console.log(`✓ DALL-E correctly understood custom text for View ${viewNumber}`);
            }
          }
        }
        
      } catch (imageError) {
        console.error(`❌ Error generating view ${viewNumber}:`, imageError);
        images.push({
          type: viewSpec.type.toLowerCase(),
          view_number: viewNumber,
          url: null,
          error: imageError instanceof Error ? imageError.message : 'Image generation failed',
          design_id: designFingerprint.id
        });
      }
      
      // Delay between images for rate limiting and consistency
      if (viewNumber < VIEW_COUNT) {
        console.log('⏳ Waiting 2 seconds before next view...\n');
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    // Filter out failed generations
    const successfulImages = images.filter(img => img.url);
    const failedImages = images.filter(img => !img.url);

    console.log(`Generated ${successfulImages.length}/${images.length} images successfully`);

    // ============================================================================
    // STORE IMAGES IN SUPABASE STORAGE - Permanent URLs
    // ============================================================================
    
    if (successfulImages.length > 0) {
      console.log('\n💾 Storing images in Supabase Storage...');
      
      const imagesToStore = successfulImages.map(img => ({
        url: img.url,
        viewNumber: img.view_number
      }));
      
      const storageResults = await storeDesignImages(
        imagesToStore,
        designFingerprint.id,
        user?.id
      );
      
      // Update image URLs with permanent storage URLs
      storageResults.forEach((result, index) => {
        if (result.storageUrl) {
          successfulImages[index].storage_url = result.storageUrl;
          successfulImages[index].original_url = result.originalUrl;
          console.log(`✅ View ${result.viewNumber} stored: ${result.storageUrl}`);
        } else {
          console.warn(`⚠️ View ${result.viewNumber} storage failed: ${result.error}`);
        }
      });
      
      logger.info('Images stored in Supabase', {
        userId: user?.id || 'anonymous',
        designId: designFingerprint.id,
        storedCount: storageResults.filter(r => r.storageUrl).length,
        totalImages: successfulImages.length
      });
    }

    // ============================================================================
    // FINAL VALIDATION REPORT - Custom Text & Names
    // ============================================================================
    
    if (customElements.customText.length > 0 || customElements.names.length > 0) {
      const validationReport = generateValidationReport(
        user_vision,
        allPrompts[0], // Use first prompt as representative
        allRevisedPrompts,
        designFingerprint
      );
      console.log(validationReport);
      
      // Log to secure logger for monitoring
      logger.info('Custom text validation completed', {
        userId: user?.id || 'anonymous',
        designId: designFingerprint.id,
        customTextCount: customElements.customText.length,
        namesCount: customElements.names.length,
        allValidated: allRevisedPrompts.every(rp => validateRevisedPrompt(user_vision, rp).isValid)
      });
    }

    // ============================================================================
    // CONSISTENCY VALIDATION - Verify both views show SAME jewelry
    // ============================================================================
    
    console.log('\n🔄 Validating consistency between View 1 and View 2...');
    const consistencyValidation = validateConsistency(
      designFingerprint,
      allRevisedPrompts[0],
      allRevisedPrompts[1],
      user_vision
    );
    
    const consistencyReport = generateConsistencyReport(
      consistencyValidation,
      designFingerprint.id
    );
    console.log(consistencyReport);
    
    // Log consistency results
    logger.info('Consistency validation completed', {
      userId: user?.id || 'anonymous',
      designId: designFingerprint.id,
      isConsistent: consistencyValidation.isConsistent,
      consistencyScore: consistencyValidation.consistencyScore,
      criticalIssues: consistencyValidation.criticalIssues.length,
      warnings: consistencyValidation.warnings.length
    });
    
    // Alert if major inconsistency detected
    if (!consistencyValidation.isConsistent) {
      console.warn('\n⚠️⚠️⚠️ CONSISTENCY WARNING ⚠️⚠️⚠️');
      console.warn('Views may show DIFFERENT jewelry pieces!');
      console.warn('Consider regenerating for better consistency.');
      console.warn('='.repeat(70) + '\n');
      
      logger.warn('Inconsistent views generated', {
        userId: user?.id || 'anonymous',
        designId: designFingerprint.id,
        issues: consistencyValidation.criticalIssues
      });
    }

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

    // Check if custom text was validated
    const customTextValidation = (customElements.customText.length > 0 || customElements.names.length > 0) 
      ? {
          has_custom_text: true,
          custom_elements: {
            text: customElements.customText,
            names: customElements.names,
            engravings: customElements.engravings,
            numbers: customElements.numbers
          },
          dall_e_understood: allRevisedPrompts.every(rp => validateRevisedPrompt(user_vision, rp).isValid),
          validation_warnings: allRevisedPrompts.map(rp => {
            const val = validateRevisedPrompt(user_vision, rp);
            return val.errors.length > 0 ? val.errors : null;
          }).filter(Boolean)
        }
      : { has_custom_text: false };

    const response = {
      success: true,
      images: successfulImages,
      specifications,
      user_vision,
      sanitized_vision: sanitizedVision,
      design_fingerprint: {
        id: designFingerprint.id,
        jewelry_type: designFingerprint.jewelryType,
        metal: designFingerprint.metal,
        gemstones: designFingerprint.gemstones,
        dimensions: designFingerprint.dimensions,
        distinctive_features: designFingerprint.distinctiveFeatures
      },
      validation: {
        is_manufacturable: validation.isValid,
        issues: validation.issues,
        warnings: validation.warnings
      },
      custom_text_validation: customTextValidation,
      consistency_validation: {
        is_consistent: consistencyValidation.isConsistent,
        consistency_score: consistencyValidation.consistencyScore,
        critical_issues: consistencyValidation.criticalIssues,
        warnings: consistencyValidation.warnings,
        summary: consistencyValidation.summary,
        checks_performed: consistencyValidation.checks.length,
        checks_passed: consistencyValidation.checks.filter(c => c.matches).length
      },
      generated_at: new Date().toISOString(),
      generation_model: "dall-e-3-elite-prompts",
      prompt_system: "elite-5-layer-architecture-v1",
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
