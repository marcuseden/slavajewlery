'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

interface JewelryImage {
  type: string;
  url?: string;
  local_url?: string;
  prompt: string;
}

interface Design {
  id: string;
  title: string;
  prompt: string;
  tags?: string[];
  image_url?: string;
  images?: JewelryImage[];
}

export default function BrowseDesignsPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('all');

  useEffect(() => {
    // Load designs from JSON files
    Promise.all([
      fetch('/consistent-designs-local.json').then(res => res.json()).catch(() => []),
      fetch('/example-designs-local.json').then(res => res.json()).catch(() => [])
    ])
      .then(([consistentDesigns, exampleDesigns]) => {
        const allDesigns = [...consistentDesigns, ...exampleDesigns].map((design: any) => ({
          ...design,
          image_url: design.images?.find((img: any) => img.type === 'hero_angle')?.local_url || 
                     design.images?.find((img: any) => img.type === 'packshot')?.local_url ||
                     design.local_image_url ||
                     design.image_url ||
                     design.images?.[0]?.local_url
        }));
        setDesigns(allDesigns);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading designs:', err);
        setLoading(false);
      });
  }, []);

  // Extract unique tags
  const allTags = Array.from(new Set(designs.flatMap(d => d.tags || []))).sort();
  const tags = ['all', ...allTags];

  // Filter designs by selected tag
  const filteredDesigns = selectedTag === 'all' 
    ? designs 
    : designs.filter(d => d.tags?.includes(selectedTag));

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
        
      {/* Texture overlay */}
        <div 
          className="fixed inset-0 z-1 pointer-events-none"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
                0deg,
                rgba(255, 255, 255, 0.03) 0px,
                transparent 1px,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 3px
              ),
              repeating-linear-gradient(
                90deg,
                rgba(255, 255, 255, 0.03) 0px,
                transparent 1px,
                transparent 2px,
                rgba(255, 255, 255, 0.03) 3px
              )
            `,
            opacity: 0.4
          }}
        />
        
        {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 py-12 pt-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4">
              Browse Custom Designs
            </h1>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Explore custom jewelry designs. Click any design to use it as inspiration or customize it for yourself.
            </p>
          </div>

          {/* Tag Filter */}
          {tags.length > 1 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 justify-center">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? 'bg-white text-black'
                        : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                    }`}
                  >
                    {tag === 'all' ? 'All Designs' : tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-gray-400">Loading designs...</p>
                    </div>
                  )}

          {/* Designs Grid */}
          {!loading && filteredDesigns.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredDesigns.map((design, index) => (
                <Link 
                  key={`${design.id}-${index}`}
                  href={`/design?prompt=${encodeURIComponent(design.prompt || '')}`}
                  className="group bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:transform hover:scale-105"
                >
                  <div className="aspect-square relative bg-stone-900">
                    {design.image_url ? (
                      <img
                        src={design.image_url}
                        alt={design.title || 'Jewelry design'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Sparkles className="w-12 h-12 text-stone-500" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                      <div className="text-white font-medium text-sm bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full">
                        Use this design →
                      </div>
                    </div>
                      </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2 line-clamp-1">
                      {design.title || 'Custom Design'}
                    </h3>
                    <p className="text-stone-400 text-sm line-clamp-2 mb-3">
                      {design.prompt?.slice(0, 100)}...
                    </p>
                    {design.tags && design.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {design.tags.slice(0, 2).map((tag, i) => (
                          <span key={i} className="px-2 py-1 bg-stone-800 text-stone-300 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                    </Link>
            ))}
          </div>
          )}

          {/* Empty State */}
          {!loading && filteredDesigns.length === 0 && (
            <div className="text-center py-20">
              <Sparkles className="w-16 h-16 text-stone-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No designs found</h3>
              <p className="text-gray-400 mb-6">
                {selectedTag === 'all' 
                  ? 'No designs available yet. Be the first to create one!' 
                  : `No designs found with tag "${selectedTag}"`}
              </p>
              <Link href="/design">
                <Button className="bg-white hover:bg-gray-100 text-black font-semibold px-8 py-6">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Create Your Design
                </Button>
              </Link>
            </div>
          )}

          {/* CTA Section */}
          {!loading && filteredDesigns.length > 0 && (
            <div className="mt-16 text-center bg-gradient-to-r from-black/30 to-gray-800/30 border border-gray-700/50 rounded-2xl p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Create Your Own Design
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Don't see exactly what you want? Describe your dream jewelry and we'll create it in seconds.
              </p>
              <Link href="/design">
                <Button className="bg-white hover:bg-gray-100 text-black font-bold px-10 py-7 text-lg group">
                  Start Designing
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
