'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Sparkles, Clock, Award, Shield, ArrowRight, Star, CheckCircle } from "lucide-react";

interface ExampleDesign {
  id: string;
  title: string;
  prompt: string;
  tags: string[];
  image_url?: string;
}

export default function HomePage() {
  const [exampleDesigns, setExampleDesigns] = useState<ExampleDesign[]>([]);

  useEffect(() => {
    // Load our generated examples
    fetch('/example-designs.json')
      .then(res => res.json())
      .then(data => setExampleDesigns(data))
      .catch(err => console.log('Examples not loaded yet'));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-stone-800">
      {/* Header */}
      <header className="relative z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-stone-100 tracking-tight">
            SLAVA
          </div>
          <nav className="hidden md:flex items-center space-x-8 text-stone-300">
            <a href="#how-it-works" className="hover:text-stone-100 transition-colors">How it works</a>
            <a href="#examples" className="hover:text-stone-100 transition-colors">Examples</a>
            <a href="#guarantee" className="hover:text-stone-100 transition-colors">Guarantee</a>
            <Button asChild size="sm" className="bg-amber-500 hover:bg-amber-600 text-black">
              <Link href="/design">Design Now</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Delivered in 5 Business Days</span>
          </div>
          
              <h1 className="text-4xl md:text-6xl font-bold text-stone-100 leading-tight">
                Design Your Dream Jewelry with{" "}
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  AI Magic
                </span>
          </h1>
          
              <p className="text-xl text-stone-300 leading-relaxed">
                Simply describe your vision in words. Our AI instantly creates photorealistic designs 
                and detailed specifications. Master jewelers in NYC handcraft your unique piece 
                and deliver it in just{" "}
                <span className="font-semibold text-amber-400">5 business days</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-6 text-lg group">
              <Link href="/design">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Designing Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
                <Button variant="outline" asChild className="border-stone-600 text-stone-300 hover:bg-stone-800 px-8 py-6 text-lg">
                  <Link href="#examples">See AI Examples</Link>
            </Button>
          </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-amber-500/20 rounded-full flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-200">AI-Powered</p>
                    <p className="text-sm text-stone-400">Instant designs</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-200">5-Day Delivery</p>
                    <p className="text-sm text-stone-400">Guaranteed</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-stone-200">NYC Crafted</p>
                    <p className="text-sm text-stone-400">Master jewelers</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Images */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                {exampleDesigns.slice(0, 4).map((design, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-2xl overflow-hidden bg-stone-800 border border-stone-700 group-hover:border-stone-600 transition-all">
                      {design.image_url ? (
                        <img
                          src={design.image_url}
                          alt={design.title}
                          className="w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-500">
                          <Sparkles className="w-8 h-8" />
                        </div>
                      )}
                    </div>
                    {design.title && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4">
                          <p className="text-white text-sm font-medium">{design.title}</p>
                          <div className="flex space-x-1 mt-1">
                            {design.tags?.slice(0, 2).map((tag, i) => (
                              <span key={i} className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
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
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-stone-300 ml-2">"Absolutely stunning results" - Sarah M.</span>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-stone-100 mb-4">
              From Idea to Reality in 3 Steps
          </h2>
            <p className="text-xl text-stone-400 max-w-2xl mx-auto">
              Our revolutionary AI-powered process makes custom jewelry accessible to everyone
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-2xl font-bold text-black">
                1
              </div>
              <h3 className="text-xl font-semibold text-stone-100">Describe Your Dream</h3>
              <p className="text-stone-400 leading-relaxed">
                Tell us what you envision. "A vintage art deco engagement ring inspired by Grace Kelly's elegance..." 
                Our AI understands natural language and style preferences.
              </p>
            </div>

            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-xl font-semibold text-stone-100">AI Creates Your Design</h3>
              <p className="text-stone-400 leading-relaxed">
                In under 30 seconds, our AI generates photorealistic images and detailed manufacturing 
                specifications. See exactly how your piece will look from every angle.
              </p>
            </div>

            <div className="text-center space-y-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-xl font-semibold text-stone-100">Handcrafted & Delivered</h3>
              <p className="text-stone-400 leading-relaxed">
                Master jewelers in NYC review, approve, and handcraft your piece with meticulous attention to detail. 
                Delivered to your door in just 5 business days.
              </p>
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
              <div key={index} className="bg-stone-900 rounded-2xl overflow-hidden border border-stone-700 group hover:border-stone-600 transition-all hover:transform hover:scale-105">
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
              </div>
            ))}
            </div>

          <div className="text-center">
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black font-semibold px-8 py-6 text-lg group">
              <Link href="/design">
                Create Your Own Design
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section id="guarantee" className="px-6 py-20 bg-gradient-to-r from-amber-500/10 to-orange-500/10">
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
              <Clock className="w-16 h-16 mx-auto mb-4 text-amber-400" />
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
            <Button asChild className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-12 py-8 text-xl group">
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
              <h3 className="font-bold text-xl mb-4 text-stone-100">SLAVA</h3>
              <p className="text-stone-400 mb-4">
                AI-powered custom jewelry, handcrafted in NYC. Where technology meets artistry.
              </p>
              <div className="flex space-x-2">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
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
              © 2024 Slava Jewelry Studio. Handcrafted with AI and love in NYC.
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
  );
}