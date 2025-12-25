import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';
import { logger } from '@/lib/secure-logger';

/**
 * GDPR Right to Data Portability
 * 
 * Allows users to export all their personal data in machine-readable format (JSON)
 * Must respond within 30 days of request (GDPR requirement)
 * 
 * @route POST /api/user/export-data
 * @access Private (authenticated users only)
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    // Verify authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      logger.warn('Unauthorized data export attempt');
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    logger.gdpr('export', user.id, { initiatedBy: 'user' });

    // Call the database function to export all user data
    const { data: exportData, error: exportError } = await supabase
      .rpc('export_user_data', { target_user_id: user.id });

    if (exportError) {
      logger.error('Data export failed', exportError, { userId: user.id });
      return NextResponse.json(
        { error: 'Failed to export data' },
        { status: 500 }
      );
    }

    // Log successful export in audit log (done by database function)
    logger.info('User data exported successfully', { 
      userId: user.id,
      dataSize: JSON.stringify(exportData).length 
    });

    // Return data as downloadable JSON
    return new NextResponse(JSON.stringify(exportData, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Content-Disposition': `attachment; filename="user-data-${user.id}-${new Date().toISOString()}.json"`,
        'X-Content-Type-Options': 'nosniff',
      },
    });

  } catch (error) {
    logger.error('Unexpected error in data export', error as Error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * Get export status (for large exports)
 * @route GET /api/user/export-data
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

    // Check if there's a recent export in audit logs
    const { data: recentExports } = await supabase
      .from('audit_logs')
      .select('created_at')
      .eq('user_id', user.id)
      .eq('action', 'export')
      .order('created_at', { ascending: false })
      .limit(1);

    return NextResponse.json({
      canExport: true,
      lastExport: recentExports?.[0]?.created_at || null,
      gdprCompliance: 'You can export your data at any time. Data will be provided in JSON format within 30 days.'
    });

  } catch (error) {
    logger.error('Error checking export status', error as Error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

