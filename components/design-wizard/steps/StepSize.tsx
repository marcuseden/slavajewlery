'use client';

import { Button } from '@/components/ui/button';
import { DesignData } from '../DesignWizard';

interface StepSizeProps {
  data: DesignData;
  updateData: (updates: Partial<DesignData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const RING_SIZES = [
  '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11'
];

const NECKLACE_LENGTHS = [
  { id: '16', label: '16"', description: 'Choker style, sits at base of neck' },
  { id: '18', label: '18"', description: 'Princess length, most popular' },
  { id: '20', label: '20"', description: 'Matinee length, below collarbone' },
  { id: '24', label: '24"', description: 'Opera length, at or below bust' },
  { id: '36', label: '36"', description: 'Rope length, can be doubled' },
];

const BRACELET_SIZES = [
  { id: '6.5', label: '6.5"', description: 'Petite wrist' },
  { id: '7', label: '7"', description: 'Small/Medium wrist' },
  { id: '7.5', label: '7.5"', description: 'Medium wrist (most common)' },
  { id: '8', label: '8"', description: 'Large wrist' },
  { id: '8.5', label: '8.5"', description: 'Extra large wrist' },
];

export function StepSize({ data, updateData, onNext }: StepSizeProps) {
  const currentSizeFit = data.size_fit || {};
  
  const isRing = data.category === 'ring';
  const isNecklace = data.category === 'necklace';
  const isBracelet = data.category === 'bracelet';
  const isEarrings = data.category === 'earrings';
  const isPendant = data.category === 'pendant';

  const canProceed = 
    (isRing && currentSizeFit.ring_size) ||
    (isNecklace && currentSizeFit.necklace_length) ||
    (isBracelet && currentSizeFit.bracelet_size) ||
    isEarrings || // No size needed for earrings
    isPendant; // No size needed for standalone pendant

  const updateSizeFit = (updates: any) => {
    updateData({ size_fit: { ...currentSizeFit, ...updates } });
  };

  return (
    <div className="space-y-8">
      {/* Ring Size */}
      {isRing && (
        <div>
          <h2 className="text-xl font-semibold text-stone-100 mb-4">
            Ring size
          </h2>
          <p className="text-stone-400 mb-6">
            Not sure? We can resize after crafting (within 2 sizes).
          </p>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {RING_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => updateSizeFit({ ring_size: parseFloat(size) })}
                className={`
                  p-3 rounded-lg border-2 text-center transition-all
                  ${currentSizeFit.ring_size === parseFloat(size)
                    ? 'border-stone-300 bg-stone-800 text-stone-100'
                    : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-600 hover:bg-stone-800'
                  }
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Necklace Length */}
      {isNecklace && (
        <div>
          <h2 className="text-xl font-semibold text-stone-100 mb-4">
            Necklace length
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {NECKLACE_LENGTHS.map((length) => (
              <button
                key={length.id}
                onClick={() => updateSizeFit({ necklace_length: length.id })}
                className={`
                  p-4 rounded-lg border-2 text-left transition-all
                  ${currentSizeFit.necklace_length === length.id
                    ? 'border-stone-300 bg-stone-800 text-stone-100'
                    : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-600 hover:bg-stone-800'
                  }
                `}
              >
                <div className="font-medium">{length.label}</div>
                <div className="text-sm text-stone-400 mt-1">{length.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Bracelet Size */}
      {isBracelet && (
        <div>
          <h2 className="text-xl font-semibold text-stone-100 mb-4">
            Bracelet size
          </h2>
          <p className="text-stone-400 mb-6">
            Measure around your wrist where you'd wear the bracelet.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BRACELET_SIZES.map((size) => (
              <button
                key={size.id}
                onClick={() => updateSizeFit({ bracelet_size: size.id })}
                className={`
                  p-4 rounded-lg border-2 text-left transition-all
                  ${currentSizeFit.bracelet_size === size.id
                    ? 'border-stone-300 bg-stone-800 text-stone-100'
                    : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-600 hover:bg-stone-800'
                  }
                `}
              >
                <div className="font-medium">{size.label}</div>
                <div className="text-sm text-stone-400 mt-1">{size.description}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Earrings - No size needed */}
      {isEarrings && (
        <div>
          <h2 className="text-xl font-semibold text-stone-100 mb-4">
            Earring specifications
          </h2>
          <div className="bg-stone-900 border border-stone-700 rounded-lg p-6">
            <p className="text-stone-300">
              Earrings will be crafted to standard proportions based on your design preferences. 
              Our master jewelers will ensure perfect balance and comfort for everyday wear.
            </p>
          </div>
        </div>
      )}

      {/* Pendant - No size needed */}
      {isPendant && (
        <div>
          <h2 className="text-xl font-semibold text-stone-100 mb-4">
            Pendant specifications  
          </h2>
          <div className="bg-stone-900 border border-stone-700 rounded-lg p-6">
            <p className="text-stone-300">
              Your pendant will be crafted to proportions that complement your chosen stones and metal. 
              A matching chain can be added separately if desired.
            </p>
          </div>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end pt-6">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-stone-100 text-stone-900 hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Your Vision
        </Button>
      </div>
    </div>
  );
}




