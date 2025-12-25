'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Shield, Clock, Award, RefreshCw, Heart, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export default function GuaranteePage() {
  const guarantees = [
    {
      icon: Clock,
      title: '5-Day Delivery Guarantee',
      subtitle: 'Or Your Money Back',
      description: 'We guarantee delivery within 5 business days from order approval, or you get a full refund. No exceptions, no fine print.',
      details: [
        'Business days counted from design approval',
        'Free expedited shipping included',
        'Tracking provided immediately',
        'Automatic refund if late'
      ],
      color: 'blue'
    },
    {
      icon: Award,
      title: 'Master Craftsmanship',
      subtitle: 'NYC Expert Jewelers',
      description: 'Every piece is handcrafted by master jewelers with 20+ years of experience in New York City\'s Diamond District.',
      details: [
        'Handcrafted, never mass-produced',
        'Premium materials only',
        'Quality inspection at every stage',
        'Traditional techniques + modern precision'
      ],
      color: 'purple'
    },
    {
      icon: Shield,
      title: 'Lifetime Warranty',
      subtitle: 'Forever Protection',
      description: 'Your jewelry is protected for life. Free repairs, resizing, and professional cleaning for as long as you own the piece.',
      details: [
        'Free resizing (within 2 sizes)',
        'Free professional cleaning',
        'Free prong tightening',
        'Manufacturing defect coverage'
      ],
      color: 'green'
    },
    {
      icon: RefreshCw,
      title: '100% Satisfaction',
      subtitle: 'Love It or Remake It',
      description: 'Not completely in love with your piece? We\'ll remake it until you are, or provide a full refund. Your satisfaction is our obsession.',
      details: [
        'Unlimited design revisions before ordering',
        'One free remake if not satisfied',
        '30-day full refund period',
        'No restocking fees ever'
      ],
      color: 'amber'
    },
    {
      icon: Heart,
      title: 'Authenticity Certificate',
      subtitle: 'Certified Quality',
      description: 'Every piece comes with a certificate of authenticity detailing materials, specifications, and our quality guarantee.',
      details: [
        'Metal purity certification',
        'Gemstone grading (if applicable)',
        'Detailed specifications',
        'Numbered certificate'
      ],
      color: 'red'
    },
    {
      icon: Sparkles,
      title: 'Complimentary Services',
      subtitle: 'White Glove Experience',
      description: 'Luxury packaging, free gift wrapping, personalized note, and complimentary professional photography of your piece.',
      details: [
        'Luxury presentation box',
        'Free gift wrapping available',
        'Professional product photos',
        'Personalized thank you note'
      ],
      color: 'pink'
    }
  ];

  const colorMap: Record<string, string> = {
    blue: 'from-blue-900/20 to-blue-700/20 border-blue-700/30',
    purple: 'from-purple-900/20 to-purple-700/20 border-purple-700/30',
    green: 'from-green-900/20 to-green-700/20 border-green-700/30',
    amber: 'from-amber-900/20 to-amber-700/20 border-amber-700/30',
    red: 'from-red-900/20 to-red-700/20 border-red-700/30',
    pink: 'from-pink-900/20 to-pink-700/20 border-pink-700/30'
  };

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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-900/20 border border-green-700/30 rounded-full text-green-400 text-sm font-medium mb-6">
              <Shield className="w-4 h-4" />
              Industry-Leading Guarantees
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Exceptional Quality.
              <br />
              <span className="text-gray-400">Guaranteed.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We stand behind every piece with industry-leading guarantees. 
              Your satisfaction isn't just our goal—it's our promise.
            </p>
          </div>

          {/* Guarantees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {guarantees.map((guarantee, index) => (
              <div 
                key={index}
                className={`bg-gradient-to-r ${colorMap[guarantee.color]} border rounded-2xl p-6 sm:p-8`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <guarantee.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{guarantee.title}</h3>
                    <div className="text-sm text-gray-300 font-medium">{guarantee.subtitle}</div>
                  </div>
                </div>

                <p className="text-gray-300 mb-6">
                  {guarantee.description}
                </p>

                <ul className="space-y-2">
                  {guarantee.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-white flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 sm:p-12 mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Why Trust Us?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">20+ Years</div>
                <div className="text-gray-400">Master jeweler experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-gray-400">Satisfaction rate</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-white mb-2">$0</div>
                <div className="text-gray-400">Hidden fees or charges</div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Common Questions</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {[
                {
                  q: 'What if I don\'t like the final piece?',
                  a: 'You have 30 days to return for a full refund, or we\'ll remake it once for free until you love it.'
                },
                {
                  q: 'Are the materials really premium quality?',
                  a: 'Yes. We use only real gold (14k-18k), platinum (950+), sterling silver (.925+), and certified gemstones. Every piece comes with a certificate of authenticity.'
                },
                {
                  q: 'What does the lifetime warranty cover?',
                  a: 'Free repairs for manufacturing defects, prong tightening, professional cleaning, and resizing (within 2 sizes) for as long as you own the piece.'
                },
                {
                  q: 'What if delivery takes longer than 5 days?',
                  a: 'Automatic full refund if we miss the 5-business-day deadline from design approval. You don\'t even have to ask.'
                }
              ].map((faq, i) => (
                <details key={i} className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 group">
                  <summary className="font-semibold text-white cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.q}</span>
                    <span className="ml-4 text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-4 text-gray-300">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center bg-gradient-to-r from-black/30 to-gray-800/30 border border-gray-700/50 rounded-2xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Risk-Free Design Guarantee
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start designing with confidence. No commitment until you love it. 
              Every guarantee included automatically.
            </p>
            <Link href="/design">
              <Button className="bg-white hover:bg-gray-100 text-black font-bold px-12 py-7 text-lg group">
                Start Designing Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Free design generation • No credit card required • All guarantees included
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

