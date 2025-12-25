'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Sparkles, MessageSquare, Wand2, Camera, Truck, CheckCircle, ArrowRight } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    {
      number: 1,
      icon: MessageSquare,
      title: 'Describe Your Vision',
      description: 'Tell us what you want in simple words. Use our smart tags or type freely - describe the style, metal, stones, size, or inspiration.',
      details: [
        'Use natural language - no jewelry expertise needed',
        'Click helper tags for instant guidance',
        'Get real-time suggestions for missing details',
        'Our AI understands celebrity styles and eras'
      ],
      image: '/designs/grace-kelly-ring-hero_angle.png',
      time: '30 seconds'
    },
    {
      number: 2,
      icon: Wand2,
      title: 'AI Creates Your Design',
      description: 'Our advanced AI generates photorealistic images and detailed manufacturing specifications in under 90 seconds.',
      details: [
        '3 professional product photos from different angles',
        'Detailed manufacturing specifications',
        'Accurate pricing based on materials',
        '100% manufacturable designs guaranteed'
      ],
      image: '/designs/audrey-pearl-necklace-hero_angle.png',
      time: '60-90 seconds'
    },
    {
      number: 3,
      icon: Camera,
      title: 'Review & Refine',
      description: 'See your design from multiple angles. Love it? Order it. Want changes? Adjust your description and regenerate instantly.',
      details: [
        'Multiple camera angles of the same piece',
        'Zoom in to see craftsmanship details',
        'Instant regeneration with tweaked prompts',
        'Save your favorite designs'
      ],
      image: '/designs/bowie-lightning-earrings-hero_angle.png',
      time: 'Your pace'
    },
    {
      number: 4,
      icon: Truck,
      title: 'NYC Master Crafts It',
      description: 'Master jewelers in NYC handcraft your unique piece using premium materials. Delivered to your door in 5 business days.',
      details: [
        'Handcrafted by experienced NYC jewelers',
        'Premium materials - real gold, platinum, diamonds',
        'Quality inspection at every stage',
        '5-day delivery guarantee'
      ],
      image: '/designs/frida-turquoise-bracelet-hero_angle.png',
      time: '5 business days'
    }
  ];

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
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0px, transparent 1px, transparent 2px, rgba(255, 255, 255, 0.03) 3px),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.03) 0px, transparent 1px, transparent 2px, rgba(255, 255, 255, 0.03) 3px)
          `,
          opacity: 0.4
        }}
      />

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-6 py-12 pt-24">
        <div className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              From Words to Wearable.
              <br />
              <span className="text-gray-400">In 4 Simple Steps.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Our AI-powered process transforms your description into a custom jewelry piece, 
              handcrafted by NYC master jewelers and delivered in just 5 days.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No design skills needed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>100% manufacturable</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>5-day delivery</span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div 
                key={step.number}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 font-medium">STEP {step.number}</div>
                      <h2 className="text-3xl font-bold text-white">{step.title}</h2>
                    </div>
                  </div>

                  <p className="text-xl text-gray-300">
                    {step.description}
                  </p>

                  <ul className="space-y-3">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                    <span className="text-sm text-gray-400">Time:</span>
                    <span className="text-sm font-semibold text-white">{step.time}</span>
                  </div>
                </div>

                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="aspect-square max-w-md mx-auto relative rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-br from-white/5 to-white/0">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full font-medium">
                      Step {step.number}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Technology Section */}
          <div className="mt-24 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-2xl p-8 sm:p-12">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Powered by Advanced AI
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                We use OpenAI's DALL-E 3 for photorealistic image generation and GPT-4 for 
                manufacturing specifications. Every design is validated for manufacturability 
                before you see it.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">60-90s</div>
                  <div className="text-sm text-gray-400">Generation time</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">100%</div>
                  <div className="text-sm text-gray-400">Manufacturable</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">3 Views</div>
                  <div className="text-sm text-gray-400">Per design</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Create Your Dream Piece?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start designing now. No commitment until you love it.
            </p>
            <Link href="/design">
              <Button className="bg-white hover:bg-gray-100 text-black font-bold px-12 py-7 text-lg group">
                Start Designing
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Free to design • 5-day delivery • Lifetime warranty
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

