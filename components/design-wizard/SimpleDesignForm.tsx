'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Header } from '@/components/Header';

// Simplified tag clouds - only Type, Style, and Material
const JEWELRY_TYPES = [
  'engagement ring', 'wedding band', 'necklace', 'earrings', 'bracelet', 
  'pendant', 'cocktail ring', 'tennis bracelet', 'choker', 'cuff bracelet'
];

const STYLES = [
  'vintage', 'modern', 'minimalist', 'art deco', 'classic', 'bohemian',
  'punk', 'disco', 'victorian', 'romantic', 'bold', 'delicate'
];

const MATERIALS = [
  'platinum', 'yellow gold', 'white gold', 'rose gold', 'sterling silver',
  '14k gold', '18k gold', 'brushed steel', 'polished finish', 'matte finish'
];

// Example prompts with celebrity and subculture inspiration
const EXAMPLE_PROMPTS = [
  {
    title: "Madonna Punk Ring",
    prompt: "A bold punk rock cocktail ring inspired by Madonna, chunky black metal band with silver spikes and dark onyx center stone, edgy 1980s rebellion style",
    image: "/designs/madonna-punk-ring-hero_angle.png"
  },
  {
    title: "Grace Kelly Classic",
    prompt: "A classic solitaire engagement ring inspired by Grace Kelly, platinum setting with brilliant round diamond center stone, elegant cathedral setting, 1950s Hollywood glamour style",
    image: "/designs/grace-kelly-ring-hero_angle.png"
  },
  {
    title: "Bowie Lightning Earrings", 
    prompt: "Statement lightning bolt earrings inspired by David Bowie, geometric gold design with angular zigzag pattern, art deco meets rock star glamour",
    image: "/designs/bowie-lightning-earrings-hero_angle.png"
  },
  {
    title: "Frida Bohemian Bracelet",
    prompt: "A bohemian charm bracelet inspired by Frida Kahlo, rose gold setting with turquoise stones and small artistic charms, Mexican folk art influence with organic flowing design",
    image: "/designs/frida-turquoise-bracelet-hero_angle.png"
  },
  {
    title: "Audrey Hepburn Elegance",
    prompt: "An elegant multi-strand pearl necklace inspired by Audrey Hepburn, graduated white pearls with diamond clasp, classic 1960s sophistication and timeless grace",
    image: "/designs/audrey-pearl-necklace-hero_angle.png"
  }
];

interface GeneratedImage {
  url: string;
  type: string;
  prompt: string;
}

export function SimpleDesignForm() {
  const searchParams = useSearchParams();
  const [vision, setVision] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState('');
  const [showTips, setShowTips] = useState(true);
  const [currentExample, setCurrentExample] = useState<typeof EXAMPLE_PROMPTS[0] | null>(null);

  // Pre-fill the form with prompt from URL parameters
  useEffect(() => {
    const promptFromUrl = searchParams.get('prompt');
    if (promptFromUrl) {
      setVision(promptFromUrl);
      // Find which example this prompt matches
      const matchingExample = EXAMPLE_PROMPTS.find(example => example.prompt === promptFromUrl);
      if (matchingExample) {
        setCurrentExample(matchingExample);
      }
      // If there's a prompt, hide tips to focus on the form
      setShowTips(false);
    }
  }, [searchParams]);

  const handleGenerate = async () => {
    if (!vision.trim() || vision.length < 20) {
      setError('Please provide a more detailed description (at least 20 characters)');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedImages([]);

    try {
      const response = await fetch('/api/design/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_vision: vision,
          intent: 'custom',
          category: 'jewelry',
          metal: 'platinum',
          karat: '950',
          style_tags: ['custom'],
          price_band: '2000-3000',
          stone_config: { center_stone: { type: 'diamond', shape: 'round', carat: 1 } },
          size_fit: { ring_size: 7 }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate design');
      }

      const result = await response.json();
      
      if (result.images && Array.isArray(result.images)) {
        setGeneratedImages(result.images);
      } else {
        throw new Error('Invalid response format');
      }

    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate design');
    } finally {
      setIsGenerating(false);
    }
  };

  const addToVision = (text: string) => {
    const currentText = vision.trim();
    const separator = currentText.length > 0 ? (currentText.endsWith('.') || currentText.endsWith(',') ? ' ' : ', ') : '';
    const newVision = currentText + separator + text;
    setVision(newVision);
  };

  return (
    <div className="min-h-screen relative bg-slate-950">
      <Header />
      
      {/* Manhattan Skyline Background */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url('/manhattan-skyline-photo.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.7) contrast(1.2) opacity(0.6) grayscale(100%)',
        }}
      />
      
      {/* Overlay gradient */}
      <div 
        className="fixed inset-0 z-1 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 40%, rgba(0, 0, 0, 0.6) 70%, rgba(0, 0, 0, 0.8) 100%)'
        }}
      />
      
      {/* Subtle city lights effect */}
      <div 
        className="fixed inset-0 z-2 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 25% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 50%),
                       radial-gradient(ellipse at 50% 85%, rgba(255, 255, 255, 0.015) 0%, transparent 40%),
                       radial-gradient(ellipse at 75% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 45%)`
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-100 mb-4">
            Design Your Dream Jewelry
          </h1>
          <p className="text-xl text-stone-400 mb-8">
            Describe your vision and watch AI bring it to life with photorealistic images
          </p>
        </div>

        {/* Simplified Tag Clouds */}
        {showTips && (
          <div className="bg-stone-900 border border-stone-700 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-stone-100">
                Quick Tags
              </h2>
              <button
                onClick={() => setShowTips(false)}
                className="text-stone-400 hover:text-stone-300 text-sm"
              >
                Hide ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Type */}
              <div>
                <h3 className="text-sm font-medium text-stone-200 mb-3 uppercase tracking-wider">
                  Type
                </h3>
                <div className="flex flex-wrap gap-2">
                  {JEWELRY_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() => addToVision(type)}
                      className="px-3 py-1.5 text-sm bg-stone-800 border border-stone-600 rounded-full text-stone-300 hover:bg-stone-700 hover:border-stone-500 hover:text-stone-200 transition-all"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style */}
              <div>
                <h3 className="text-sm font-medium text-stone-200 mb-3 uppercase tracking-wider">
                  Style
                </h3>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map((style) => (
                    <button
                      key={style}
                      onClick={() => addToVision(style)}
                      className="px-3 py-1.5 text-sm bg-stone-800 border border-stone-600 rounded-full text-stone-300 hover:bg-stone-700 hover:border-stone-500 hover:text-stone-200 transition-all"
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div>
                <h3 className="text-sm font-medium text-stone-200 mb-3 uppercase tracking-wider">
                  Material
                </h3>
                <div className="flex flex-wrap gap-2">
                  {MATERIALS.map((material) => (
                    <button
                      key={material}
                      onClick={() => addToVision(material)}
                      className="px-3 py-1.5 text-sm bg-stone-800 border border-stone-600 rounded-full text-stone-300 hover:bg-stone-700 hover:border-stone-500 hover:text-stone-200 transition-all"
                    >
                      {material}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {!showTips && (
          <div className="text-center mb-6">
            <button
              onClick={() => setShowTips(true)}
              className="text-stone-400 hover:text-stone-300 text-sm underline"
            >
              Show design helpers and inspiration
            </button>
          </div>
        )}

        {/* Example Image - Show above input when example is selected */}
        {currentExample && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-stone-100 mb-4 text-center">
              {currentExample.title}
            </h3>
            <div className="max-w-md mx-auto">
              <div className="aspect-square relative rounded-lg overflow-hidden border border-stone-600">
                <img
                  src={currentExample.image}
                  alt={currentExample.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                  AI Generated
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Show example carousel when no example is selected */}
        {!currentExample && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-stone-100 mb-4 text-center">
              Get Inspired by Celebrity Styles
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
              {EXAMPLE_PROMPTS.map((example, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setVision(example.prompt);
                    setCurrentExample(example);
                    setShowTips(false);
                  }}
                  className="aspect-square relative rounded-lg overflow-hidden border border-stone-600 hover:border-stone-500 transition-all group"
                >
                  <img
                    src={example.image}
                    alt={example.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-xs font-medium truncate">{example.title}</p>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-1.5 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Select
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <div className="bg-stone-900 border border-stone-700 rounded-lg p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="vision" className="block text-lg font-medium text-stone-200 mb-4">
                {currentExample ? 'Customize this design or describe something new' : 'Describe your jewelry vision'}
              </label>
              <textarea
                id="vision"
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                placeholder="Start typing or click the tags above to build your description... For example: 'A vintage-inspired engagement ring with art deco elements, platinum setting with a 1.5 carat oval diamond and small sapphire accents in geometric patterns, inspired by Audrey Hepburn elegance'"
                className="w-full h-32 p-4 bg-stone-800 border border-stone-600 rounded-lg text-stone-100 placeholder-stone-500 focus:border-stone-400 focus:outline-none resize-none"
                rows={6}
              />
              <div className="flex justify-between items-center mt-2">
                <span className={`text-sm ${vision.length >= 20 ? 'text-stone-400' : 'text-stone-500'}`}>
                  {vision.length}/20 characters minimum
                </span>
                {vision.length >= 100 && (
                  <span className="text-sm text-stone-400">
                    Great detail! 👍
                  </span>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-red-900/20 border border-red-700 rounded-lg p-4">
                <p className="text-red-400">{error}</p>
              </div>
            )}

            {/* Order This Button - Show when example is selected */}
            {currentExample && (
              <Button className="w-full bg-black hover:bg-gray-900 text-white font-semibold h-12 text-lg mb-3">
                Order This Design ($2,500+)
              </Button>
            )}

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !vision.trim() || vision.length < 20}
              className="w-full bg-stone-100 text-stone-900 hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed h-12 text-lg"
            >
              {isGenerating ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-stone-900"></div>
                  <span>Generating design...</span>
                </div>
              ) : (
                currentExample ? 'Generate Custom Version' : 'Generate Jewelry Design'
              )}
            </Button>

            {/* Clear Selection Button */}
            {currentExample && (
              <Button 
                variant="outline" 
                className="w-full border-stone-600 text-stone-300 hover:bg-stone-800 mt-3"
                onClick={() => {
                  setCurrentExample(null);
                  setVision('');
                }}
              >
                Start Fresh Design
              </Button>
            )}
          </div>
        </div>

        {/* Generated Images */}
        {generatedImages.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-stone-100 text-center">
              Your Generated Design
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {generatedImages.map((image, index) => (
                <div key={index} className="bg-stone-900 border border-stone-700 rounded-lg overflow-hidden">
                  <div className="aspect-square relative">
                    <img
                      src={image.url}
                      alt={`Generated jewelry design ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-stone-200 mb-2 capitalize">
                      {image.type.replace('_', ' ')}
                    </h3>
                    <p className="text-sm text-stone-400">
                      {image.prompt.slice(0, 100)}...
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-8">
              <div className="bg-stone-900 border border-stone-700 rounded-lg p-6 max-w-2xl mx-auto">
                <h3 className="text-lg font-medium text-stone-200 mb-4">
                  Love this design?
                </h3>
                <p className="text-stone-400 mb-6">
                  Our master jewelers in NYC can bring this vision to life. Each piece is handcrafted 
                  to perfection with premium materials and attention to detail.
                </p>
                <div className="space-y-2">
                  <Button className="w-full bg-stone-100 text-stone-900 hover:bg-stone-200">
                    Request Custom Quote
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full bg-stone-900 border-stone-600 hover:bg-stone-800"
                    onClick={() => {
                      setGeneratedImages([]);
                      setVision('');
                    }}
                  >
                    Generate Another Design
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Example Prompts Slider */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-stone-200 mb-6 text-center">
            Celebrity & Subculture Inspired Examples
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXAMPLE_PROMPTS.map((example, index) => (
              <button
                key={index}
                onClick={() => setVision(example.prompt)}
                className="text-left bg-stone-800 border border-stone-600 rounded-lg hover:bg-stone-700 hover:border-stone-500 transition-all group overflow-hidden"
              >
                <div className="aspect-square relative bg-stone-700 overflow-hidden">
                  <img
                    src={example.image}
                    alt={example.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    AI Generated
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-medium text-stone-200 mb-2">{example.title}</h4>
                  <p className="text-stone-400 text-sm line-clamp-3">"{example.prompt}"</p>
                  <div className="mt-3 text-xs text-stone-500 group-hover:text-stone-400">
                    Click to use this prompt →
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-stone-400 text-sm">
              💡 Try combinations like "Madonna punk style" or "Grace Kelly elegance" for unique results
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
