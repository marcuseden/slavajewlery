'use client';

import { Button } from '@/components/ui/button';
import { DesignData } from '../DesignWizard';

interface StepStonesProps {
  data: DesignData;
  updateData: (updates: Partial<DesignData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const STONE_TYPES = [
  { id: 'diamond', label: 'Diamond', description: 'Classic, brilliant, timeless' },
  { id: 'sapphire', label: 'Sapphire', description: 'Elegant, colorful, durable' },
  { id: 'emerald', label: 'Emerald', description: 'Rich green, luxurious' },
  { id: 'ruby', label: 'Ruby', description: 'Passionate red, rare' },
  { id: 'pearl', label: 'Pearl', description: 'Sophisticated, organic' },
  { id: 'other', label: 'Other Gemstone', description: 'Tanzanite, opal, etc.' },
];

const DIAMOND_SHAPES = [
  'Round', 'Princess', 'Oval', 'Marquise', 'Pear', 'Cushion', 'Emerald', 'Radiant'
];

const CARAT_RANGES = [
  { id: '0.5-1', label: '0.5 - 1.0 carat', description: 'Delicate, affordable' },
  { id: '1-1.5', label: '1.0 - 1.5 carat', description: 'Popular, balanced' },
  { id: '1.5-2', label: '1.5 - 2.0 carat', description: 'Statement, impressive' },
  { id: '2+', label: '2.0+ carat', description: 'Luxury, show-stopping' },
];

export function StepStones({ data, updateData, onNext }: StepStonesProps) {
  const currentStoneConfig = data.stone_config || {};
  const centerStone = currentStoneConfig.center_stone;
  
  const canProceed = centerStone?.type && centerStone?.shape && centerStone?.carat;

  const updateCenterStone = (updates: any) => {
    updateData({
      stone_config: {
        ...currentStoneConfig,
        center_stone: { ...centerStone, ...updates }
      }
    });
  };

  const isRingCategory = data.category === 'ring';

  return (
    <div className="space-y-8">
      {/* Center Stone Type */}
      <div>
        <h2 className="text-xl font-semibold text-stone-100 mb-4">
          {isRingCategory ? 'Center stone' : 'Main stone'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STONE_TYPES.map((stone) => (
            <button
              key={stone.id}
              onClick={() => updateCenterStone({ type: stone.id })}
              className={`
                p-4 rounded-lg border-2 text-left transition-all
                ${centerStone?.type === stone.id
                  ? 'border-stone-300 bg-stone-800 text-stone-100'
                  : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-600 hover:bg-stone-800'
                }
              `}
            >
              <div className="font-medium">{stone.label}</div>
              <div className="text-sm text-stone-400 mt-1">{stone.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Diamond Shape Selection */}
      {centerStone?.type === 'diamond' && (
        <div>
          <h2 className="text-xl font-semibold text-stone-100 mb-4">
            Diamond shape
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DIAMOND_SHAPES.map((shape) => (
              <button
                key={shape}
                onClick={() => updateCenterStone({ shape: shape.toLowerCase() })}
                className={`
                  p-3 rounded-lg border-2 text-center transition-all
                  ${centerStone?.shape === shape.toLowerCase()
                    ? 'border-stone-300 bg-stone-800 text-stone-100'
                    : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-600 hover:bg-stone-800'
                  }
                `}
              >
                {shape}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Other Stone Shape */}
      {centerStone?.type && centerStone.type !== 'diamond' && (
        <div>
          <h2 className="text-xl font-semibold text-stone-100 mb-4">
            {centerStone.type} shape/cut
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Round', 'Oval', 'Cushion', 'Emerald', 'Pear', 'Other'].map((shape) => (
              <button
                key={shape}
                onClick={() => updateCenterStone({ shape: shape.toLowerCase() })}
                className={`
                  p-3 rounded-lg border-2 text-center transition-all
                  ${centerStone?.shape === shape.toLowerCase()
                    ? 'border-stone-300 bg-stone-800 text-stone-100'
                    : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-600 hover:bg-stone-800'
                  }
                `}
              >
                {shape}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Carat Size */}
      {centerStone?.type && centerStone?.shape && (
        <div>
          <h2 className="text-xl font-semibold text-stone-100 mb-4">
            Size preference
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CARAT_RANGES.map((range) => (
              <button
                key={range.id}
                onClick={() => {
                  const caratValue = range.id === '0.5-1' ? 0.75 : 
                                   range.id === '1-1.5' ? 1.25 : 
                                   range.id === '1.5-2' ? 1.75 : 2.5;
                  updateCenterStone({ carat: caratValue });
                }}
                className={`
                  p-4 rounded-lg border-2 text-left transition-all
                  ${(centerStone?.carat && (
                    (range.id === '0.5-1' && centerStone.carat < 1) ||
                    (range.id === '1-1.5' && centerStone.carat >= 1 && centerStone.carat < 1.5) ||
                    (range.id === '1.5-2' && centerStone.carat >= 1.5 && centerStone.carat < 2) ||
                    (range.id === '2+' && centerStone.carat >= 2)
                  )) 
                    ? 'border-stone-300 bg-stone-800 text-stone-100'
                    : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-600 hover:bg-stone-800'
                  }
                `}
              >
                <div className="font-medium">{range.label}</div>
                <div className="text-sm text-stone-400 mt-1">{range.description}</div>
              </button>
            ))}
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
          Continue to Size & Fit
        </Button>
      </div>
    </div>
  );
}
