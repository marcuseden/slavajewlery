import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase';
import { createShareableLink } from '@/lib/image-storage';
import { logger } from '@/lib/secure-logger';

/**
 * POST /api/images/share
 * Create a shareable link for design images (30-day expiration)
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Authentication required to create share links' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { designId, imagePaths } = body;

    if (!designId || !imagePaths || !Array.isArray(imagePaths) || imagePaths.length === 0) {
      return NextResponse.json(
        { error: 'Design ID and image paths are required' },
        { status: 400 }
      );
    }

    // Create shareable link
    const result = await createShareableLink(designId, user.id, imagePaths);

    if (!result.success) {
      logger.error('Failed to create share link', {
        userId: user.id,
        designId,
        error: result.error
      });
      return NextResponse.json(
        { error: result.error || 'Failed to create share link' },
        { status: 500 }
      );
    }

    logger.info('Share link created', {
      userId: user.id,
      designId,
      shareToken: result.shareToken,
      expiresAt: result.expiresAt
    });

    return NextResponse.json({
      success: true,
      shareUrl: result.shareUrl,
      shareToken: result.shareToken,
      expiresAt: result.expiresAt,
      expiresInDays: 30
    });

  } catch (error) {
    console.error('Share link creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

