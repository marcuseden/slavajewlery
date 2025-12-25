'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X, Heart, Share2, ShoppingCart, Edit3, ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { ShareButton } from './ShareButton';

interface JewelryImage {
  type: string;
  url?: string;
  local_url?: string;
  prompt: string;
}

interface JewelryDesign {
  id: string;
  title: string;
  prompt: string;
  images: JewelryImage[];
  tags?: string[];
}

interface JewelryViewerProps {
  design: JewelryDesign | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JewelryViewer({ design, isOpen, onClose }: JewelryViewerProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  if (!isOpen || !design) return null;

  const images = design.images?.filter(img => img.local_url || img.url) || [];
  const currentImage = images[currentImageIndex];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getImageTypeLabel = (type: string) => {
    switch (type) {
      case 'packshot': return 'Product Shot';
      case 'hero_angle': return '3/4 View';
      case 'on_model': return 'Worn on Model';
      case 'detail_macro': return 'Close-up Detail';
      default: return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="min-h-screen px-4 flex items-center justify-center">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700">
            <div>
              <h2 className="text-2xl font-bold text-white">{design.title}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                  Custom Design
                </span>
                {design.tags && design.tags.slice(0, 2).map((tag, i) => (
                  <span key={i} className="text-sm bg-slate-700 text-slate-300 px-2 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className="relative bg-slate-950">
              {currentImage && (
                <div className="aspect-square relative">
                  <img
                    src={currentImage.local_url || currentImage.url}
                    alt={`${design.title} - ${getImageTypeLabel(currentImage.type)}`}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image Navigation */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full hover:bg-black/70 transition-colors"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  
                  {/* Image Type Label */}
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                    {getImageTypeLabel(currentImage.type)}
                  </div>
                  
                  {/* Image Counter */}
                  {images.length > 1 && (
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>
              )}

              {/* Image Thumbnails */}
              {images.length > 1 && (
                <div className="p-4 border-t border-slate-700">
                  <div className="flex gap-2 overflow-x-auto">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === currentImageIndex
                            ? 'border-blue-500'
                            : 'border-slate-600 hover:border-slate-500'
                        }`}
                      >
                        <img
                          src={img.local_url || img.url}
                          alt={getImageTypeLabel(img.type)}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Details Section */}
            <div className="p-6 flex flex-col">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-4">Design Description</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  {design.prompt}
                </p>

                {/* Features */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      ⚡
                    </div>
                    <span>AI-Generated Design</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      🏆
                    </div>
                    <span>NYC Master Craftsmen</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      🚀
                    </div>
                    <span>5-Day Delivery</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-300">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                      💎
                    </div>
                    <span>Lifetime Warranty</span>
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-slate-800 border border-slate-600 rounded-lg p-4 mb-6">
                  <div className="text-slate-400 text-sm mb-1">Starting from</div>
                  <div className="text-2xl font-bold text-white">$2,500</div>
                  <div className="text-slate-400 text-sm">Custom pricing based on materials</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsFavorited(!isFavorited)}
                    className={`p-3 border rounded-lg transition-colors ${
                      isFavorited
                        ? 'bg-red-500/20 border-red-500 text-red-400'
                        : 'border-slate-600 text-slate-400 hover:bg-slate-800'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>
                  
                  <ShareButton
                    title={design.title}
                    description={design.prompt}
                    imageUrl={currentImage?.local_url || currentImage?.url}
                    designUrl={typeof window !== 'undefined' ? `${window.location.origin}?design=${design.id}` : `/?design=${design.id}`}
                    className="p-3 border border-slate-600 text-slate-400 hover:bg-slate-800 rounded-lg"
                  >
                    <Share2 className="w-5 h-5" />
                  </ShareButton>
                </div>

                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Order This Design ($2,500+)
                </Button>

                <Link 
                  href={`/design?prompt=${encodeURIComponent(design.prompt)}`}
                  onClick={onClose}
                >
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-800 py-3">
                    <Edit3 className="w-5 h-5 mr-2" />
                    Customize This Design
                  </Button>
                </Link>

                <div className="text-center pt-2">
                  <p className="text-slate-400 text-sm">
                    🔒 Free design consultation • 💎 Premium materials • 🚀 5-day delivery
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
