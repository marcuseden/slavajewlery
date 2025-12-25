import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const {
      designId,
      customPrompt,
      pricingBreakdown,
      images,
      shippingInfo,
      paymentMethod,
      stripePaymentIntentId
    } = await request.json();

    // Get user from auth
    const authHeader = request.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');
    
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Calculate commission if this is from a shared design
    let commission_cents = 0;
    let shared_design_id = null;
    
    if (designId) {
      const { data: sharedDesign } = await supabase
        .from('shared_designs')
        .select('creator_commission_rate')
        .eq('id', designId)
        .single();
        
      if (sharedDesign) {
        shared_design_id = designId;
        commission_cents = Math.round(pricingBreakdown.subtotal * sharedDesign.creator_commission_rate);
      }
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        shared_design_id,
        status: 'pending',
        subtotal_cents: pricingBreakdown.subtotal * 100, // Convert to cents
        discount_cents: pricingBreakdown.discount * 100,
        commission_cents,
        total_cents: pricingBreakdown.total * 100,
        custom_prompt: customPrompt,
        custom_images: images,
        custom_pricing: pricingBreakdown,
        stripe_payment_intent_id: stripePaymentIntentId,
        shipping_address: shippingInfo
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order creation error:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // Update shared design stats if applicable
    if (shared_design_id) {
      await supabase
        .from('shared_designs')
        .update({
          total_orders: supabase.sql`total_orders + 1`,
          total_revenue: supabase.sql`total_revenue + ${pricingBreakdown.total * 100}`
        })
        .eq('id', shared_design_id);
        
      // Create commission payment record
      if (commission_cents > 0) {
        await supabase
          .from('commission_payments')
          .insert({
            creator_id: user.id, // Will be updated with actual creator_id
            order_id: order.id,
            shared_design_id,
            amount_cents: commission_cents,
            status: 'pending'
          });
      }
    }

    // In production, integrate with Stripe here
    // const paymentIntent = await stripe.paymentIntents.create({...})

    return NextResponse.json({ 
      success: true, 
      id: order.id,
      orderId: order.id 
    });

  } catch (error) {
    console.error('Checkout API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}




