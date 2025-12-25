import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { logger } from '@/lib/secure-logger';

/**
 * Save Design API
 * 
 * Allows authenticated users to save designs to their account
 * 
 * @route POST /api/designs/save
 * @access Private (authenticated users only)
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      logger.warn('Unauthorized save design attempt');
      return NextResponse.json(
        { error: 'Authentication required. Please sign in to save designs.' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      prompt,
      images,
      specifications,
      pricing_breakdown,
      jewelry_type,
      style_tags,
      materials,
      makePublic // New parameter to control if design should be shareable
    } = body;

    // Validate required fields
    if (!prompt || !images || !Array.isArray(images)) {
      return NextResponse.json(
        { error: 'Missing required fields: prompt and images are required' },
        { status: 400 }
      );
    }

    logger.info('Saving design', { userId: user.id, makePublic });

    // Save design to user_designs table (private copy)
    const { data: savedDesign, error: saveError } = await supabase
      .from('user_designs')
      .insert({
        user_id: user.id,
        title: title || 'Untitled Design',
        prompt,
        images,
        specifications,
        pricing_breakdown,
        jewelry_type: jewelry_type || 'custom',
        style_tags: style_tags || [],
        materials: materials || {},
        status: 'saved'
      })
      .select()
      .single();

    if (saveError) {
      logger.error('Failed to save design', saveError, { userId: user.id });
      return NextResponse.json(
        { error: 'Failed to save design' },
        { status: 500 }
      );
    }

    logger.info('Design saved successfully', { userId: user.id, designId: savedDesign.id });

    // Also create shareable version if requested
    let sharedDesign = null;
    if (makePublic) {
      // Calculate estimated price in cents
      const estimatedPriceCents = pricing_breakdown?.finalPrice 
        ? Math.round(pricing_breakdown.finalPrice * 100)
        : 250000; // Default $2,500

      const { data: sharedData, error: shareError } = await supabase
        .from('shared_designs')
        .insert({
          creator_id: user.id,
          title: title || 'Custom Design',
          prompt,
          tags: style_tags || [],
          jewelry_type: jewelry_type || 'custom',
          style_tags: style_tags || [],
          materials: Array.isArray(materials) ? materials : [],
          estimated_price: estimatedPriceCents,
          pricing_breakdown,
          images,
          is_public: true
        })
        .select()
        .single();

      if (!shareError && sharedData) {
        sharedDesign = sharedData;
        logger.info('Shared design created', { userId: user.id, sharedDesignId: sharedData.id });
      } else {
        logger.error('Failed to create shared design', shareError, { userId: user.id });
      }
    }

    return NextResponse.json({
      success: true,
      design: savedDesign,
      sharedDesign: sharedDesign,
      message: 'Design saved successfully!'
    });

  } catch (error) {
    logger.error('Unexpected error saving design', error as Error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Get user's saved designs
 * @route GET /api/designs/save
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get user's saved designs
    const { data: designs, error: fetchError } = await supabase
      .from('user_designs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (fetchError) {
      logger.error('Failed to fetch designs', fetchError, { userId: user.id });
      return NextResponse.json(
        { error: 'Failed to fetch designs' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      designs: designs || [],
      total: designs?.length || 0
    });

  } catch (error) {
    logger.error('Error fetching designs', error as Error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Delete a saved design
 * @route DELETE /api/designs/save
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const designId = searchParams.get('id');

    if (!designId) {
      return NextResponse.json(
        { error: 'Design ID required' },
        { status: 400 }
      );
    }

    // Delete design (only if it belongs to the user)
    const { error: deleteError } = await supabase
      .from('user_designs')
      .delete()
      .eq('id', designId)
      .eq('user_id', user.id);

    if (deleteError) {
      logger.error('Failed to delete design', deleteError, { userId: user.id, designId });
      return NextResponse.json(
        { error: 'Failed to delete design' },
        { status: 500 }
      );
    }

    logger.info('Design deleted', { userId: user.id, designId });

    return NextResponse.json({
      success: true,
      message: 'Design deleted successfully'
    });

  } catch (error) {
    logger.error('Error deleting design', error as Error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

