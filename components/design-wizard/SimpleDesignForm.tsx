'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Star, HelpCircle, X, Calculator, Sparkles } from 'lucide-react';
import { calculateJewelryPrice, parseJewelrySpecs, type PricingBreakdown } from '@/lib/jewelry-pricing';
import { SaveDesignButton } from '@/components/SaveDesignButton';
import { ShareButton } from '@/components/ShareButton';

// Enhanced tag system with design rules based on top-selling products
interface TagDefinition {
  label: string;
  prompt: string;
  description: string;
}

// Top 10 Best-Selling Jewelry Types (based on market data)
const JEWELRY_TYPES: TagDefinition[] = [
  { 
    label: 'engagement ring', 
    prompt: 'engagement ring with solitaire setting, timeless design, brilliant center diamond',
    description: '#1 seller - Classic solitaire style'
  },
  { 
    label: 'wedding band', 
    prompt: 'wedding band with comfort fit, elegant simplicity, polished or matte finish',
    description: '#2 seller - Timeless bands'
  },
  { 
    label: 'stud earrings', 
    prompt: 'classic stud earrings, secure screw-back setting, everyday elegance',
    description: '#3 seller - Daily essentials'
  },
  { 
    label: 'tennis bracelet', 
    prompt: 'tennis bracelet with continuous line of stones, secure clasp, luxury statement',
    description: '#4 seller - Luxury classic'
  },
  { 
    label: 'pendant necklace', 
    prompt: 'pendant necklace with delicate chain, meaningful centerpiece, adjustable length',
    description: '#5 seller - Personal style'
  },
  { 
    label: 'hoop earrings', 
    prompt: 'hoop earrings with smooth closure, versatile size, polished finish',
    description: '#6 seller - Versatile hoops'
  },
  { 
    label: 'eternity band', 
    prompt: 'eternity band with continuous stones, anniversary style, sparkle all around',
    description: '#7 seller - Anniversary favorite'
  },
  { 
    label: 'charm bracelet', 
    prompt: 'charm bracelet with personalized charms, storytelling jewelry, secure links',
    description: '#8 seller - Personal story'
  },
  { 
    label: 'cocktail ring', 
    prompt: 'cocktail ring with bold center stone, statement design, elegant proportions',
    description: '#9 seller - Statement piece'
  },
  { 
    label: 'chain necklace', 
    prompt: 'chain necklace with classic link style, layering friendly, adjustable length',
    description: '#10 seller - Layering essential'
  }
];

// Top 10 Best-Selling Jewelry Styles
const STYLES: TagDefinition[] = [
  { 
    label: 'classic', 
    prompt: 'classic timeless style, elegant proportions, clean lines, enduring beauty',
    description: '#1 - Never goes out of style'
  },
  { 
    label: 'minimalist', 
    prompt: 'minimalist modern design, simple elegance, refined details, understated luxury',
    description: '#2 - Modern simplicity'
  },
  { 
    label: 'vintage', 
    prompt: 'vintage-inspired design, romantic details, heirloom quality, nostalgic beauty',
    description: '#3 - Romantic heritage'
  },
  { 
    label: 'art deco', 
    prompt: 'art deco geometric style, 1920s glamour, symmetrical patterns, bold elegance',
    description: '#4 - Roaring twenties'
  },
  { 
    label: 'contemporary', 
    prompt: 'contemporary innovative design, current trends, fresh aesthetic, modern edge',
    description: '#5 - Today\'s trends'
  },
  { 
    label: 'romantic', 
    prompt: 'romantic flowing design, soft curves, feminine details, delicate beauty',
    description: '#6 - Soft & feminine'
  },
  { 
    label: 'bohemian', 
    prompt: 'bohemian free-spirit style, organic textures, artistic flair, unique character',
    description: '#7 - Artistic soul'
  },
  { 
    label: 'glamorous', 
    prompt: 'glamorous luxury design, maximum sparkle, red carpet worthy, showstopping beauty',
    description: '#8 - Red carpet ready'
  },
  { 
    label: 'geometric', 
    prompt: 'geometric modern style, clean angles, architectural lines, bold shapes',
    description: '#9 - Sharp & modern'
  },
  { 
    label: 'nature-inspired', 
    prompt: 'nature-inspired organic design, floral or leaf motifs, natural beauty, flowing forms',
    description: '#10 - Organic elegance'
  }
];

// Top 10 Best-Selling Materials
const MATERIALS: TagDefinition[] = [
  { 
    label: '14k gold', 
    prompt: '14k gold durable and practical, perfect balance of purity and strength, warm luster',
    description: '#1 - Most popular gold'
  },
  { 
    label: 'platinum', 
    prompt: 'platinum pure and precious, hypoallergenic luxury, naturally white, heirloom quality',
    description: '#2 - Ultimate luxury'
  },
  { 
    label: 'white gold', 
    prompt: 'white gold rhodium-plated, modern silvery tone, diamond\'s best friend, elegant finish',
    description: '#3 - Modern classic'
  },
  { 
    label: 'rose gold', 
    prompt: 'rose gold romantic copper tones, vintage-modern hybrid, trending favorite, warm blush',
    description: '#4 - Romantic trend'
  },
  { 
    label: '18k gold', 
    prompt: '18k gold high purity, rich color, luxury standard, vibrant yellow tone',
    description: '#5 - Luxury standard'
  },
  { 
    label: 'sterling silver', 
    prompt: 'sterling silver .925 pure, accessible luxury, bright shine, versatile base',
    description: '#6 - Accessible luxury'
  },
  { 
    label: 'two-tone', 
    prompt: 'two-tone mixed metals, yellow and white gold combination, dimensional interest, modern classic',
    description: '#7 - Best of both'
  },
  { 
    label: 'yellow gold', 
    prompt: 'yellow gold traditional warmth, classic beauty, timeless appeal, rich golden glow',
    description: '#8 - Traditional choice'
  },
  { 
    label: 'mixed metals', 
    prompt: 'mixed metals contemporary fusion, rose-white-yellow combination, modern aesthetic, versatile pairing',
    description: '#9 - Modern fusion'
  },
  { 
    label: 'polished finish', 
    prompt: 'polished mirror finish, maximum shine, reflective beauty, classic luster',
    description: '#10 - Mirror shine'
  }
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

// Smart prompt suggestions based on what's missing
interface PromptSuggestion {
  category: string;
  question: string;
  options: { label: string; addition: string }[];
}

function analyzePromptGaps(prompt: string): PromptSuggestion[] {
  const suggestions: PromptSuggestion[] = [];
  const lowerPrompt = prompt.toLowerCase();

  // Check for jewelry type
  const hasType = ['ring', 'necklace', 'bracelet', 'earring', 'pendant', 'band'].some(t => lowerPrompt.includes(t));
  if (!hasType) {
    suggestions.push({
      category: 'Type',
      question: 'What type of jewelry?',
      options: [
        { label: 'Engagement Ring', addition: 'engagement ring with solitaire setting' },
        { label: 'Necklace', addition: 'elegant necklace' },
        { label: 'Earrings', addition: 'stud earrings' },
        { label: 'Bracelet', addition: 'tennis bracelet' }
      ]
    });
  }

  // Check for metal/material
  const hasMetal = ['gold', 'platinum', 'silver', 'metal'].some(m => lowerPrompt.includes(m));
  if (!hasMetal) {
    suggestions.push({
      category: 'Material',
      question: 'What metal?',
      options: [
        { label: '14k Gold', addition: '14k gold' },
        { label: 'Platinum', addition: 'platinum' },
        { label: 'White Gold', addition: 'white gold' },
        { label: 'Rose Gold', addition: 'rose gold' }
      ]
    });
  }

  // Check for gemstones
  const hasGemstone = ['diamond', 'sapphire', 'ruby', 'emerald', 'pearl', 'stone'].some(g => lowerPrompt.includes(g));
  if (!hasGemstone && hasType) {
    suggestions.push({
      category: 'Gemstone',
      question: 'What stones?',
      options: [
        { label: 'Diamond', addition: 'with brilliant diamond center stone' },
        { label: 'Sapphire', addition: 'with deep blue sapphire' },
        { label: 'No Stones', addition: 'metal only band' },
        { label: 'Pearl', addition: 'with lustrous pearls' }
      ]
    });
  }

  // Check for size/scale
  const hasSize = ['delicate', 'bold', 'chunky', 'thin', 'thick', 'small', 'large', 'statement'].some(s => lowerPrompt.includes(s));
  if (!hasSize) {
    suggestions.push({
      category: 'Size',
      question: 'What size/scale?',
      options: [
        { label: 'Delicate', addition: 'delicate and refined' },
        { label: 'Statement', addition: 'bold statement piece' },
        { label: 'Medium', addition: 'balanced proportions' },
        { label: 'Chunky', addition: 'substantial and chunky' }
      ]
    });
  }

  // Check for style
  const hasStyle = ['vintage', 'modern', 'classic', 'minimalist', 'art deco', 'bohemian', 'romantic'].some(s => lowerPrompt.includes(s));
  if (!hasStyle) {
    suggestions.push({
      category: 'Style',
      question: 'What style?',
      options: [
        { label: 'Classic', addition: 'classic timeless style' },
        { label: 'Modern', addition: 'modern contemporary design' },
        { label: 'Vintage', addition: 'vintage-inspired elegance' },
        { label: 'Minimalist', addition: 'minimalist clean lines' }
      ]
    });
  }

  // Check for finish
  const hasFinish = ['polished', 'matte', 'brushed', 'satin', 'hammered'].some(f => lowerPrompt.includes(f));
  if (!hasFinish && hasMetal) {
    suggestions.push({
      category: 'Finish',
      question: 'What finish?',
      options: [
        { label: 'Polished', addition: 'polished mirror finish' },
        { label: 'Matte', addition: 'matte brushed texture' },
        { label: 'Mixed', addition: 'polished and matte combination' }
      ]
    });
  }

  // Check for setting style (if has gemstones)
  const hasSetting = ['prong', 'bezel', 'pave', 'channel', 'halo', 'setting'].some(s => lowerPrompt.includes(s));
  if (hasGemstone && !hasSetting) {
    suggestions.push({
      category: 'Setting',
      question: 'Stone setting style?',
      options: [
        { label: 'Prong', addition: 'classic prong setting' },
        { label: 'Halo', addition: 'surrounded by halo of diamonds' },
        { label: 'Bezel', addition: 'modern bezel setting' },
        { label: 'Pave', addition: 'pave-set accents' }
      ]
    });
  }

  return suggestions.slice(0, 3); // Show max 3 suggestions at a time
}

export function SimpleDesignForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [vision, setVision] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [generatedSpecs, setGeneratedSpecs] = useState<string>('');
  const [error, setError] = useState('');
  const [showTips, setShowTips] = useState(false); // Hidden by default
  const [currentExample, setCurrentExample] = useState<typeof EXAMPLE_PROMPTS[0] | null>(null);
  const [showPromptTips, setShowPromptTips] = useState(false);
  const [pricingBreakdown, setPricingBreakdown] = useState<PricingBreakdown | null>(null);
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);
  const [promptSuggestions, setPromptSuggestions] = useState<PromptSuggestion[]>([]);
  const [generationProgress, setGenerationProgress] = useState(0);

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

  // Update suggestions when prompt changes
  useEffect(() => {
    if (vision.length >= 10) {
      const suggestions = analyzePromptGaps(vision);
      setPromptSuggestions(suggestions);
    } else {
      setPromptSuggestions([]);
    }
  }, [vision]);

  const handleGenerate = async () => {
    if (!vision.trim() || vision.length < 20) {
      setError('Please provide a more detailed description (at least 20 characters)');
      return;
    }

    setIsGenerating(true);
    setError('');
    setGeneratedImages([]);
    setPromptSuggestions([]); // Hide suggestions during generation
    setGenerationProgress(0); // Reset progress

    let progressInterval: NodeJS.Timeout | null = null;
    
    try {
      // Simulate progress updates during generation (faster for 3 images)
      progressInterval = setInterval(() => {
        setGenerationProgress(prev => {
          // Gradually increase progress, but cap at 95% until actually complete
          if (prev < 95) {
            return prev + (Math.random() * 4) + 2; // Faster progress for 3 images
          }
          return prev;
        });
      }, 800); // Update more frequently

      // Set timeout for the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 180000); // 3 minute timeout for HD quality images

      const response = await fetch('/api/design/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
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
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      if (progressInterval) clearInterval(progressInterval);

      if (!response.ok) {
        if (response.status === 504 || response.status === 408) {
          throw new Error('Generation is taking longer than expected. We\'re working on complex details - please try again or simplify your description.');
        }
        const errorData = await response.json().catch(() => ({ error: 'Failed to generate design' }));
        throw new Error(errorData.error || 'Failed to generate design');
      }

      const result = await response.json();
      
      if (result.images && Array.isArray(result.images)) {
        setGenerationProgress(100); // Complete!
        setTimeout(() => {
          setGeneratedImages(result.images);
          setGeneratedSpecs(result.specifications || '');
        }, 500); // Small delay to show 100%
      } else {
        throw new Error('Invalid response format');
      }

    } catch (err) {
      console.error('Generation error:', err);
      if (progressInterval) clearInterval(progressInterval);
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Request timed out. The design is complex - try adding more specific details or simplifying your description.');
        } else {
          setError(err.message);
        }
      } else {
        setError('Failed to generate design. Please try again.');
      }
    } finally {
      setIsGenerating(false);
      setGenerationProgress(0);
    }
  };

  // Check if a tag's prompt text is in the current vision
  const isTagActive = (tagLabel: string, tagPrompt: string): boolean => {
    const lowerVision = vision.toLowerCase();
    const lowerPrompt = tagPrompt.toLowerCase();
    const lowerLabel = tagLabel.toLowerCase();
    
    // Check if either the full prompt or at least the key label is in the vision
    // This handles both full tag additions and partial matches
    return lowerVision.includes(lowerPrompt) || lowerVision.includes(lowerLabel);
  };

  // Toggle tag - add if not present, remove if present
  const toggleTag = (tagLabel: string, tagPrompt: string) => {
    const isActive = isTagActive(tagLabel, tagPrompt);
    
    if (isActive) {
      // Remove the tag from vision
      let newVision = vision;
      
      // Try to remove with various separators
      const variations = [
        `, ${tagPrompt}`,
        `${tagPrompt}, `,
        ` ${tagPrompt}`,
        tagPrompt
      ];
      
      for (const variant of variations) {
        if (newVision.includes(variant)) {
          newVision = newVision.replace(variant, '');
          break;
        }
      }
      
      // Clean up multiple spaces and trailing/leading commas/spaces
      newVision = newVision
        .replace(/\s+/g, ' ')
        .replace(/,\s*,/g, ',')
        .replace(/^[,\s]+/, '')
        .replace(/[,\s]+$/, '')
        .trim();
      
      setVision(newVision);
    } else {
      // Add the tag to vision
    const currentText = vision.trim();
      const separator = currentText.length > 0 ? ', ' : '';
      const newVision = currentText + separator + tagPrompt;
      setVision(newVision);
    }
  };

  const addToVision = (text: string, isEnhancedTag: boolean = false) => {
    const currentText = vision.trim();
    
    if (isEnhancedTag) {
      // For enhanced tags with full prompt guidance
      const separator = currentText.length > 0 ? ' ' : '';
      const newVision = currentText + separator + text;
      setVision(newVision);
    } else {
      // For simple text additions
    const separator = currentText.length > 0 ? (currentText.endsWith('.') || currentText.endsWith(',') ? ' ' : ', ') : '';
    const newVision = currentText + separator + text;
    setVision(newVision);
    }
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
      case 5: return 'Perfect prompt - Ready to generate!';
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
            Describe your vision and watch it come to life with photorealistic images
          </p>
        </div>

        {/* Collapsed Tag Section - Hidden by Default */}
        {!showTips && (
          <div className="text-center mb-6">
            <button
              onClick={() => setShowTips(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-stone-800/50 hover:bg-stone-700/50 border border-stone-600 hover:border-stone-500 rounded-lg text-stone-300 hover:text-stone-200 text-sm transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Show design helper tags (Top sellers)
            </button>
          </div>
        )}

        {/* Enhanced Tag Clouds with Best-Seller Guidance */}
        {showTips && (
          <div className="bg-black/30 backdrop-blur-md border border-gray-700/50 rounded-lg p-6 mb-6 relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div>
              <h2 className="text-xl font-semibold text-stone-100">
                  Top-Selling Design Tags
              </h2>
                <p className="text-xs text-stone-400 mt-1">
                  Click any tag to add expert design guidance to your prompt
                </p>
              </div>
              <button
                onClick={() => setShowTips(false)}
                className="text-stone-400 hover:text-stone-300 text-sm px-3 py-1 hover:bg-stone-800 rounded transition-all"
              >
                Hide ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Type - Top 10 Best Sellers */}
              <div>
                <h3 className="text-sm font-medium text-stone-200 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <span>Type</span>
                  <span className="text-[10px] text-stone-500 normal-case">(Top 10 sellers)</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {JEWELRY_TYPES.map((type, index) => {
                    const isActive = isTagActive(type.label, type.prompt);
                    return (
                    <button
                        key={type.label}
                        onClick={() => toggleTag(type.label, type.prompt)}
                        title={isActive ? 'Click to remove' : type.description}
                        className={`group relative px-3 py-1.5 text-sm rounded-full transition-all cursor-pointer active:scale-95 ${
                          isActive 
                            ? 'bg-blue-600 border-2 border-blue-400 text-white shadow-lg shadow-blue-900/50' 
                            : 'bg-stone-800 border border-stone-600 text-stone-300 hover:bg-stone-700 hover:border-stone-500 hover:text-stone-200'
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <span className={`text-[10px] ${isActive ? 'text-blue-200' : 'text-stone-500'}`}>
                            {isActive ? '✓' : `#${index + 1}`}
                          </span>
                          {type.label}
                        </span>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                          {isActive ? 'Click to remove' : type.description}
                        </div>
                    </button>
                    );
                  })}
                </div>
              </div>

              {/* Style - Top 10 Best Sellers */}
              <div>
                <h3 className="text-sm font-medium text-stone-200 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <span>Style</span>
                  <span className="text-[10px] text-stone-500 normal-case">(Top 10 sellers)</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {STYLES.map((style, index) => {
                    const isActive = isTagActive(style.label, style.prompt);
                    return (
                    <button
                        key={style.label}
                        onClick={() => toggleTag(style.label, style.prompt)}
                        title={isActive ? 'Click to remove' : style.description}
                        className={`group relative px-3 py-1.5 text-sm rounded-full transition-all cursor-pointer active:scale-95 ${
                          isActive 
                            ? 'bg-purple-600 border-2 border-purple-400 text-white shadow-lg shadow-purple-900/50' 
                            : 'bg-stone-800 border border-stone-600 text-stone-300 hover:bg-stone-700 hover:border-stone-500 hover:text-stone-200'
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <span className={`text-[10px] ${isActive ? 'text-purple-200' : 'text-stone-500'}`}>
                            {isActive ? '✓' : `#${index + 1}`}
                          </span>
                          {style.label}
                        </span>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                          {isActive ? 'Click to remove' : style.description}
                        </div>
                    </button>
                    );
                  })}
                </div>
              </div>

              {/* Material - Top 10 Best Sellers */}
              <div>
                <h3 className="text-sm font-medium text-stone-200 mb-3 uppercase tracking-wider flex items-center gap-2">
                  <span>Material</span>
                  <span className="text-[10px] text-stone-500 normal-case">(Top 10 sellers)</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {MATERIALS.map((material, index) => {
                    const isActive = isTagActive(material.label, material.prompt);
                    return (
                      <button
                        key={material.label}
                        onClick={() => toggleTag(material.label, material.prompt)}
                        title={isActive ? 'Click to remove' : material.description}
                        className={`group relative px-3 py-1.5 text-sm rounded-full transition-all cursor-pointer active:scale-95 ${
                          isActive 
                            ? 'bg-amber-600 border-2 border-amber-400 text-white shadow-lg shadow-amber-900/50' 
                            : 'bg-stone-800 border border-stone-600 text-stone-300 hover:bg-stone-700 hover:border-stone-500 hover:text-stone-200'
                        }`}
                      >
                        <span className="flex items-center gap-1">
                          <span className={`text-[10px] ${isActive ? 'text-amber-200' : 'text-stone-500'}`}>
                            {isActive ? '✓' : `#${index + 1}`}
                          </span>
                          {material.label}
                        </span>
                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                          {isActive ? 'Click to remove' : material.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Info box */}
            <div className="mt-6 p-4 bg-stone-800/50 border border-stone-700 rounded-lg">
              <p className="text-xs text-stone-300">
                💡 <strong>Pro tip:</strong> These tags are based on our top-selling jewelry categories. Each tag adds expert design guidance to help you create the perfect piece. Click to add, click again to remove.
              </p>
            </div>
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
              <div className="flex justify-between items-center mt-3">
                {/* Character Counter */}
                <div className="flex items-center gap-2">
                  <div className="relative w-10 h-10">
                    <svg className="w-10 h-10 transform -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="stroke-stone-700"
                        strokeWidth="2"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className={vision.length >= 20 ? 'stroke-green-500' : 'stroke-yellow-500'}
                        strokeWidth="2"
                        strokeDasharray={`${Math.min(100, (vision.length / 20) * 100)} 100`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-[10px] font-bold ${vision.length >= 20 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {Math.min(100, Math.round((vision.length / 20) * 100))}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs font-semibold ${vision.length >= 20 ? 'text-green-400' : 'text-yellow-400'}`}>
                      {vision.length}/20 minimum
                    </div>
                    <div className="text-[10px] text-stone-500">
                      {vision.length < 20 ? `${20 - vision.length} more needed` : 'Ready to generate'}
                    </div>
                  </div>
                </div>

                {/* Quality Indicator */}
                {vision.length >= 20 && (
                  <button
                    onClick={() => setShowPromptTips(true)}
                    className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-yellow-900/20 to-amber-900/20 hover:from-yellow-900/30 hover:to-amber-900/30 border border-yellow-700/30 rounded-lg transition-all group"
                  >
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 transition-all ${
                            star <= promptQuality
                              ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_3px_rgba(250,204,21,0.5)]'
                              : 'fill-stone-700 text-stone-700'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-yellow-200">
                        {getQualityMessage(promptQuality)}
                      </div>
                      <div className="text-[10px] text-yellow-400/70 flex items-center gap-1">
                        <HelpCircle className="w-3 h-3" />
                        Click for tips
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Smart Prompt Suggestions */}
            {promptSuggestions.length > 0 && !isGenerating && (
              <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-700/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <HelpCircle className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-blue-200 mb-3">
                      Complete your design with these details:
                    </h4>
                    <div className="space-y-3">
                      {promptSuggestions.map((suggestion, idx) => (
                        <div key={idx}>
                          <p className="text-xs text-blue-300 mb-2">{suggestion.question}</p>
                          <div className="flex flex-wrap gap-2">
                            {suggestion.options.map((option, optIdx) => (
                              <button
                                key={optIdx}
                                onClick={() => {
                                  const currentText = vision.trim();
                                  const separator = currentText.length > 0 ? ', ' : '';
                                  setVision(currentText + separator + option.addition);
                                }}
                                className="px-3 py-1.5 text-xs bg-blue-800/30 hover:bg-blue-700/40 border border-blue-600/40 hover:border-blue-500/60 rounded-lg text-blue-200 hover:text-blue-100 transition-all cursor-pointer active:scale-95"
                              >
                                + {option.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

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
              className="w-full bg-stone-100 text-stone-900 hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed h-16 text-lg relative overflow-hidden group"
            >
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center w-full space-y-3 py-2">
                  {/* Animated Icon and Text */}
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="absolute inset-0 animate-ping">
                        <Sparkles className="w-5 h-5 text-stone-600 opacity-40" />
                      </div>
                      <Sparkles className="w-5 h-5 text-stone-900 animate-pulse" />
                    </div>
                    <span className="font-semibold text-base">Crafting your masterpiece...</span>
                  </div>
                  
                  {/* Enhanced Progress Bar */}
                  <div className="w-full px-4">
                    <div className="relative w-full bg-stone-300 rounded-full h-2.5 overflow-hidden shadow-inner">
                      {/* Shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]" 
                        style={{
                          backgroundSize: '200% 100%',
                          animation: 'shimmer 2s infinite'
                        }}
                      />
                      {/* Progress fill */}
                      <div 
                        className="relative h-full bg-gradient-to-r from-stone-700 via-stone-800 to-stone-900 transition-all duration-500 ease-out shadow-lg"
                        style={{ width: `${generationProgress}%` }}
                      >
                        {/* Glowing edge */}
                        <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/60 blur-sm" />
                      </div>
                    </div>
                    
                    {/* Progress percentage with better styling */}
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs font-medium text-stone-700">
                        {Math.round(generationProgress) < 30 && '✨ Analyzing design...'}
                        {Math.round(generationProgress) >= 30 && Math.round(generationProgress) < 70 && '🎨 Creating imagery...'}
                        {Math.round(generationProgress) >= 70 && '💎 Perfecting details...'}
                      </span>
                      <span className="text-xs font-bold text-stone-900 bg-stone-200 px-2 py-0.5 rounded-full">
                        {Math.round(generationProgress)}%
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    {currentExample ? 'Generate Custom Version' : 'Generate Jewelry Design'}
                  </span>
                  {/* Hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-200 to-stone-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                </>
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
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {generatedImages.map((image, index) => {
                const viewDescriptions: Record<string, string> = {
                  hero_angle: 'Dramatic Studio View - Showcasing depth and dimension',
                  packshot_front: 'Clean Product View - Perfect for detailed inspection'
                };
                const viewName = image.type.replace('_', ' ').split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
                
                return (
                  <div key={index} className="group bg-gradient-to-br from-stone-900/50 to-black/50 backdrop-blur-md border border-stone-700/50 hover:border-stone-600 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-stone-900/50">
                    <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-stone-800 to-stone-900">
                      <img
                        src={image.url}
                        alt={`${viewName} of your custom jewelry design`}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Elegant overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-5 bg-gradient-to-br from-stone-900/80 to-black/80">
                      <h3 className="font-semibold text-stone-100 mb-1.5 text-base">
                        {viewName}
                      </h3>
                      <p className="text-xs text-stone-400 leading-relaxed">
                        {viewDescriptions[image.type] || 'Professional jewelry photography'}
                      </p>
                    </div>
                  </div>
                );
              })}
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
                <div className="space-y-3">
                  {/* Save and Share Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <SaveDesignButton
                      design={{
                        title: 'Custom Design',
                        prompt: vision,
                        images: generatedImages,
                        specifications: generatedSpecs,
                        jewelry_type: 'custom'
                      }}
                      onSaveSuccess={() => {
                        // Optional: show success message
                      }}
                      onLoginRequired={() => {
                        router.push('/?signup=true');
                      }}
                      variant="button"
                      className="w-full"
                    />
                    <ShareButton
                      title="My Custom Jewelry Design"
                      description={vision}
                      imageUrl={generatedImages[0]?.url}
                      designUrl={typeof window !== 'undefined' ? window.location.href : ''}
                    >
                      <Button 
                        variant="outline" 
                        className="w-full bg-stone-900 border-stone-600 hover:bg-stone-800"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Share
                      </Button>
                    </ShareButton>
                  </div>

                  <Button className="w-full bg-stone-100 text-stone-900 hover:bg-stone-200">
                    Request Custom Quote
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full bg-stone-900 border-stone-600 hover:bg-stone-800"
                    onClick={() => {
                      setGeneratedImages([]);
                      setGeneratedSpecs('');
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
                    The more specific you are, the more accurate your pricing becomes. 
                    Include materials, size, style, and any gemstones for the best results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
