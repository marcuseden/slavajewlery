'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/Header';
import { Sparkles, ArrowRight, Star } from 'lucide-react';

export default function ExamplesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'rings', 'necklaces', 'earrings', 'bracelets'];

  const examples = [
    {
      id: 'grace-kelly',
      title: 'Grace Kelly Classic Ring',
      category: 'rings',
      prompt: 'A classic solitaire engagement ring inspired by Grace Kelly, platinum setting with brilliant round diamond center stone, elegant cathedral setting, 1950s Hollywood glamour style',
      image: '/designs/grace-kelly-ring-hero_angle.png',
      images: [
        '/designs/grace-kelly-ring-packshot.png',
        '/designs/grace-kelly-ring-hero_angle.png',
        '/designs/grace-kelly-ring-on_model.png'
      ],
      tags: ['classic', 'platinum', 'diamond', 'engagement'],
      style: '1950s Hollywood Glamour'
    },
    {
      id: 'madonna-punk',
      title: 'Madonna Punk Ring',
      category: 'rings',
      prompt: 'A bold punk rock cocktail ring inspired by Madonna, chunky black metal band with silver spikes and dark onyx center stone, edgy 1980s rebellion style',
      image: '/designs/madonna-punk-ring-hero_angle.png',
      images: [
        '/designs/madonna-punk-ring-packshot.png',
        '/designs/madonna-punk-ring-hero_angle.png',
        '/designs/madonna-punk-ring-on_model.png'
      ],
      tags: ['punk', 'bold', 'onyx', 'statement'],
      style: '1980s Punk Rock'
    },
    {
      id: 'audrey-pearls',
      title: 'Audrey Hepburn Elegance',
      category: 'necklaces',
      prompt: 'An elegant multi-strand pearl necklace inspired by Audrey Hepburn, graduated white pearls with diamond clasp, classic 1960s sophistication and timeless grace',
      image: '/designs/audrey-pearl-necklace-hero_angle.png',
      images: [
        '/designs/audrey-pearl-necklace-packshot.png',
        '/designs/audrey-pearl-necklace-hero_angle.png',
        '/designs/audrey-pearl-necklace-on_model.png'
      ],
      tags: ['elegant', 'pearls', 'classic', 'multi-strand'],
      style: '1960s Sophistication'
    },
    {
      id: 'bowie-earrings',
      title: 'Bowie Lightning Earrings',
      category: 'earrings',
      prompt: 'Statement lightning bolt earrings inspired by David Bowie, geometric gold design with angular zigzag pattern, art deco meets rock star glamour',
      image: '/designs/bowie-lightning-earrings-hero_angle.png',
      images: [
        '/designs/bowie-lightning-earrings-packshot.png',
        '/designs/bowie-lightning-earrings-hero_angle.png',
        '/designs/bowie-lightning-earrings-on_model.png'
      ],
      tags: ['statement', 'gold', 'geometric', 'art deco'],
      style: 'Art Deco Rock'
    },
    {
      id: 'frida-bracelet',
      title: 'Frida Bohemian Bracelet',
      category: 'bracelets',
      prompt: 'A bohemian charm bracelet inspired by Frida Kahlo, rose gold setting with turquoise stones and small artistic charms, Mexican folk art influence with organic flowing design',
      image: '/designs/frida-turquoise-bracelet-hero_angle.png',
      images: [
        '/designs/frida-turquoise-bracelet-packshot.png',
        '/designs/frida-turquoise-bracelet-hero_angle.png',
        '/designs/frida-turquoise-bracelet-on_model.png'
      ],
      tags: ['bohemian', 'rose gold', 'turquoise', 'charms'],
      style: 'Mexican Folk Art'
    }
  ];

  const filteredExamples = selectedCategory === 'all' 
    ? examples 
    : examples.filter(ex => ex.category === selectedCategory);

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
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
              Real AI-Generated.
              <br />
              <span className="text-gray-400">Handcrafted in NYC.</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Every piece you see was created from a simple text description. 
              Click any design to use it as your starting point.
            </p>
          </div>

          {/* Category Filter */}
          <div className="mb-12">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-white text-black'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {cat === 'all' ? 'All Examples' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Examples Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {filteredExamples.map((example) => (
              <div 
                key={example.id}
                className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden group hover:border-blue-500/50 transition-all"
              >
                {/* Image Gallery */}
                <div className="grid grid-cols-3 gap-2 p-4 bg-stone-900/50">
                  {example.images.map((img, idx) => (
                    <div key={idx} className="aspect-square relative rounded-lg overflow-hidden">
                      <img
                        src={img}
                        alt={`${example.title} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-2">{example.title}</h3>
                    <div className="text-sm text-blue-400 font-medium mb-3">{example.style}</div>
                    <p className="text-gray-300 italic">"{example.prompt}"</p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {example.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-stone-800 text-stone-300 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link href={`/design?prompt=${encodeURIComponent(example.prompt)}`}>
                    <Button className="w-full bg-white hover:bg-gray-100 text-black font-semibold group">
                      Use This Design
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonial Section */}
          <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-700/30 rounded-2xl p-8 sm:p-12 mb-16">
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex justify-center mb-4">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <blockquote className="text-2xl text-white font-medium mb-4">
                "I described my grandmother's vintage ring from memory, and the AI created something even more beautiful. The craftsmanship is exceptional."
              </blockquote>
              <div className="text-gray-400">— Sarah M., Manhattan</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-black/30 to-gray-800/30 border border-gray-700/50 rounded-2xl p-8 sm:p-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Create Your Own Masterpiece
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              These are just examples. Describe any jewelry you can imagine, 
              and our AI will create a unique design just for you.
            </p>
            <Link href="/design">
              <Button className="bg-white hover:bg-gray-100 text-black font-bold px-12 py-7 text-lg group">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Designing
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-gray-500 mt-4">
              Free design generation • No commitment • 5-day delivery
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

