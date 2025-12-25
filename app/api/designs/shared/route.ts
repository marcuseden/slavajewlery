import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const type = searchParams.get('type');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy') || 'newest';

    let query = supabase
      .from('shared_designs')
      .select(`
        *,
        creator:users!creator_id(email)
      `)
      .eq('is_public', true)
      .range(offset, offset + limit - 1);

    // Filter by jewelry type
    if (type && type !== 'all') {
      query = query.eq('jewelry_type', type);
    }

    // Search functionality
    if (search) {
      query = query.or(`
        title.ilike.%${search}%,
        prompt.ilike.%${search}%,
        tags.cs.{${search}}
      `);
    }

    // Sort options
    switch (sortBy) {
      case 'popular':
        query = query.order('total_orders', { ascending: false });
        break;
      case 'price_low':
        query = query.order('estimated_price', { ascending: true });
        break;
      case 'price_high':
        query = query.order('estimated_price', { ascending: false });
        break;
      case 'newest':
      default:
        query = query.order('created_at', { ascending: false });
        break;
    }

    const { data, error } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch designs' }, { status: 500 });
    }

    return NextResponse.json(data || []);

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      prompt,
      tags,
      jewelry_type,
      style_tags,
      materials,
      estimated_price,
      pricing_breakdown,
      images
    } = await request.json();

    // Get authenticated user
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create shared design
    const { data, error } = await supabase
      .from('shared_designs')
      .insert({
        creator_id: user.id,
        title,
        prompt,
        tags,
        jewelry_type,
        style_tags,
        materials,
        estimated_price: Math.round(estimated_price), // Ensure integer
        pricing_breakdown,
        images,
        is_public: true
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to create design' }, { status: 500 });
    }

    return NextResponse.json(data);

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
