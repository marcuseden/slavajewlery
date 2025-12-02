'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Filter, Heart, ShoppingCart, Share2, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { AuthProvider } from '@/components/AuthProvider';
import { ShareButton } from '@/components/ShareButton';

interface SharedDesign {
  id: string;
  title: string;
  prompt: string;
  tags: string[];
  jewelry_type: string;
  style_tags: string[];
  materials: string[];
  estimated_price: number;
  images: any[];
  creator_id: string;
  total_orders: number;
  created_at: string;
  creator?: {
    email: string;
  };
}

export default function DesignsPage() {
  const [designs, setDesigns] = useState<SharedDesign[]>([]);
  const [filteredDesigns, setFilteredDesigns] = useState<SharedDesign[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'popular' | 'price_low' | 'price_high'>('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const jewelryTypes = ['all', 'ring', 'necklace', 'bracelet', 'earrings', 'pendant'];

  useEffect(() => {
    fetchDesigns();
    fetchUserFavorites();
  }, []);

  useEffect(() => {
    filterAndSortDesigns();
  }, [designs, searchQuery, selectedType, sortBy]);

  const fetchDesigns = async () => {
    try {
      const response = await fetch('/api/designs/shared');
      const data = await response.json();
      setDesigns(data);
    } catch (error) {
      console.error('Error fetching designs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUserFavorites = async () => {
    try {
      const response = await fetch('/api/user/favorites');
      if (response.ok) {
        const data = await response.json();
        setFavorites(new Set(data.map((f: any) => f.shared_design_id)));
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const filterAndSortDesigns = () => {
    let filtered = [...designs];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(design =>
        design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        design.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        design.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by jewelry type
    if (selectedType !== 'all') {
      filtered = filtered.filter(design => design.jewelry_type === selectedType);
    }

    // Sort designs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return b.total_orders - a.total_orders;
        case 'price_low':
          return a.estimated_price - b.estimated_price;
        case 'price_high':
          return b.estimated_price - a.estimated_price;
        case 'newest':
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    setFilteredDesigns(filtered);
  };

  const toggleFavorite = async (designId: string) => {
    try {
      const isFavorited = favorites.has(designId);
      const method = isFavorited ? 'DELETE' : 'POST';
      
      const response = await fetch(`/api/user/favorites/${designId}`, {
        method,
      });

      if (response.ok) {
        const newFavorites = new Set(favorites);
        if (isFavorited) {
          newFavorites.delete(designId);
        } else {
          newFavorites.add(designId);
        }
        setFavorites(newFavorites);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleOrder = (design: SharedDesign) => {
    // Store design data for checkout
    localStorage.setItem('checkoutData', JSON.stringify({
      designId: design.id,
      customPrompt: design.prompt,
      pricingBreakdown: {
        subtotal: design.estimated_price,
        discount: Math.round(design.estimated_price * 0.05), // 5% discount for shared designs
        commission: Math.round(design.estimated_price * 0.05), // 5% commission
        total: Math.round(design.estimated_price * 0.95) // After discount
      },
      images: design.images
    }));
    
    window.location.href = '/checkout';
  };

  if (isLoading) {
    return (
      <AuthProvider>
        <div className="min-h-screen bg-slate-950">
          <Header />
          <div className="pt-20 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading designs...</p>
            </div>
          </div>
        </div>
      </AuthProvider>
    );
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-slate-950 relative">
        {/* Times Square NYC Background */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url('/times-square-backdrop.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
          }}
        />
        
        {/* Black overlay for readability */}
        <div 
          className="fixed inset-0 z-1 pointer-events-none bg-black"
          style={{
            opacity: 0.35
          }}
        />
        
        {/* Content */}
        <div className="relative z-10">
          <Header />
          <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">Discover Jewelry Designs</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Browse thousands of AI-generated jewelry designs created by our community. 
              Get 5% off when you order a shared design.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-black/30 backdrop-blur-md rounded-lg p-6 mb-8 border border-gray-700/50">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search designs, materials, styles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-white focus:outline-none"
                />
              </div>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-white focus:outline-none"
              >
                {jewelryTypes.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-white focus:outline-none"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-gray-400">
                {filteredDesigns.length} design{filteredDesigns.length !== 1 ? 's' : ''} found
              </p>
              
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <TrendingUp className="w-4 h-4" />
                <span>Community designs with 5% creator commission</span>
              </div>
            </div>
          </div>

          {/* Design Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDesigns.map((design) => (
              <div key={design.id} className="bg-black/40 backdrop-blur-md rounded-lg overflow-hidden border border-gray-700/50 hover:border-gray-500 transition-all group">
                {/* Image */}
                <div className="aspect-square relative">
                  <img
                    src={design.images[0]?.local_url || design.images[0]?.url || '/placeholder-jewelry.jpg'}
                    alt={design.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => toggleFavorite(design.id)}
                      className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                        favorites.has(design.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.has(design.id) ? 'fill-current' : ''}`} />
                    </button>
                    
                    <ShareButton
                      title={design.title}
                      description={design.prompt}
                      imageUrl={design.images[0]?.local_url || design.images[0]?.url}
                      designUrl={`${window.location.origin}/designs/${design.id}`}
                      className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                    >
                      <Share2 className="w-4 h-4" />
                    </ShareButton>
                  </div>

                  {/* Popular Badge */}
                  {design.total_orders > 10 && (
                    <div className="absolute top-3 left-3 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      Popular
                    </div>
                  )}

                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    5% OFF
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-2 line-clamp-1">{design.title}</h3>
                  <p className="text-gray-400 text-sm mb-3 line-clamp-2">{design.prompt}</p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {design.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Price and Stats */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-lg font-bold text-white">
                        ${Math.round(design.estimated_price * 0.95).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-400 line-through">
                        ${design.estimated_price.toLocaleString()}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-xs text-gray-400">
                        {design.total_orders} order{design.total_orders !== 1 ? 's' : ''}
                      </div>
                      <div className="text-xs text-gray-500">
                        by {design.creator?.email?.split('@')[0] || 'Community'}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleOrder(design)}
                      className="flex-1 bg-white text-black hover:bg-gray-200 font-semibold text-sm"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Order
                    </Button>
                    
                    <Link href={`/design?prompt=${encodeURIComponent(design.prompt)}`}>
                      <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 text-sm">
                        Customize
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredDesigns.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No designs found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
              
              <Link href="/design">
                <Button className="bg-white text-black hover:bg-gray-200">
                  Create New Design
                </Button>
              </Link>
            </div>
          )}

          {/* Call to Action */}
          <div className="mt-12 bg-gradient-to-r from-gray-900 to-gray-800 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Share Your Designs</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Create and share your own jewelry designs to earn 5% commission on every sale. 
              Help others discover unique pieces while earning from your creativity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <Link href="/design">
                <Button className="bg-white text-black hover:bg-gray-200 font-semibold">
                  Create Design
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  My Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}
