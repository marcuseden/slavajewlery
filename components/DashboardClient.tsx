'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Plus, Sparkles, Package, Users, Heart, Download, Truck, CheckCircle, Clock, Eye } from 'lucide-react';
import { Header } from '@/components/Header';

// Dummy data for m_lowegren@mac.com
const DUMMY_DESIGNS = [
  {
    id: '1',
    title: 'Vintage Emerald Ring',
    prompt: 'vintage-inspired engagement ring with art deco elements, platinum setting with emerald center stone and diamond accents',
    image: '/designs/grace-kelly-ring-hero_angle.png',
    created_at: '2024-12-20',
    status: 'saved',
    price: 4500
  },
  {
    id: '2',
    title: 'Modern Pearl Necklace',
    prompt: 'elegant multi-strand pearl necklace, graduated white pearls with diamond clasp, classic sophistication',
    image: '/designs/audrey-pearl-necklace-hero_angle.png',
    created_at: '2024-12-22',
    status: 'saved',
    price: 5200
  },
  {
    id: '3',
    title: 'Geometric Gold Earrings',
    prompt: 'statement lightning bolt earrings, geometric gold design with angular zigzag pattern, art deco glamour',
    image: '/designs/bowie-lightning-earrings-hero_angle.png',
    created_at: '2024-12-24',
    status: 'saved',
    price: 2800
  }
];

const DUMMY_ORDERS = [
  {
    id: 'ORD-2024-001',
    design_title: 'Grace Kelly Solitaire Ring',
    image: '/designs/grace-kelly-ring-hero_angle.png',
    total: 9250,
    status: 'in_production',
    production_stage: 'Stone Setting',
    production_progress: 65,
    estimated_delivery: '2024-12-30',
    ordered_date: '2024-12-18',
    tracking_number: 'USPS-9400123456789',
    receipt_url: '#',
    stages: [
      { name: 'Design Approval', completed: true, date: '2024-12-18' },
      { name: 'Material Sourcing', completed: true, date: '2024-12-19' },
      { name: 'Wax Modeling', completed: true, date: '2024-12-20' },
      { name: 'Casting', completed: true, date: '2024-12-21' },
      { name: 'Stone Setting', completed: false, current: true, date: null },
      { name: 'Polishing', completed: false, date: null },
      { name: 'Quality Check', completed: false, date: null },
      { name: 'Shipping', completed: false, date: null }
    ]
  },
  {
    id: 'ORD-2024-002',
    design_title: 'Bohemian Turquoise Bracelet',
    image: '/designs/frida-turquoise-bracelet-hero_angle.png',
    total: 3200,
    status: 'delivered',
    production_stage: 'Delivered',
    production_progress: 100,
    estimated_delivery: '2024-12-15',
    delivered_date: '2024-12-14',
    ordered_date: '2024-12-08',
    tracking_number: 'USPS-9400123456788',
    receipt_url: '#'
  }
];

const DUMMY_FOLLOWERS = [
  { id: '1', name: 'Sarah Mitchell', avatar: 'SM', designs_liked: 12, following_since: '2024-11' },
  { id: '2', name: 'James Chen', avatar: 'JC', designs_liked: 8, following_since: '2024-12' },
  { id: '3', name: 'Emma Wilson', avatar: 'EW', designs_liked: 15, following_since: '2024-10' }
];

export function DashboardClient() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<'designs' | 'orders' | 'followers'>('designs');
  const [userDesigns, setUserDesigns] = useState<any[]>([]);
  const [loadingDesigns, setLoadingDesigns] = useState(true);

  // Use dummy data for orders and followers (until implemented)
  const userOrders = DUMMY_ORDERS;
  const userFollowers = DUMMY_FOLLOWERS;

  // Load user's designs from database
  useEffect(() => {
    if (user) {
      setLoadingDesigns(true);
      fetch('/api/designs/save', {
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          if (data.designs) {
            // Transform database designs to match component format
            const transformedDesigns = data.designs.map((design: any) => ({
              id: design.id,
              title: design.title || 'Untitled Design',
              prompt: design.prompt,
              image: design.images?.[0]?.url || design.images?.[0]?.local_url || '/designs/grace-kelly-ring-hero_angle.png',
              created_at: design.created_at,
              status: design.status || 'saved',
              price: design.pricing_breakdown?.finalPrice || 2500
            }));
            setUserDesigns(transformedDesigns);
          }
        })
        .catch(err => {
          console.error('Error loading designs:', err);
          // Fallback to dummy data on error
          setUserDesigns(DUMMY_DESIGNS);
        })
        .finally(() => {
          setLoadingDesigns(false);
        });
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen relative bg-slate-950">
        <Header />
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-4">Please Sign In</h1>
            <p className="text-gray-400 mb-8">You need to be signed in to view your pages.</p>
            <Link href="/">
              <Button className="bg-white hover:bg-gray-100 text-black font-semibold px-8 py-4">
                Go Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative bg-slate-950">
      <Header />
      
      {/* Background - Match frontpage */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)',
        }}
      />
      
      {/* Texture overlay - Match frontpage */}
      <div 
        className="fixed inset-0 z-1 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0px, transparent 1px, transparent 2px, rgba(255, 255, 255, 0.03) 3px),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0px, transparent 1px, transparent 2px, rgba(255, 255, 255, 0.03) 3px)
          `,
          opacity: 0.4
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 py-12 pt-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
              My Pages
            </h1>
            <p className="text-xl text-gray-400">
              {user.user_metadata?.full_name || user.email?.split('@')[0]}
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('designs')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'designs'
                  ? 'bg-white text-black'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              My Designs ({userDesigns.length})
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'orders'
                  ? 'bg-white text-black'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <Package className="w-4 h-4 inline mr-2" />
              My Orders ({userOrders.length})
            </button>
            <button
              onClick={() => setActiveTab('followers')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === 'followers'
                  ? 'bg-white text-black'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              My Followers ({userFollowers.length})
            </button>
          </div>

          {/* My Designs Tab */}
          {activeTab === 'designs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Saved Designs</h2>
                <Link href="/design">
                  <Button className="bg-white hover:bg-gray-100 text-black font-semibold">
                    <Plus className="w-4 h-4 mr-2" />
                    New Design
                  </Button>
                </Link>
              </div>

              {loadingDesigns ? (
                <div className="text-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                  <p className="text-gray-400">Loading your designs...</p>
                </div>
              ) : userDesigns.length === 0 ? (
                <div className="text-center py-20 bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-2xl">
                  <Sparkles className="w-16 h-16 text-stone-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-2">No designs yet</h3>
                  <p className="text-gray-400 mb-6">Create your first custom jewelry design</p>
                  <Link href="/design">
                    <Button className="bg-white hover:bg-gray-100 text-black font-semibold">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Create Your First Design
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userDesigns.map((design) => (
                  <div key={design.id} className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden group hover:border-blue-500/50 transition-all">
                    <div className="aspect-square relative bg-stone-900">
                      <img
                        src={design.image}
                        alt={design.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                        Saved
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-white mb-2">{design.title}</h3>
                      <p className="text-stone-400 text-sm line-clamp-2 mb-3">
                        {design.prompt}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold">${design.price.toLocaleString()}</span>
                        <Link href={`/design-view/${design.id}`}>
                          <Button size="sm" className="bg-white hover:bg-gray-100 text-black font-semibold">
                            <Eye className="w-3 h-3 mr-1" />
                            View
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* My Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>

              <div className="space-y-6">
                {userOrders.map((order) => (
                  <div key={order.id} className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Order Image */}
                      <div className="aspect-square relative rounded-lg overflow-hidden bg-stone-900">
                        <img
                          src={order.image}
                          alt={order.design_title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Order Details */}
                      <div className="md:col-span-2">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-white mb-1">{order.design_title}</h3>
                            <p className="text-sm text-gray-400">Order #{order.id}</p>
                            <p className="text-sm text-gray-400">Ordered: {order.ordered_date}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-white">${order.total.toLocaleString()}</div>
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              order.status === 'delivered' 
                                ? 'bg-green-900/30 text-green-400' 
                                : 'bg-blue-900/30 text-blue-400'
                            }`}>
                              {order.status === 'delivered' ? 'Delivered' : 'In Production'}
                            </span>
                          </div>
                        </div>

                        {/* Production Progress */}
                        {order.status === 'in_production' && order.stages && (
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-medium text-gray-300">Production Progress</span>
                              <span className="text-sm text-blue-400 font-semibold">{order.production_progress}%</span>
                            </div>
                            <div className="w-full bg-stone-800 rounded-full h-2 overflow-hidden">
                              <div 
                                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all duration-500"
                                style={{ width: `${order.production_progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-400 mt-2">
                              Current: {order.production_stage} • Est. Delivery: {order.estimated_delivery}
                            </p>
                          </div>
                        )}

                        {/* Production Stages */}
                        {order.stages && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                            {order.stages.map((stage, idx) => (
                              <div key={idx} className={`text-center p-2 rounded-lg ${
                                stage.completed ? 'bg-green-900/20 border border-green-700/30' :
                                stage.current ? 'bg-blue-900/20 border border-blue-700/30' :
                                'bg-stone-800/50 border border-stone-700/30'
                              }`}>
                                {stage.completed ? (
                                  <CheckCircle className="w-4 h-4 text-green-400 mx-auto mb-1" />
                                ) : stage.current ? (
                                  <Clock className="w-4 h-4 text-blue-400 mx-auto mb-1 animate-pulse" />
                                ) : (
                                  <Clock className="w-4 h-4 text-gray-600 mx-auto mb-1" />
                                )}
                                <div className={`text-xs font-medium ${
                                  stage.completed ? 'text-green-400' :
                                  stage.current ? 'text-blue-400' :
                                  'text-gray-500'
                                }`}>
                                  {stage.name}
                                </div>
                                {stage.date && (
                                  <div className="text-[10px] text-gray-500">{stage.date}</div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex gap-2">
                          {order.tracking_number && (
                            <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-stone-800">
                              <Truck className="w-3 h-3 mr-1" />
                              Track: {order.tracking_number}
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-stone-800">
                            <Download className="w-3 h-3 mr-1" />
                            Receipt
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* My Followers Tab */}
          {activeTab === 'followers' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">My Followers</h2>
                <div className="text-gray-400 text-sm">
                  {userFollowers.reduce((sum, f) => sum + f.designs_liked, 0)} total likes
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userFollowers.map((follower) => (
                  <div key={follower.id} className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-4 hover:border-blue-500/50 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                        {follower.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-white">{follower.name}</h3>
                        <p className="text-xs text-gray-400">Following since {follower.following_since}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-4 text-sm">
                      <div>
                        <Heart className="w-4 h-4 text-red-400 inline mr-1" />
                        <span className="text-gray-300">{follower.designs_liked} likes</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 text-center bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/30 rounded-2xl p-8">
                <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Build Your Following</h3>
                <p className="text-gray-300 mb-6">
                  Create more designs and share them to grow your follower base. 
                  Followers get notified when you create new pieces.
                </p>
                <Link href="/design">
                  <Button className="bg-white hover:bg-gray-100 text-black font-semibold">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Create New Design
                  </Button>
                </Link>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}




