'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles, Clock, Award, Shield, ArrowRight, Star, CheckCircle } from "lucide-react";
import { AuthProvider } from '@/components/AuthProvider';
import { Header } from '@/components/Header';
import { JewelryViewer } from '@/components/JewelryViewer';

interface JewelryImage {
  type: string;
  url?: string;
  local_url?: string;
  prompt: string;
}

interface ExampleDesign {
  id: string;
  title: string;
  prompt: string;
  tags?: string[];
  image_url?: string;
  images?: JewelryImage[];
}

// Hero jewelry showcase images
const HERO_JEWELRY_IMAGES = [
  { url: '/designs/grace-kelly-ring-hero_angle.png', title: 'Grace Kelly Ring' },
  { url: '/designs/madonna-punk-ring-hero_angle.png', title: 'Madonna Punk Ring' },
  { url: '/designs/audrey-pearl-necklace-hero_angle.png', title: 'Audrey Pearl Necklace' },
  { url: '/designs/bowie-lightning-earrings-hero_angle.png', title: 'Bowie Lightning Earrings' },
  { url: '/designs/frida-turquoise-bracelet-hero_angle.png', title: 'Frida Turquoise Bracelet' }
];

export default function HomePage() {
  const [exampleDesigns, setExampleDesigns] = useState<ExampleDesign[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<ExampleDesign | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  // Randomize hero image on load
  useEffect(() => {
    setCurrentHeroImage(Math.floor(Math.random() * HERO_JEWELRY_IMAGES.length));
  }, []);

  // Rotate hero image every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % HERO_JEWELRY_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Load our consistent design examples
    fetch('/consistent-designs-local.json')
      .then(res => res.json())
      .then(data => {
        // Use the hero_angle or packshot image for homepage previews
        const updatedData = data.map((design: any) => ({
          ...design,
          // Use the hero_angle image for main display
          image_url: design.images?.find((img: any) => img.type === 'hero_angle')?.local_url || 
                     design.images?.find((img: any) => img.type === 'packshot')?.local_url ||
                     design.images?.[0]?.local_url
        }));
        setExampleDesigns(updatedData);
      })
      .catch(err => {
        console.log('Consistent designs not loaded, trying fallback...');
        // Fallback to original examples
        fetch('/example-designs-local.json')
          .then(res => res.json())
          .then(data => {
            const updatedData = data.map((design: any) => ({
              ...design,
              image_url: design.local_image_url || design.image_url
            }));
            setExampleDesigns(updatedData);
          })
          .catch(err => console.log('Examples not loaded yet'));
      });
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen relative bg-slate-950">
        <Header />
        
        {/* Luxury Velvet Black Background */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #000000 100%)',
            backgroundSize: 'cover',
          }}
        />
        
        {/* Velvet texture overlay */}
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
      <div className="relative z-10">

      {/* Hero Section - Apple Style */}
        <section className="relative px-4 sm:px-6 py-8 sm:py-12 md:py-16 pt-20 sm:pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left: Copy */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left order-2 lg:order-1">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-gray-300 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Delivered in 5 Days</span>
              </div>
          
              {/* Headline - Apple Style: Short, Powerful */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight">
                Stunning jewelry.
                <br />
                <span className="bg-gradient-to-r from-gray-400 via-gray-200 to-white bg-clip-text text-transparent">
                  Created instantly.
                </span>
              </h1>
          
              {/* Sub-headline - Shorter, Punchier */}
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-300 leading-relaxed max-w-xl">
                Describe your vision. We create it in seconds.
                <br className="hidden sm:block" />
                <span className="text-white font-medium">Handcrafted in NYC. Yours in 5 days.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 lg:justify-start justify-center pt-4">
                <Button asChild className="bg-white hover:bg-gray-100 text-black font-semibold px-8 py-6 text-lg group shadow-2xl">
                  <Link href="/design">
                    Start Designing
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" asChild className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg backdrop-blur-sm">
                  <Link href="#examples">View Examples</Link>
                </Button>
              </div>

              {/* Key Stats - Minimal */}
              <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-8 pt-4 text-sm sm:text-base">
                <div className="text-gray-400">
                  <span className="text-white font-semibold">30 sec</span> to design
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="text-gray-400">
                  <span className="text-white font-semibold">5 days</span> delivery
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="text-gray-400">
                  <span className="text-white font-semibold">NYC</span> crafted
                </div>
              </div>
            </div>

            {/* Right: Big Rotating Jewelry Image */}
            <div className="relative order-1 lg:order-2">
              <div className="relative aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm border border-white/10 shadow-2xl">
                {/* Rotating jewelry images */}
                {HERO_JEWELRY_IMAGES.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                      index === currentHeroImage ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                ))}
                
                {/* Image indicator dots */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                  {HERO_JEWELRY_IMAGES.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentHeroImage(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentHeroImage 
                          ? 'bg-white w-8' 
                          : 'bg-white/40 hover:bg-white/60'
                      }`}
                      aria-label={`View image ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-white text-black px-6 py-4 rounded-2xl shadow-2xl border border-gray-200">
                <div className="text-2xl font-bold">$2,500+</div>
                <div className="text-xs text-gray-600">Custom designs</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Social Proof - Minimal */}
      <section className="px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">1,000+</div>
              <div className="text-sm text-gray-400 mt-1">Designs created</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div>
              <div className="flex items-center justify-center gap-1 mb-1">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <div className="text-sm text-gray-400">4.9 from 500+ reviews</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">5 days</div>
              <div className="text-sm text-gray-400 mt-1">Guaranteed delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-12 bg-black/30 backdrop-blur-md/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
            <div className="flex items-center space-x-8 text-stone-400">
              <div className="text-center">
                <div className="text-2xl font-bold text-stone-100">1000+</div>
                <div className="text-sm">Designs Created</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-stone-100">5 Days</div>
                <div className="text-sm">Average Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-stone-100">4.9★</div>
                <div className="text-sm">Customer Rating</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-stone-300 ml-2">"Absolutely stunning results" - Sarah M.</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Apple Style: Minimal */}
      <section id="how-it-works" className="px-6 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Effortlessly simple.
              <br />
              <span className="text-gray-400">Remarkably beautiful.</span>
          </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Words become wearable art in seconds.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Grace Kelly Example */}
            <div className="bg-black/30 backdrop-blur-md/50 border border-stone-700 rounded-2xl overflow-hidden group">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="/designs/grace-kelly-ring-hero_angle.png"
                  alt="Grace Kelly Engagement Ring"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-gray-300 text-sm font-medium mb-1">
                    → Grace Kelly Elegance
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-stone-800 border border-stone-600 rounded-lg p-4 mb-4">
                  <p className="text-stone-300 text-sm italic">
                    "A classic solitaire engagement ring inspired by Grace Kelly, platinum setting with brilliant round diamond"
                  </p>
                </div>
                <Link href={`/design?prompt=${encodeURIComponent('A classic solitaire engagement ring inspired by Grace Kelly, platinum setting with brilliant round diamond center stone, elegant cathedral setting, 1950s Hollywood glamour style')}`}>
                  <Button className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-gray-700 text-white font-semibold">
                    Make This Design
                  </Button>
                </Link>
              </div>
            </div>

            {/* Madonna Punk Example */}
            <div className="bg-black/30 backdrop-blur-md/50 border border-stone-700 rounded-2xl overflow-hidden group">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="/designs/madonna-punk-ring-hero_angle.png"
                  alt="Madonna Punk Ring"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-gray-300 text-sm font-medium mb-1">
                    → Madonna Rebellion
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-stone-800 border border-stone-600 rounded-lg p-4 mb-4">
                  <p className="text-stone-300 text-sm italic">
                    "A bold punk rock cocktail ring inspired by Madonna, chunky black metal with silver spikes"
                  </p>
                </div>
                <Link href={`/design?prompt=${encodeURIComponent('A bold punk rock cocktail ring inspired by Madonna, chunky black metal band with silver spikes and dark onyx center stone, edgy 1980s rebellion style')}`}>
                  <Button className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-gray-700 text-white font-semibold">
                    Make This Design
                  </Button>
                </Link>
              </div>
            </div>

            {/* Audrey Hepburn Example */}
            <div className="bg-black/30 backdrop-blur-md/50 border border-stone-700 rounded-2xl overflow-hidden group">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="/designs/audrey-pearl-necklace-hero_angle.png"
                  alt="Audrey Hepburn Necklace"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-gray-300 text-sm font-medium mb-1">
                    → Audrey Sophistication
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="bg-stone-800 border border-stone-600 rounded-lg p-4 mb-4">
                  <p className="text-stone-300 text-sm italic">
                    "An elegant multi-strand pearl necklace inspired by Audrey Hepburn, classic 1960s sophistication"
                  </p>
                </div>
                <Link href={`/design?prompt=${encodeURIComponent('An elegant multi-strand pearl necklace inspired by Audrey Hepburn, graduated white pearls with diamond clasp, classic 1960s sophistication and timeless grace')}`}>
                  <Button className="w-full bg-gradient-to-r from-black to-gray-800 hover:from-gray-900 hover:to-gray-700 text-white font-semibold">
                    Make This Design
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Minimal CTA */}
          <div className="text-center mt-12 sm:mt-16">
            <Link href="/design">
              <Button className="bg-white hover:bg-gray-100 text-black font-semibold px-10 py-6 text-lg shadow-2xl">
                Design Yours Now
              </Button>
            </Link>
            <p className="text-gray-500 text-sm mt-4">Free • Instant • No commitment</p>
          </div>
        </div>
      </section>

      {/* Examples Showcase */}
      <section id="examples" className="px-6 py-16 sm:py-20 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Extraordinary designs.
              <br />
              <span className="text-gray-400">From simple words.</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Each piece crafted to perfection. Delivered in 5 days.
              </p>
            </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {exampleDesigns.slice(0, 6).map((design, index) => (
              <Link 
                key={index}
                href={`/design?prompt=${encodeURIComponent(design.prompt || '')}`}
                className="bg-black/30 backdrop-blur-md rounded-2xl overflow-hidden border border-stone-700 group hover:border-cyan-500 transition-all hover:transform hover:scale-105 cursor-pointer"
              >
                <div className="aspect-square relative">
                  {design.image_url ? (
                    <img
                      src={design.image_url}
                      alt={design.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-800 flex items-center justify-center">
                      <Sparkles className="w-12 h-12 text-stone-500" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <div className="text-gray-300 font-medium text-sm bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full">
                      Click to edit prompt →
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-stone-100 mb-2">{design.title || 'Custom Design'}</h3>
                  <p className="text-stone-400 text-sm mb-4 line-clamp-2">
                    {design.prompt?.slice(0, 120)}...
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {design.tags?.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-stone-800 border border-stone-600 rounded-full text-xs text-stone-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
            </div>

          <div className="text-center">
            <Button asChild className="bg-white hover:bg-gray-100 text-black font-semibold px-10 py-6 text-lg group shadow-2xl">
              <Link href="/design">
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section id="guarantee" className="px-6 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              Exceptional quality.
              <br />
              <span className="text-gray-400">Guaranteed.</span>
          </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center bg-black/30 backdrop-blur-md/50 backdrop-blur-sm rounded-2xl p-8 border border-stone-700">
              <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="font-semibold text-stone-100 mb-3 text-xl">5-Day Delivery</h3>
              <p className="text-stone-400">Guaranteed delivery in 5 business days or your money back. No exceptions.</p>
            </div>
            <div className="text-center bg-black/30 backdrop-blur-md/50 backdrop-blur-sm rounded-2xl p-8 border border-stone-700">
              <Award className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="font-semibold text-stone-100 mb-3 text-xl">Master Craftsmanship</h3>
              <p className="text-stone-400">Every piece crafted by NYC's finest jewelers with decades of experience.</p>
            </div>
            <div className="text-center bg-black/30 backdrop-blur-md/50 backdrop-blur-sm rounded-2xl p-8 border border-stone-700">
              <Shield className="w-16 h-16 mx-auto mb-4 text-green-400" />
              <h3 className="font-semibold text-stone-100 mb-3 text-xl">Lifetime Warranty</h3>
              <p className="text-stone-400">Free repairs, resizing, and polishing for the lifetime of your piece.</p>
            </div>
              </div>

          <div className="text-center bg-black/30 backdrop-blur-md/50 backdrop-blur-sm rounded-2xl p-8 border border-stone-700">
            <p className="text-2xl font-bold text-stone-100 mb-2">100% Satisfaction Guarantee</p>
            <p className="text-stone-300">Not completely in love with your piece? We'll remake it until you are, or provide a full refund.</p>
          </div>
        </div>
      </section>

      {/* Final CTA - Apple Minimal */}
      <section className="px-6 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Your perfect piece.
            <br />
            <span className="text-gray-400">Waiting to be created.</span>
          </h2>
          <div className="space-y-6 mt-10">
            <Button asChild className="bg-white hover:bg-gray-100 text-black font-bold px-12 py-7 text-xl group shadow-2xl">
              <Link href="/design">
                Get Started
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <p className="text-gray-500 text-sm">
              Free to design • 5-day delivery • Lifetime warranty
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-stone-800 bg-stone-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-xl mb-4 text-stone-100">Make It</h3>
              <p className="text-stone-400 mb-4">
                Custom jewelry, handcrafted in NYC. Where technology meets artistry.
              </p>
              <div className="flex space-x-2">
                {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-stone-400 text-sm ml-2">4.9/5 from 500+ reviews</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-stone-200">Product</h4>
              <ul className="space-y-2 text-stone-400">
                <li><Link href="/design" className="hover:text-stone-300 transition-colors">Design Tool</Link></li>
                <li><Link href="#examples" className="hover:text-stone-300 transition-colors">Design Examples</Link></li>
                <li><Link href="#guarantee" className="hover:text-stone-300 transition-colors">Guarantees</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-stone-200">Company</h4>
              <ul className="space-y-2 text-stone-400">
                <li><a href="#" className="hover:text-stone-300 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-stone-300 transition-colors">Master Jewelers</a></li>
                <li><a href="#" className="hover:text-stone-300 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-stone-300 transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-stone-200">Legal</h4>
              <ul className="space-y-2 text-stone-400">
                <li><a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-stone-300 transition-colors">Warranty</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-stone-500 text-sm mb-4 md:mb-0">
              © 2024 Make It Jewelry Studio. Handcrafted with love in NYC.
            </p>
            <div className="flex items-center space-x-4 text-stone-400 text-sm">
              <span>🇺🇸 Made in NYC</span>
              <span>⚡ 5-Day Delivery</span>
              <span>💎 Lifetime Warranty</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
    </div>
    </AuthProvider>
  );
}