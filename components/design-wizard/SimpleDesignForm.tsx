'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Star, HelpCircle, X, Calculator } from 'lucide-react';
import { calculateJewelryPrice, parseJewelrySpecs, type PricingBreakdown } from '@/lib/jewelry-pricing';

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
  const [showPromptTips, setShowPromptTips] = useState(false);
  const [pricingBreakdown, setPricingBreakdown] = useState<PricingBreakdown | null>(null);
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);

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

  // Evaluate prompt quality on a 1-5 scale
  const getPromptQuality = (text: string): number => {
    const length = text.trim().length;
    if (length < 20) return 0;
    if (length < 50) return 1;
    if (length < 100) return 2;
    
    let score = 2;
    
    // Check for specific jewelry elements
    const jewelryTypes = ['ring', 'necklace', 'bracelet', 'earring', 'pendant', 'brooch', 'chain', 'anklet'];
    const materials = ['gold', 'silver', 'platinum', 'diamond', 'pearl', 'ruby', 'emerald', 'sapphire', 'titanium', 'steel'];
    const styles = ['vintage', 'modern', 'art deco', 'classic', 'minimalist', 'bohemian', 'punk', 'romantic', 'gothic', 'elegant'];
    const descriptors = ['brilliant', 'sparkling', 'polished', 'matte', 'textured', 'smooth', 'carved', 'engraved'];
    
    if (jewelryTypes.some(type => text.toLowerCase().includes(type))) score += 0.5;
    if (materials.some(material => text.toLowerCase().includes(material))) score += 0.5;
    if (styles.some(style => text.toLowerCase().includes(style))) score += 0.5;
    if (descriptors.some(desc => text.toLowerCase().includes(desc))) score += 0.5;
    
    // Check for inspiration sources
    if (text.toLowerCase().includes('inspired by')) score += 0.5;
    
    return Math.min(5, Math.round(score));
  };

  const getQualityMessage = (quality: number): string => {
    switch (quality) {
      case 0: return 'Too short - Add more details';
      case 1: return 'Basic prompt - Needs improvement';
      case 2: return 'Good start - Add specifics';
      case 3: return 'Detailed prompt - Well done!';
      case 4: return 'Excellent prompt - Very detailed!';
      case 5: return 'Perfect prompt - AI ready!';
      default: return 'Keep typing...';
    }
  };

  const getPromptTips = (quality: number): string[] => {
    const allTips = [
      '💍 Specify jewelry type (ring, necklace, bracelet, earrings)',
      '✨ Include materials (gold, silver, platinum, diamonds)',
      '🎨 Add style inspiration (vintage, modern, art deco, minimalist)',
      '👑 Mention celebrity or era inspiration (Grace Kelly, 1920s, etc.)',
      '🔹 Describe gemstones (diamonds, pearls, sapphires, emeralds)',
      '🎯 Include finish details (polished, matte, brushed, textured)',
      '📏 Specify size or scale (delicate, chunky, statement piece)',
      '🎪 Add setting style (prong, bezel, pave, channel)',
      '🌟 Include emotional tone (elegant, edgy, romantic, bold)',
      '🏛️ Reference architectural elements (geometric, curved, angular)'
    ];
    
    if (quality < 3) {
      return allTips.slice(0, 6); // Show first 6 tips for lower quality
    } else {
      return allTips.slice(6); // Show advanced tips for higher quality
    }
  };

  const promptQuality = getPromptQuality(vision);

  // Calculate pricing when prompt changes and has sufficient quality
  useEffect(() => {
    if (vision.length >= 50 && promptQuality >= 2) {
      setIsCalculatingPrice(true);
      const specs = parseJewelrySpecs(vision);
      calculateJewelryPrice(specs)
        .then(pricing => {
          setPricingBreakdown(pricing);
          setIsCalculatingPrice(false);
        })
        .catch(error => {
          console.error('Pricing calculation error:', error);
          setIsCalculatingPrice(false);
        });
    } else {
      setPricingBreakdown(null);
    }
  }, [vision, promptQuality]);

  return (
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
          <div className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-lg p-6 mb-6">
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
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video relative rounded-lg overflow-hidden border border-stone-600 bg-stone-800">
                <img
                  src={currentExample.image}
                  alt={currentExample.title}
                  className="w-full h-full object-contain"
                />
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
        <div className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-lg p-8 mb-8">
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
                {vision.length >= 20 && (
                  <button
                    onClick={() => setShowPromptTips(true)}
                    className="flex items-center gap-2 text-sm text-stone-300 hover:text-stone-200 transition-colors group"
                  >
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= promptQuality
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'fill-stone-600 text-stone-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span>{getQualityMessage(promptQuality)}</span>
                    <HelpCircle className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
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
              <div className="space-y-3">
                {/* Dynamic Pricing Display */}
                {isCalculatingPrice ? (
                  <div className="bg-stone-800 border border-stone-600 rounded-lg p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-stone-300">
                      <Calculator className="w-4 h-4 animate-pulse" />
                      <span>Calculating price...</span>
                    </div>
                  </div>
                ) : pricingBreakdown ? (
                  <div className="bg-stone-800 border border-stone-600 rounded-lg p-4">
                    <div className="text-center mb-3">
                      <div className="text-2xl font-bold text-white">
                        ${pricingBreakdown.finalPrice.toLocaleString()}
                      </div>
                      <div className="text-sm text-stone-400">Estimated price</div>
                    </div>
                    
                    <details className="text-xs text-stone-400">
                      <summary className="cursor-pointer hover:text-stone-300 mb-2">
                        Price breakdown
                      </summary>
                      <div className="space-y-1 pl-4 border-l border-stone-600">
                        <div className="flex justify-between">
                          <span>Materials ({pricingBreakdown.breakdown.materialWeight}g)</span>
                          <span>${pricingBreakdown.materialCost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Labor ({pricingBreakdown.breakdown.laborHours}h)</span>
                          <span>${pricingBreakdown.laborCost}</span>
                        </div>
                        {pricingBreakdown.gemstoneCost > 0 && (
                          <div className="flex justify-between">
                            <span>Gemstones</span>
                            <span>${pricingBreakdown.gemstoneCost}</span>
                          </div>
                        )}
                        <div className="flex justify-between border-t border-stone-700 pt-1">
                          <span>Subtotal</span>
                          <span>${pricingBreakdown.subtotal}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Margin (60%)</span>
                          <span>${pricingBreakdown.margin}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-stone-200 border-t border-stone-700 pt-1">
                          <span>Final Price</span>
                          <span>${pricingBreakdown.finalPrice}</span>
                        </div>
                      </div>
                    </details>
                  </div>
                ) : (
                  <div className="bg-stone-800 border border-stone-600 rounded-lg p-4 text-center">
                    <div className="text-stone-400 text-sm">
                      Add more details to calculate price
                    </div>
                  </div>
                )}
                
                <Button 
                  onClick={() => {
                    if (currentExample && pricingBreakdown) {
                      // Store checkout data
                      localStorage.setItem('checkoutData', JSON.stringify({
                        designId: currentExample.title.toLowerCase().replace(/\s+/g, '-'),
                        customPrompt: vision,
                        pricingBreakdown: {
                          subtotal: pricingBreakdown.finalPrice,
                          discount: 0,
                          commission: 0,
                          total: pricingBreakdown.finalPrice
                        },
                        images: [{ url: currentExample.image }]
                      }));
                      window.location.href = '/checkout';
                    }
                  }}
                  className="w-full bg-black hover:bg-gray-900 text-white font-semibold h-12 text-lg"
                >
                  Order This Design (${pricingBreakdown?.finalPrice.toLocaleString() || '2,500+'})
                </Button>
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
                currentExample ? 'Generate Custom Version' : 'Generate Jewelry Design'
              )}
            </Button>

            {/* Clear Selection Button */}
            {currentExample && (
              <Button 
                variant="outline" 
                className="w-full border-stone-600 text-stone-300 hover:bg-stone-800"
                onClick={() => {
                  setCurrentExample(null);
                  setVision('');
                  setPricingBreakdown(null);
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
                <div key={index} className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-lg overflow-hidden">
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
              <div className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-lg p-6 max-w-2xl mx-auto">
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

        {/* Prompt Tips Modal */}
        {showPromptTips && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b border-stone-700">
                <h3 className="text-xl font-semibold text-stone-100">
                  Improve Your Prompt (Quality: {promptQuality}/5)
                </h3>
                <button
                  onClick={() => setShowPromptTips(false)}
                  className="p-2 hover:bg-stone-800 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-stone-400" />
                </button>
              </div>
              
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                <p className="text-stone-300 mb-4">
                  Here are expert tips to improve your jewelry description:
                </p>
                
                <div className="space-y-3">
                  {getPromptTips(promptQuality).map((tip, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-stone-800 rounded-lg">
                      <span className="text-stone-400 font-mono text-sm">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-stone-200 text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-stone-800 rounded-lg">
                  <h4 className="font-medium text-stone-200 mb-2">💡 Pro Tip:</h4>
                  <p className="text-stone-300 text-sm">
                    The more specific you are, the more accurate our AI pricing becomes. 
                    Include materials, size, style, and any gemstones for the best results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
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
