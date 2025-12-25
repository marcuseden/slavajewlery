import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { logger } from '@/lib/secure-logger';

/**
 * GDPR Right to Erasure (Right to be Forgotten)
 * 
 * Allows users to request deletion or anonymization of their personal data
 * Provides 30-day grace period to cancel deletion request
 * Some data retained for legal/accounting requirements (anonymized)
 * 
 * @route POST /api/user/delete-account
 * @access Private (authenticated users only)
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      logger.warn('Unauthorized deletion attempt');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { immediate = false, reason } = body;

    logger.gdpr('deletion', user.id, { 
      immediate, 
      reason: reason ? '[REDACTED]' : undefined // Don't log user's reason (might contain PII)
    });

    if (immediate) {
      // Immediate anonymization (admin only or special cases)
      const { error: anonymizeError } = await supabase
        .rpc('anonymize_user_data', { target_user_id: user.id });

      if (anonymizeError) {
        logger.error('Immediate anonymization failed', anonymizeError, { userId: user.id });
        return NextResponse.json(
          { error: 'Failed to anonymize data' },
          { status: 500 }
        );
      }

      // Sign out user
      await supabase.auth.signOut();

      logger.info('User data anonymized immediately', { userId: user.id });

      return NextResponse.json({
        success: true,
        message: 'Your account has been anonymized and deleted.',
        deletedAt: new Date().toISOString()
      });

    } else {
      // Schedule deletion with 30-day grace period
      const { error: scheduleError } = await supabase
        .rpc('schedule_user_deletion', { 
          target_user_id: user.id,
          days_until_deletion: 30 
        });

      if (scheduleError) {
        logger.error('Failed to schedule deletion', scheduleError, { userId: user.id });
        return NextResponse.json(
          { error: 'Failed to schedule deletion' },
          { status: 500 }
        );
      }

      logger.info('User deletion scheduled', { userId: user.id });

      return NextResponse.json({
        success: true,
        message: 'Your account deletion has been scheduled.',
        scheduledFor: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        gracePeriodDays: 30,
        cancellationInstructions: 'You can cancel this request from your account settings within 30 days.'
      });
    }

  } catch (error) {
    logger.error('Unexpected error in account deletion', error as Error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Cancel scheduled deletion
 * @route DELETE /api/user/delete-account
 */
export async function DELETE(request: NextRequest) {
  try {
    const supabase = createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Cancel scheduled deletion
    const { error: cancelError } = await supabase
      .from('users')
      .update({
        scheduled_deletion_date: null,
        deletion_requested: false,
        deletion_requested_at: null
      })
      .eq('id', user.id);

    if (cancelError) {
      logger.error('Failed to cancel deletion', cancelError, { userId: user.id });
      return NextResponse.json(
        { error: 'Failed to cancel deletion' },
        { status: 500 }
      );
    }

    logger.gdpr('deletion', user.id, { action: 'cancelled' });

    return NextResponse.json({
      success: true,
      message: 'Your account deletion request has been cancelled.'
    });

  } catch (error) {
    logger.error('Error cancelling deletion', error as Error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Get deletion status
 * @route GET /api/user/delete-account
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Check deletion status
    const { data: userData } = await supabase
      .from('users')
      .select('deletion_requested, scheduled_deletion_date, deletion_requested_at')
      .eq('id', user.id)
      .single();

    return NextResponse.json({
      deletionRequested: userData?.deletion_requested || false,
      scheduledFor: userData?.scheduled_deletion_date || null,
      requestedAt: userData?.deletion_requested_at || null,
      canCancel: userData?.deletion_requested && userData?.scheduled_deletion_date 
        ? new Date(userData.scheduled_deletion_date) > new Date() 
        : false
    });

  } catch (error) {
    logger.error('Error checking deletion status', error as Error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

