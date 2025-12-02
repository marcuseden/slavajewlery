'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Tag cloud data
const JEWELRY_TYPES = [
  'engagement ring', 'wedding band', 'necklace', 'earrings', 'bracelet', 
  'pendant', 'cocktail ring', 'tennis bracelet', 'statement earrings', 
  'charm bracelet', 'choker', 'cuff bracelet', 'stud earrings', 'chain necklace'
];

const STYLES = [
  'vintage', 'modern', 'minimalist', 'art deco', 'victorian', 'bohemian',
  'classic', 'contemporary', 'bold', 'delicate', 'geometric', 'organic',
  'industrial', 'romantic', 'edgy', 'sophisticated', 'timeless', 'trendy'
];

const MATERIALS = [
  'platinum', '14k gold', '18k gold', 'white gold', 'yellow gold', 'rose gold',
  'sterling silver', 'titanium', 'palladium', 'two-tone gold', 'brushed metal',
  'polished finish', 'matte finish', 'hammered texture'
];

const CELEBRITY_INSPIRATIONS = [
  'Audrey Hepburn elegance', 'Grace Kelly sophistication', 'Elizabeth Taylor glamour',
  'Coco Chanel minimalism', 'Diana Spencer timeless', 'Kate Middleton classic',
  'Meghan Markle modern', 'Blake Lively bohemian', 'Emma Stone vintage',
  'Rihanna bold', 'Taylor Swift romantic', 'Zendaya edgy'
];

const DECADE_STYLES = [
  '1920s art deco', '1930s Hollywood glamour', '1940s wartime elegance',
  '1950s feminine curves', '1960s mod geometric', '1970s bohemian freedom',
  '1980s bold statements', '1990s minimalist chic', '2000s maximalist',
  '2010s vintage revival', '2020s sustainable luxury'
];

interface GeneratedImage {
  url: string;
  type: string;
  prompt: string;
}

export function SimpleDesignForm() {
  const [vision, setVision] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState('');
  const [showTips, setShowTips] = useState(true);

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
    <div className="min-h-screen bg-stone-950">
      {/* Header */}
      <header className="border-b border-stone-800 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-semibold text-stone-100 hover:text-stone-300 transition-colors">
                Slava Jewelry Studio
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-stone-400 text-sm">
                AI Design Generator
              </div>
              <Link 
                href="/"
                className="text-stone-400 hover:text-stone-300 text-sm transition-colors"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-stone-100 mb-4">
            Design Your Dream Jewelry
          </h1>
          <p className="text-xl text-stone-400 mb-8">
            Describe your vision and watch AI bring it to life with photorealistic images
          </p>
        </div>

        {/* Tag Clouds and Tips */}
        {showTips && (
          <div className="bg-stone-900 border border-stone-700 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-stone-100">
                Build Your Description
              </h2>
              <button
                onClick={() => setShowTips(false)}
                className="text-stone-400 hover:text-stone-300 text-sm"
              >
                Hide ×
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Tag Clouds */}
              <div className="space-y-6">
                {/* Jewelry Types */}
                <div>
                  <h3 className="text-sm font-medium text-stone-200 mb-3 uppercase tracking-wider">
                    Jewelry Type
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

                {/* Styles */}
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

                {/* Materials */}
                <div>
                  <h3 className="text-sm font-medium text-stone-200 mb-3 uppercase tracking-wider">
                    Materials
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

              {/* Right Column - Inspiration */}
              <div className="space-y-6">
                {/* Celebrity Inspirations */}
                <div>
                  <h3 className="text-sm font-medium text-stone-200 mb-3 uppercase tracking-wider">
                    Celebrity Style
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {CELEBRITY_INSPIRATIONS.map((celeb) => (
                      <button
                        key={celeb}
                        onClick={() => addToVision(`inspired by ${celeb}`)}
                        className="px-3 py-1.5 text-sm bg-stone-800 border border-stone-600 rounded-full text-stone-300 hover:bg-stone-700 hover:border-stone-500 hover:text-stone-200 transition-all"
                      >
                        {celeb}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Decade Styles */}
                <div>
                  <h3 className="text-sm font-medium text-stone-200 mb-3 uppercase tracking-wider">
                    Era & Decade
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {DECADE_STYLES.map((decade) => (
                      <button
                        key={decade}
                        onClick={() => addToVision(decade)}
                        className="px-3 py-1.5 text-sm bg-stone-800 border border-stone-600 rounded-full text-stone-300 hover:bg-stone-700 hover:border-stone-500 hover:text-stone-200 transition-all"
                      >
                        {decade}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompting Tips */}
                <div>
                  <h3 className="text-sm font-medium text-stone-200 mb-3 uppercase tracking-wider">
                    Pro Tips
                  </h3>
                  <div className="space-y-2 text-sm text-stone-400">
                    <p>💡 <strong>Be specific</strong> about stone shapes, sizes, and settings</p>
                    <p>🎨 <strong>Mention textures</strong> like "milgrain details" or "hammered finish"</p>
                    <p>✨ <strong>Add context</strong> like "for everyday wear" or "statement piece"</p>
                    <p>🏛️ <strong>Reference eras</strong> like "Art Deco geometry" or "Victorian romance"</p>
                    <p>👑 <strong>Celebrity style</strong> helps define overall aesthetic and elegance</p>
                  </div>
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

        {/* Input Form */}
        <div className="bg-stone-900 border border-stone-700 rounded-lg p-8 mb-8">
          <div className="space-y-6">
            <div>
              <label htmlFor="vision" className="block text-lg font-medium text-stone-200 mb-4">
                Describe your jewelry vision
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
                'Generate Jewelry Design'
              )}
            </Button>
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

        {/* Enhanced Examples */}
        <div className="mt-16">
          <h3 className="text-xl font-semibold text-stone-200 mb-6 text-center">
            Example Prompts with Style Inspirations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                text: "A vintage art deco engagement ring with platinum setting, oval diamond center stone, and small sapphire accents in geometric patterns, inspired by 1920s art deco elegance",
                tags: ["vintage", "art deco", "1920s"]
              },
              {
                text: "A minimalist modern necklace with delicate chain and simple geometric pendant in 14k yellow gold, inspired by Coco Chanel minimalism",
                tags: ["minimalist", "modern", "Coco Chanel"]
              },
              {
                text: "A bold statement cocktail ring featuring large emerald-cut emerald surrounded by diamonds in white gold, inspired by Elizabeth Taylor glamour",
                tags: ["bold", "statement", "Elizabeth Taylor"]
              },
              {
                text: "A classic tennis bracelet with brilliant round diamonds in continuous line, platinum setting, inspired by Grace Kelly sophistication",
                tags: ["classic", "tennis bracelet", "Grace Kelly"]
              }
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setVision(example.text)}
                className="text-left p-4 bg-stone-800 border border-stone-600 rounded-lg hover:bg-stone-700 transition-all group"
              >
                <p className="text-stone-300 text-sm italic mb-2">"{example.text}"</p>
                <div className="flex flex-wrap gap-1">
                  {example.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-stone-700 text-stone-400 text-xs rounded-full group-hover:bg-stone-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
