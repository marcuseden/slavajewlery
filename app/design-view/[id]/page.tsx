'use client';

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { ShareButton } from '@/components/ShareButton';
import { Share2, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function DesignViewPage() {
  const params = useParams();
  const { user } = useAuth();
  const designId = params.id as string;
  const [design, setDesign] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load design from database
  useEffect(() => {
    if (user) {
      fetch('/api/designs/save', {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          if (data.designs) {
            const foundDesign = data.designs.find((d: any) => d.id === designId);
            if (foundDesign) {
              setDesign({
                id: foundDesign.id,
                title: foundDesign.title || 'Untitled Design',
                prompt: foundDesign.prompt,
                image: foundDesign.images?.[0]?.url || foundDesign.images?.[0]?.local_url || '/designs/grace-kelly-ring-hero_angle.png',
                created_at: foundDesign.created_at,
                price: foundDesign.pricing_breakdown?.finalPrice || 2500,
                designer: user.email?.split('@')[0] || 'designer',
                images: foundDesign.images,
                pricing_breakdown: foundDesign.pricing_breakdown
              });
            }
          }
        })
        .catch(err => {
          console.error('Error loading design:', err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user, designId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!design) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Design Not Found</h1>
          <Link href="/dashboard">
            <Button className="bg-white text-black">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-slate-950">
      <Header />
      
      {/* Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 px-4 py-8 pt-20 max-w-6xl mx-auto">
        
        {/* Product Listing */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          {/* Image */}
          <div className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden">
            <div className="aspect-square relative bg-stone-900">
              <img
                src={design.image}
                alt={design.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                {design.title}
              </h1>
              
              <div className="text-sm text-stone-400 mb-4">
                Designed by <span className="text-white font-medium">{design.designer}</span>
              </div>

              <div className="text-4xl font-bold text-white mb-6">
                ${design.price.toLocaleString()}
              </div>

              <div className="bg-black/30 border border-gray-700/50 rounded-xl p-4 mb-6">
                <h3 className="text-sm font-semibold text-white mb-2 uppercase">Description</h3>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {design.prompt}
                </p>
              </div>

              <div className="space-y-2 text-sm text-stone-400 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Handcrafted in NYC
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  5-day delivery guaranteed
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  Lifetime warranty included
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-6 text-lg"
                onClick={() => {
                  localStorage.setItem('checkoutData', JSON.stringify({
                    designId: design.id,
                    customPrompt: design.prompt,
                    pricingBreakdown: {
                      subtotal: design.price,
                      discount: 0,
                      commission: 0,
                      total: design.price
                    },
                    images: [{ url: design.image }]
                  }));
                  window.location.href = '/checkout';
                }}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Order This Design
              </Button>

              <ShareButton
                title={design.title}
                description={design.prompt}
                imageUrl={design.image}
                design={{
                  prompt: design.prompt,
                  images: [{ url: design.image, type: 'hero_angle', prompt: design.prompt }],
                  jewelry_type: 'custom',
                  style_tags: [],
                  materials: [],
                  pricing_breakdown: {
                    finalPrice: design.price,
                    subtotal: design.price,
                    materialCost: 0,
                    laborCost: 0,
                    gemstoneCost: 0,
                    margin: 0,
                    breakdown: {
                      materialWeight: 0,
                      laborHours: 0
                    }
                  }
                }}
              >
                <Button 
                  variant="outline"
                  className="w-full border-2 border-white/20 text-white hover:bg-white/10 py-6 text-lg"
                >
                  <Share2 className="w-5 h-5 mr-2" />
                  Share Design
                </Button>
              </ShareButton>

              <Link href="/dashboard">
                <Button 
                  variant="ghost"
                  className="w-full text-stone-400 hover:text-white hover:bg-white/5"
                >
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Designer Credit Section */}
        <div className="bg-black/30 border border-gray-700/50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-3">About the Designer</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl">
              {design.designer.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-white font-semibold text-lg">{design.designer}</div>
              <div className="text-stone-400 text-sm">Custom Jewelry Designer</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

