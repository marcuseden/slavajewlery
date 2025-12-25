import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { logger } from '@/lib/secure-logger';

/**
 * GDPR Consent Management API
 * 
 * Records and manages user consent for data processing
 * Tracks consent version and changes over time
 * 
 * @route POST /api/user/consent
 * @access Private/Public (depending on context)
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    const body = await request.json();
    
    const {
      userId,
      consentType, // 'terms', 'privacy', 'marketing', 'data_retention'
      consentGiven,
      consentVersion,
      consentText
    } = body;

    // Validate required fields
    if (!userId || !consentType || typeof consentGiven !== 'boolean' || !consentVersion) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get client IP and user agent (for audit trail, stored temporarily)
    const ipAddress = request.headers.get('x-forwarded-for')?.split(',')[0] || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Record consent in GDPR consent log
    const { error: consentError } = await supabase
      .from('gdpr_consent_log')
      .insert({
        user_id: userId,
        consent_type: consentType,
        consent_given: consentGiven,
        consent_version: consentVersion,
        ip_address: ipAddress,
        user_agent: userAgent,
        consent_text: consentText || `${consentType} consent`
      });

    if (consentError) {
      logger.error('Failed to record consent', consentError, { userId });
      return NextResponse.json(
        { error: 'Failed to record consent' },
        { status: 500 }
      );
    }

    // Update user record with latest consent status
    const updateData: any = {};
    
    if (consentType === 'privacy' || consentType === 'terms') {
      updateData.gdpr_consent_given = consentGiven;
      updateData.gdpr_consent_date = new Date().toISOString();
      updateData.gdpr_consent_version = consentVersion;
    }
    
    if (consentType === 'marketing') {
      updateData.marketing_consent = consentGiven;
    }
    
    if (consentType === 'data_retention') {
      updateData.data_retention_notice_accepted = consentGiven;
    }

    if (Object.keys(updateData).length > 0) {
      const { error: updateError } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', userId);

      if (updateError) {
        logger.error('Failed to update user consent', updateError, { userId });
      }
    }

    logger.gdpr('consent', userId, { 
      consentType, 
      consentGiven, 
      version: consentVersion 
    });

    return NextResponse.json({
      success: true,
      message: 'Consent recorded successfully',
      consentId: userId,
      recordedAt: new Date().toISOString()
    });

  } catch (error) {
    logger.error('Unexpected error in consent recording', error as Error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Get user's consent history
 * @route GET /api/user/consent
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Get consent history
    const { data: consentHistory, error: historyError } = await supabase
      .from('gdpr_consent_log')
      .select('consent_type, consent_given, consent_version, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (historyError) {
      logger.error('Failed to fetch consent history', historyError, { userId: user.id });
      return NextResponse.json(
        { error: 'Failed to fetch consent history' },
        { status: 500 }
      );
    }

    // Get current user consent status
    const { data: userData } = await supabase
      .from('users')
      .select('gdpr_consent_given, gdpr_consent_date, gdpr_consent_version, marketing_consent, data_retention_notice_accepted')
      .eq('id', user.id)
      .single();

    return NextResponse.json({
      currentConsent: {
        gdprConsent: userData?.gdpr_consent_given || false,
        gdprConsentDate: userData?.gdpr_consent_date || null,
        gdprConsentVersion: userData?.gdpr_consent_version || null,
        marketingConsent: userData?.marketing_consent || false,
        dataRetentionAccepted: userData?.data_retention_notice_accepted || false
      },
      consentHistory: consentHistory || []
    });

  } catch (error) {
    logger.error('Error fetching consent history', error as Error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Update/withdraw consent
 * @route PATCH /api/user/consent
 */
export async function PATCH(request: NextRequest) {
  try {
    const supabase = createClient();
    const body = await request.json();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { consentType, consentGiven } = body;

    // Record the consent change
    await supabase
      .from('gdpr_consent_log')
      .insert({
        user_id: user.id,
        consent_type: consentType,
        consent_given: consentGiven,
        consent_version: '1.0.0', // Current version
        consent_text: `${consentType} consent ${consentGiven ? 'granted' : 'withdrawn'}`
      });

    // Update user record
    const updateData: any = {};
    
    if (consentType === 'marketing') {
      updateData.marketing_consent = consentGiven;
    }

    if (Object.keys(updateData).length > 0) {
      await supabase
        .from('users')
        .update(updateData)
        .eq('id', user.id);
    }

    logger.gdpr('consent', user.id, { 
      action: consentGiven ? 'granted' : 'withdrawn',
      consentType 
    });

    return NextResponse.json({
      success: true,
      message: `Consent ${consentGiven ? 'granted' : 'withdrawn'} successfully`
    });

  } catch (error) {
    logger.error('Error updating consent', error as Error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

