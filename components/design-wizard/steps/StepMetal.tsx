'use client';

import { Button } from '@/components/ui/button';
import { DesignData } from '../DesignWizard';

interface StepMetalProps {
  data: DesignData;
  updateData: (updates: Partial<DesignData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const METALS = [
  { id: 'platinum', label: 'Platinum', description: 'Pure, durable, hypoallergenic', karat: '950' },
  { id: 'white_gold', label: 'White Gold', description: 'Classic, versatile, affordable', karat: '14k' },
  { id: 'yellow_gold', label: 'Yellow Gold', description: 'Traditional, warm, timeless', karat: '14k' },
  { id: 'rose_gold', label: 'Rose Gold', description: 'Romantic, trendy, unique', karat: '14k' },
];

const KARATS = [
  { id: '10k', label: '10K', description: 'Most affordable, durable' },
  { id: '14k', label: '14K', description: 'Best balance of quality and price' },
  { id: '18k', label: '18K', description: 'Premium quality, richer color' },
  { id: '950', label: '950', description: 'For platinum (95% pure)' },
];

const STYLES = [
  'Classic', 'Vintage', 'Modern', 'Art Deco', 'Victorian', 'Minimalist',
  'Bold', 'Romantic', 'Geometric', 'Organic', 'Industrial', 'Bohemian'
];

const PRICE_BANDS = [
  { id: '1000-2000', label: '$1,000 - $2,000', description: 'Elegant, quality pieces' },
  { id: '2000-3000', label: '$2,000 - $3,000', description: 'Premium craftsmanship' },
  { id: '3000-4000', label: '$3,000 - $4,000', description: 'Luxury, exceptional stones' },
  { id: '4000+', label: '$4,000+', description: 'Masterpiece, rare materials' },
];

export function StepMetal({ data, updateData, onNext }: StepMetalProps) {
  const canProceed = data.metal && data.karat && data.style_tags.length > 0 && data.price_band;

  const toggleStyle = (style: string) => {
    const currentStyles = data.style_tags || [];
    if (currentStyles.includes(style)) {
      updateData({ style_tags: currentStyles.filter(s => s !== style) });
    } else {
      updateData({ style_tags: [...currentStyles, style] });
    }
  };

  return (
    <div className="space-y-8">
      {/* Metal Selection */}
      <div>
        <h2 className="text-xl font-semibold text-stone-100 mb-4">
          Choose your metal
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {METALS.map((metal) => (
            <button
              key={metal.id}
              onClick={() => updateData({ metal: metal.id, karat: metal.karat })}
              className={`
                p-4 rounded-lg border-2 text-left transition-all
                ${data.metal === metal.id
                  ? 'border-stone-300 bg-stone-800 text-stone-100'
                  : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-600 hover:bg-stone-800'
                }
              `}
            >
              <div className="font-medium">{metal.label}</div>
              <div className="text-sm text-stone-400 mt-1">{metal.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Karat Selection */}
      {data.metal && data.metal !== 'platinum' && (
        <div>
          <h2 className="text-xl font-semibold text-stone-100 mb-4">
            Select karat (purity)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {KARATS.filter(k => k.id !== '950').map((karat) => (
              <button
                key={karat.id}
                onClick={() => updateData({ karat: karat.id })}
                className={`
                  p-3 rounded-lg border-2 text-left transition-all
                  ${data.karat === karat.id
                    ? 'border-stone-300 bg-stone-800 text-stone-100'
                    : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-600 hover:bg-stone-800'
                  }
                `}
              >
                <div className="font-medium">{karat.label}</div>
                <div className="text-sm text-stone-400 mt-1">{karat.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Style Tags */}
      <div>
        <h2 className="text-xl font-semibold text-stone-100 mb-4">
          Style preferences (select multiple)
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {STYLES.map((style) => (
            <button
              key={style}
              onClick={() => toggleStyle(style)}
              className={`
                p-3 rounded-lg border-2 text-center transition-all
                ${data.style_tags?.includes(style)
                  ? 'border-stone-300 bg-stone-800 text-stone-100'
                  : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-600 hover:bg-stone-800'
                }
              `}
            >
              {style}
            </button>
          ))}
        </div>
        {data.style_tags && data.style_tags.length > 0 && (
          <p className="text-stone-400 text-sm mt-2">
            Selected: {data.style_tags.join(', ')}
          </p>
        )}
      </div>

      {/* Price Band */}
      <div>
        <h2 className="text-xl font-semibold text-stone-100 mb-4">
          Investment level
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRICE_BANDS.map((band) => (
            <button
              key={band.id}
              onClick={() => updateData({ price_band: band.id })}
              className={`
                p-4 rounded-lg border-2 text-left transition-all
                ${data.price_band === band.id
                  ? 'border-stone-300 bg-stone-800 text-stone-100'
                  : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-600 hover:bg-stone-800'
                }
              `}
            >
              <div className="font-medium">{band.label}</div>
              <div className="text-sm text-stone-400 mt-1">{band.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end pt-6">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-stone-100 text-stone-900 hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Stones & Details
        </Button>
      </div>
    </div>
  );
}
