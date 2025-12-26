import { NextRequest, NextResponse } from 'next/server';
import { getSharedImages } from '@/lib/image-storage';

/**
 * GET /api/images/shared/[token]
 * Get shared images by token (public access, no auth required)
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token) {
      return NextResponse.json(
        { error: 'Share token is required' },
        { status: 400 }
      );
    }

    // Get shared images (no auth required)
    const result = await getSharedImages(token);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Share link not found or expired' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      images: result.images,
      designId: result.designId,
      expiresAt: result.expiresAt
    });

  } catch (error) {
    console.error('Error fetching shared images:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

