'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ShareButton } from '@/components/ShareButton';
import { Sparkles, ShoppingCart, Heart, Star, Clock, Shield, Award } from 'lucide-react';
import Link from 'next/link';

interface SharedDesign {
  id: string;
  title: string;
  prompt: string;
  tags: string[];
  jewelry_type: string;
  style_tags: string[];
  materials: string[];
  estimated_price: number;
  pricing_breakdown: {
    materialCost: number;
    laborCost: number;
    gemstoneCost: number;
    subtotal: number;
    margin: number;
    finalPrice: number;
    breakdown: {
      metalType: string;
      materialWeight: number;
      laborHours: number;
      complexity: string;
    };
  };
  images: Array<{ url: string; type: string }>;
  is_public: boolean;
  total_orders: number;
  created_at: string;
  creator?: {
    email: string;
    full_name?: string;
  };
}

export default function SharedDesignPage() {
  const params = useParams();
  const router = useRouter();
  const [design, setDesign] = useState<SharedDesign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await fetch(`/api/designs/shared/${params.id}`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setError('Design not found or no longer available');
          } else {
            setError('Failed to load design');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        setDesign(data);
      } catch (err) {
        console.error('Error fetching design:', err);
        setError('Failed to load design');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchDesign();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mb-4"></div>
            <p className="text-stone-300">Loading design...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !design) {
    return (
      <div className="min-h-screen bg-slate-950">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-stone-100 mb-4">
              {error || 'Design Not Found'}
            </h1>
            <p className="text-stone-400 mb-6">
              This design might have been removed or is no longer available.
            </p>
            <Link href="/designs">
              <Button className="bg-amber-500 hover:bg-amber-600">
                Browse Other Designs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const formatPrice = (cents: number) => {
    return (cents / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const handleOrderNow = () => {
    // Store checkout data
    localStorage.setItem('checkoutData', JSON.stringify({
      designId: design.id,
      sharedDesignId: design.id,
      title: design.title,
      customPrompt: design.prompt,
      pricingBreakdown: {
        subtotal: design.estimated_price / 100,
        discount: 0,
        commission: 0,
        total: design.estimated_price / 100
      },
      images: design.images
    }));
    router.push('/checkout');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      
      {/* Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)',
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 pt-24">
        
        {/* Shared By Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {design.creator?.full_name || design.creator?.email?.split('@')[0] || 'Markus'} has shared this design with you
          </h1>
          <p className="text-2xl text-stone-300 font-semibold">
            {design.title}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left Column - Images */}
          <div className="space-y-6">
            {/* Main Image */}
            {design.images && design.images.length > 0 && (
              <div className="space-y-4">
                <div className="aspect-square bg-gradient-to-br from-stone-800 to-stone-900 rounded-xl overflow-hidden border border-stone-700">
                  <img
                    src={design.images[0].url}
                    alt={design.title}
                    className="w-full h-full object-contain p-8"
                  />
                </div>

                {/* Additional Images */}
                {design.images.length > 1 && (
                  <div className="grid grid-cols-3 gap-4">
                    {design.images.slice(1).map((image, idx) => (
                      <div
                        key={idx}
                        className="aspect-square bg-gradient-to-br from-stone-800 to-stone-900 rounded-lg overflow-hidden border border-stone-700 hover:border-stone-600 transition-colors cursor-pointer"
                      >
                        <img
                          src={image.url}
                          alt={`${design.title} view ${idx + 2}`}
                          className="w-full h-full object-contain p-4"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Trust Badges */}
            <div className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-lg p-6">
              <h3 className="text-sm font-semibold text-stone-300 mb-4 uppercase tracking-wider">
                Why Choose MakeIt
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-amber-400 mb-1">
                    {design.total_orders || 0}+
                  </div>
                  <div className="text-xs text-stone-400">Orders</div>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <div className="text-xs text-stone-400">5-Star Rated</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400 mb-1">
                    100%
                  </div>
                  <div className="text-xs text-stone-400">Guaranteed</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Details & CTA */}
          <div className="space-y-6">
            
            {/* Price */}
            <div className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-lg p-6">
              <div className="text-4xl font-bold text-white mb-2">
                {formatPrice(design.estimated_price)}
              </div>
              <p className="text-sm text-stone-400 mb-4">
                Estimated price - Final quote provided after consultation
              </p>

              {/* Pricing Breakdown */}
              {design.pricing_breakdown && (
                <details className="text-sm text-stone-400">
                  <summary className="cursor-pointer hover:text-stone-300 mb-3 font-medium">
                    📊 Price Breakdown
                  </summary>
                  <div className="space-y-2 pl-4 border-l-2 border-stone-700">
                    <div className="flex justify-between">
                      <span>Materials ({design.pricing_breakdown.breakdown?.materialWeight || 0}g {design.pricing_breakdown.breakdown?.metalType || 'metal'})</span>
                      <span>${design.pricing_breakdown.materialCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Labor ({design.pricing_breakdown.breakdown?.laborHours || 0}h, {design.pricing_breakdown.breakdown?.complexity || 'standard'})</span>
                      <span>${design.pricing_breakdown.laborCost}</span>
                    </div>
                    {design.pricing_breakdown.gemstoneCost > 0 && (
                      <div className="flex justify-between">
                        <span>Gemstones</span>
                        <span>${design.pricing_breakdown.gemstoneCost}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-stone-700">
                      <span>Subtotal</span>
                      <span>${design.pricing_breakdown.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Margin (60%)</span>
                      <span>${design.pricing_breakdown.margin}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-stone-200 pt-2 border-t border-stone-700">
                      <span>Final Price</span>
                      <span>${design.pricing_breakdown.finalPrice}</span>
                    </div>
                  </div>
                </details>
              )}
            </div>

            {/* Design Description */}
            <div className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-stone-100 mb-3">
                Design Details
              </h3>
              <p className="text-stone-300 leading-relaxed mb-4">
                {design.prompt}
              </p>

              {/* Tags */}
              <div className="space-y-3">
                {design.jewelry_type && (
                  <div>
                    <span className="text-xs text-stone-500 uppercase tracking-wider">Type:</span>
                    <div className="mt-1">
                      <span className="inline-block px-3 py-1 bg-blue-900/30 border border-blue-700/30 rounded-full text-xs text-blue-300">
                        {design.jewelry_type}
                      </span>
                    </div>
                  </div>
                )}

                {design.style_tags && design.style_tags.length > 0 && (
                  <div>
                    <span className="text-xs text-stone-500 uppercase tracking-wider">Style:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {design.style_tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-3 py-1 bg-purple-900/30 border border-purple-700/30 rounded-full text-xs text-purple-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {design.materials && design.materials.length > 0 && (
                  <div>
                    <span className="text-xs text-stone-500 uppercase tracking-wider">Materials:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {design.materials.map((material, idx) => (
                        <span
                          key={idx}
                          className="inline-block px-3 py-1 bg-amber-900/30 border border-amber-700/30 rounded-full text-xs text-amber-300"
                        >
                          {material}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Call to Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleOrderNow}
                className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-white font-bold h-14 text-lg shadow-lg"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Order This Design
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-stone-600 text-stone-300 hover:bg-stone-800"
                  onClick={() => router.push('/design?prompt=' + encodeURIComponent(design.prompt))}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Customize
                </Button>

                <ShareButton
                  title={design.title}
                  description={design.prompt}
                  imageUrl={design.images[0]?.url}
                  designUrl={typeof window !== 'undefined' ? window.location.href : ''}
                >
                  <Button
                    variant="outline"
                    className="w-full border-stone-600 text-stone-300 hover:bg-stone-800"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </ShareButton>
              </div>
            </div>

            {/* Create Your Own CTA */}
            <div className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-100 mb-2">
                Want Something Different?
              </h3>
              <p className="text-sm text-blue-200/80 mb-4">
                Create your own custom jewelry design with our AI-powered designer. 
                Just describe your vision and see it come to life!
              </p>
              <Link href="/design">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Your Own Design
                </Button>
              </Link>
            </div>

            {/* How It Works */}
            <div className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-stone-100 mb-4">
                How MakeIt Works
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 text-amber-400 font-bold text-xs">
                    1
                  </div>
                  <div>
                    <div className="font-medium text-stone-200">Describe Your Vision</div>
                    <div className="text-stone-400 text-xs">Tell us what you want or choose from our designs</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 text-amber-400 font-bold text-xs">
                    2
                  </div>
                  <div>
                    <div className="font-medium text-stone-200">AI Creates Your Design</div>
                    <div className="text-stone-400 text-xs">Get photorealistic images in minutes</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 text-amber-400 font-bold text-xs">
                    3
                  </div>
                  <div>
                    <div className="font-medium text-stone-200">Expert Consultation</div>
                    <div className="text-stone-400 text-xs">Refine details with our jewelry experts</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0 text-amber-400 font-bold text-xs">
                    4
                  </div>
                  <div>
                    <div className="font-medium text-stone-200">Handcrafted in NYC</div>
                    <div className="text-stone-400 text-xs">Master jewelers bring it to life (4-6 weeks)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About MakeIt Banner - Below product details for context */}
        <div className="mt-12 bg-gradient-to-r from-amber-900/20 to-yellow-900/20 border border-amber-700/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-amber-100 mb-2">
                Welcome to MakeIt - Custom Jewelry Made Simple
              </h2>
              <p className="text-amber-200/80 text-sm leading-relaxed">
                MakeIt transforms your jewelry dreams into reality. Simply describe your vision, 
                and our AI creates photorealistic designs. Our NYC master jewelers then handcraft 
                each piece with premium materials. From engagement rings to custom necklaces, 
                we bring your unique style to life.
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-amber-300">
                <div className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  <span>Lifetime Guarantee</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  <span>Master Jewelers</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>4-6 Week Delivery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

