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

export default function HomePage() {
  const [exampleDesigns, setExampleDesigns] = useState<ExampleDesign[]>([]);
  const [selectedDesign, setSelectedDesign] = useState<ExampleDesign | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

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
        
        {/* Manhattan Skyline Background */}
        <div 
          className="fixed inset-0 z-0"
          style={{
            backgroundImage: `url('/manhattan-skyline-bw.svg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(1.5) contrast(0.8) opacity(0.4) sepia(20%) saturate(0.8)',
          }}
        />
        
        {/* Overlay gradient */}
        <div 
          className="fixed inset-0 z-1 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(2, 6, 23, 0.3) 0%, rgba(15, 23, 42, 0.5) 40%, rgba(30, 41, 59, 0.7) 70%, rgba(2, 6, 23, 0.85) 100%)'
          }}
        />
        
        {/* Subtle city lights effect */}
        <div 
          className="fixed inset-0 z-2 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 25% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                         radial-gradient(ellipse at 50% 85%, rgba(34, 197, 94, 0.05) 0%, transparent 40%),
                         radial-gradient(ellipse at 75% 80%, rgba(251, 191, 36, 0.06) 0%, transparent 45%)`
          }}
        />
      
      {/* Content */}
      <div className="relative z-10">

        {/* Hero Section */}
        <section className="relative px-4 sm:px-6 py-12 sm:py-16 md:py-24 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Delivered in 5 Business Days</span>
                <span className="sm:hidden">5-Day Delivery</span>
          </div>
          
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-100 leading-tight">
                Design Your Dream Jewelry with{" "}
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                  AI Magic
                </span>
          </h1>
          
              <p className="text-lg sm:text-xl text-slate-300 leading-relaxed max-w-2xl lg:max-w-none mx-auto lg:mx-0">
                Simply describe your vision in words. Our AI instantly creates photorealistic designs 
                and detailed specifications. Master jewelers in NYC handcraft your unique piece 
                and deliver it in just{" "}
                <span className="font-semibold text-cyan-400">5 business days</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:max-w-none lg:mx-0">
                <Button asChild className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group shadow-lg">
              <Link href="/design">
                    <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
                    <span className="hidden sm:inline">Start Designing Now</span>
                    <span className="sm:hidden">Design Now</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
                <Button variant="outline" asChild className="border-slate-600 text-slate-300 hover:bg-slate-800 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg">
                  <Link href="#examples">See Examples</Link>
            </Button>
          </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
                <div className="flex items-center justify-center sm:justify-start space-x-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">AI-Powered</p>
                    <p className="text-sm text-slate-400">Instant designs</p>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-start space-x-3">
                  <div className="w-10 h-10 bg-cyan-500/20 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">5-Day Delivery</p>
                    <p className="text-sm text-slate-400">Guaranteed</p>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-start space-x-3">
                  <div className="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-teal-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-200">NYC Crafted</p>
                    <p className="text-sm text-slate-400">Master jewelers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Images */}
            <div className="relative mt-8 lg:mt-0">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {exampleDesigns.slice(0, 4).map((design, index) => (
                  <Link 
                    key={index} 
                    href={`/design?prompt=${encodeURIComponent(design.prompt || '')}`}
                    className="relative group cursor-pointer"
                  >
                    <div className="aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 group-hover:border-cyan-500 transition-all">
                      {design.image_url ? (
                        <img
                          src={design.image_url}
                          alt={design.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                          <Sparkles className="w-6 sm:w-8 h-6 sm:h-8" />
                        </div>
                      )}
                    </div>
                    {design.title && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                          <p className="text-white text-xs sm:text-sm font-medium">{design.title}</p>
                          <div className="flex space-x-1 mt-1">
                            {design.tags?.slice(0, 2).map((tag, i) => (
                              <span key={i} className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <p className="text-cyan-400 text-xs mt-2 font-medium">Click to edit and design →</p>
                        </div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 sm:w-24 h-16 sm:h-24 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-20 sm:w-32 h-20 sm:h-32 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="px-6 py-12 bg-stone-900/30">
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
                  <Star key={i} className="w-5 h-5 fill-blue-400 text-blue-400" />
                ))}
              </div>
              <span className="text-stone-300 ml-2">"Absolutely stunning results" - Sarah M.</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Prompt to Product */}
      <section id="how-it-works" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-4">
              From Words to Wearable Art
            </h2>
            <p className="text-xl text-stone-400 max-w-2xl mx-auto">
              See how simple descriptions become stunning jewelry in seconds
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Grace Kelly Example */}
            <div className="bg-stone-900/50 border border-stone-700 rounded-2xl overflow-hidden group">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="/designs/grace-kelly-ring-hero_angle.png"
                  alt="Grace Kelly Engagement Ring"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-cyan-400 text-sm font-medium mb-1">
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
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold">
                    Make This Design
                  </Button>
                </Link>
              </div>
            </div>

            {/* Madonna Punk Example */}
            <div className="bg-stone-900/50 border border-stone-700 rounded-2xl overflow-hidden group">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="/designs/madonna-punk-ring-hero_angle.png"
                  alt="Madonna Punk Ring"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-cyan-400 text-sm font-medium mb-1">
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
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold">
                    Make This Design
                  </Button>
                </Link>
              </div>
            </div>

            {/* Audrey Hepburn Example */}
            <div className="bg-stone-900/50 border border-stone-700 rounded-2xl overflow-hidden group">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="/designs/audrey-pearl-necklace-hero_angle.png"
                  alt="Audrey Hepburn Necklace"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-cyan-400 text-sm font-medium mb-1">
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
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold">
                    Make This Design
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">
                Ready to Create Your Own?
              </h3>
              <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
                Describe any jewelry piece you can imagine - from vintage Victorian rings to modern minimalist necklaces. 
                Our AI understands style, materials, and celebrity inspiration.
              </p>
              <Link href="/design">
                <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold px-8 py-4 text-lg">
                  Start Designing Now →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Examples Showcase */}
      <section id="examples" className="px-6 py-20 bg-stone-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-4">
              Real AI-Generated Designs
            </h2>
            <p className="text-xl text-stone-400 max-w-3xl mx-auto">
              These stunning pieces were created from simple text descriptions using our AI. 
              Each design is unique and ready to become reality in just 5 days.
              </p>
            </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {exampleDesigns.slice(0, 6).map((design, index) => (
              <Link 
                key={index}
                href={`/design?prompt=${encodeURIComponent(design.prompt || '')}`}
                className="bg-stone-900 rounded-2xl overflow-hidden border border-stone-700 group hover:border-cyan-500 transition-all hover:transform hover:scale-105 cursor-pointer"
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
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    AI Generated
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                    <div className="text-cyan-400 font-medium text-sm bg-black/50 backdrop-blur-sm px-3 py-2 rounded-full">
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
            <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-8 py-6 text-lg group">
              <Link href="/design">
                Create Your Own Design
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section id="guarantee" className="px-6 py-20 bg-gradient-to-r from-blue-500/10 to-cyan-500/10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-6">
              Our Unbeatable Guarantee
          </h2>
            <p className="text-xl text-stone-300 max-w-3xl mx-auto">
              We're so confident in our process that we offer industry-leading guarantees. 
              Your satisfaction is our obsession.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center bg-stone-900/50 backdrop-blur-sm rounded-2xl p-8 border border-stone-700">
              <Clock className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <h3 className="font-semibold text-stone-100 mb-3 text-xl">5-Day Delivery</h3>
              <p className="text-stone-400">Guaranteed delivery in 5 business days or your money back. No exceptions.</p>
            </div>
            <div className="text-center bg-stone-900/50 backdrop-blur-sm rounded-2xl p-8 border border-stone-700">
              <Award className="w-16 h-16 mx-auto mb-4 text-blue-400" />
              <h3 className="font-semibold text-stone-100 mb-3 text-xl">Master Craftsmanship</h3>
              <p className="text-stone-400">Every piece crafted by NYC's finest jewelers with decades of experience.</p>
            </div>
            <div className="text-center bg-stone-900/50 backdrop-blur-sm rounded-2xl p-8 border border-stone-700">
              <Shield className="w-16 h-16 mx-auto mb-4 text-green-400" />
              <h3 className="font-semibold text-stone-100 mb-3 text-xl">Lifetime Warranty</h3>
              <p className="text-stone-400">Free repairs, resizing, and polishing for the lifetime of your piece.</p>
            </div>
              </div>

          <div className="text-center bg-stone-900/50 backdrop-blur-sm rounded-2xl p-8 border border-stone-700">
            <p className="text-2xl font-bold text-stone-100 mb-2">100% Satisfaction Guarantee</p>
            <p className="text-stone-300">Not completely in love with your piece? We'll remake it until you are, or provide a full refund.</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-stone-100 mb-6">
            Ready to Create Your Dream Piece?
          </h2>
          <p className="text-xl text-stone-400 mb-8 max-w-2xl mx-auto">
            Join thousands of customers who've brought their jewelry visions to life with AI. 
            Your perfect piece is just one description away.
          </p>
          <div className="space-y-4">
            <Button asChild className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-12 py-8 text-xl group">
            <Link href="/design">
                <Sparkles className="w-6 h-6 mr-3" />
              Start Designing Now
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
            <p className="text-stone-500 text-sm">
              Free AI design generation • No commitment until you love it • 5-day delivery guaranteed
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
                AI-powered custom jewelry, handcrafted in NYC. Where technology meets artistry.
              </p>
              <div className="flex space-x-2">
                {[1,2,3,4,5].map(i => (
              <Star key={i} className="w-4 h-4 fill-blue-400 text-blue-400" />
                ))}
                <span className="text-stone-400 text-sm ml-2">4.9/5 from 500+ reviews</span>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-stone-200">Product</h4>
              <ul className="space-y-2 text-stone-400">
                <li><Link href="/design" className="hover:text-stone-300 transition-colors">AI Design Tool</Link></li>
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
              © 2024 Make It Jewelry Studio. Handcrafted with AI and love in NYC.
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