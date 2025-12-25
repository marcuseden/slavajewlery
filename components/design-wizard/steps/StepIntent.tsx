'use client';

import { Button } from '@/components/ui/button';
import { DesignData } from '../DesignWizard';

interface StepIntentProps {
  data: DesignData;
  updateData: (updates: Partial<DesignData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const INTENTS = [
  { id: 'engagement', label: 'Engagement Ring', description: 'For proposals and engagements' },
  { id: 'wedding', label: 'Wedding Band', description: 'Matching wedding rings' },
  { id: 'anniversary', label: 'Anniversary Gift', description: 'Celebrating milestones' },
  { id: 'birthday', label: 'Birthday Gift', description: 'Special birthday present' },
  { id: 'personal', label: 'Personal Treat', description: 'For yourself' },
  { id: 'other', label: 'Other Occasion', description: 'Something else special' },
];

const CATEGORIES = [
  { id: 'ring', label: 'Ring', description: 'Engagement, wedding, cocktail rings' },
  { id: 'necklace', label: 'Necklace', description: 'Pendants, chains, statement pieces' },
  { id: 'earrings', label: 'Earrings', description: 'Studs, hoops, drops' },
  { id: 'bracelet', label: 'Bracelet', description: 'Tennis, charm, cuff bracelets' },
  { id: 'pendant', label: 'Pendant', description: 'Standalone pendant charms' },
];

export function StepIntent({ data, updateData, onNext }: StepIntentProps) {
  const canProceed = data.intent && data.category;

  return (
    <div className="space-y-8">
      {/* Intent Selection */}
      <div>
        <h2 className="text-xl font-semibold text-stone-100 mb-4">
          What is this piece for?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {INTENTS.map((intent) => (
            <button
              key={intent.id}
              onClick={() => updateData({ intent: intent.id })}
              className={`
                p-4 rounded-lg border-2 text-left transition-all
                ${data.intent === intent.id
                  ? 'border-stone-300 bg-stone-800 text-stone-100'
                  : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-600 hover:bg-stone-800'
                }
              `}
            >
              <div className="font-medium">{intent.label}</div>
              <div className="text-sm text-stone-400 mt-1">{intent.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Category Selection */}
      <div>
        <h2 className="text-xl font-semibold text-stone-100 mb-4">
          What type of jewelry?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => updateData({ category: category.id })}
              className={`
                p-4 rounded-lg border-2 text-left transition-all
                ${data.category === category.id
                  ? 'border-stone-300 bg-stone-800 text-stone-100'
                  : 'border-stone-700 bg-stone-900 text-stone-300 hover:border-stone-600 hover:bg-stone-800'
                }
              `}
            >
              <div className="font-medium">{category.label}</div>
              <div className="text-sm text-stone-400 mt-1">{category.description}</div>
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
          Continue to Metal & Style
        </Button>
      </div>
    </div>
  );
}




