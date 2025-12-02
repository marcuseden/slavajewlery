'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { DesignData } from '../DesignWizard';

interface StepVisionProps {
  data: DesignData;
  updateData: (updates: Partial<DesignData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const SUGGESTION_CHIPS = [
  'vintage inspired',
  'delicate and feminine',
  'bold statement piece',
  'minimalist design',
  'intricate details',
  'nature-inspired',
  'geometric patterns',
  'classic elegance',
  'modern twist',
  'romantic style',
  'art deco elements',
  'sustainable materials',
  'family heirloom quality',
  'everyday versatile',
  'special occasion',
];

export function StepVision({ data, updateData, onNext }: StepVisionProps) {
  const [vision, setVision] = useState(data.user_vision || '');
  
  const canProceed = vision.trim().length >= 50; // Minimum 50 characters

  const addSuggestion = (suggestion: string) => {
    const currentText = vision.trim();
    const separator = currentText.length > 0 ? (currentText.endsWith('.') ? ' ' : '. ') : '';
    const newVision = currentText + separator + suggestion;
    setVision(newVision);
    updateData({ user_vision: newVision });
  };

  const handleVisionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newVision = e.target.value;
    setVision(newVision);
    updateData({ user_vision: newVision });
  };

  return (
    <div className="space-y-8">
      {/* Vision Input */}
      <div>
        <h2 className="text-xl font-semibold text-stone-100 mb-4">
          Describe your vision
        </h2>
        <p className="text-stone-400 mb-6">
          Share your inspiration, style preferences, any specific details you envision. 
          This helps our AI create specifications that match your dream piece.
        </p>
        
        <textarea
          value={vision}
          onChange={handleVisionChange}
          placeholder="Describe the piece you're envisioning... Share details about style, inspiration, specific elements you love, or how you imagine wearing it. The more detail, the better we can bring your vision to life."
          className="w-full h-40 p-4 bg-stone-900 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:border-stone-500 focus:outline-none resize-none"
          rows={8}
        />
        
        <div className="flex justify-between items-center mt-2">
          <span className={`text-sm ${vision.length >= 50 ? 'text-stone-400' : 'text-stone-500'}`}>
            {vision.length}/50 characters minimum
          </span>
          {vision.length >= 200 && (
            <span className="text-sm text-stone-400">
              Great detail! 👍
            </span>
          )}
        </div>
      </div>

      {/* Suggestion Chips */}
      <div>
        <h3 className="text-lg font-medium text-stone-200 mb-4">
          Need inspiration? Click to add:
        </h3>
        <div className="flex flex-wrap gap-2">
          {SUGGESTION_CHIPS.map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => addSuggestion(suggestion)}
              className="px-3 py-2 text-sm bg-stone-800 border border-stone-600 rounded-full text-stone-300 hover:bg-stone-700 hover:border-stone-500 transition-all"
            >
              + {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Examples */}
      <div>
        <h3 className="text-lg font-medium text-stone-200 mb-4">
          Examples of great descriptions:
        </h3>
        <div className="space-y-3">
          <div className="bg-stone-900 border border-stone-700 rounded-lg p-4">
            <p className="text-stone-300 text-sm italic">
              "I want a vintage-inspired engagement ring with art deco elements. 
              Something with geometric patterns and milgrain details. I love the elegance 
              of the 1920s era. I'd prefer a classic round diamond as the center stone 
              with smaller accent diamonds forming a halo or vintage-style setting."
            </p>
          </div>
          <div className="bg-stone-900 border border-stone-700 rounded-lg p-4">
            <p className="text-stone-300 text-sm italic">
              "I'm looking for a modern, minimalist necklace that I can wear every day. 
              Something delicate but substantial enough to stand on its own. I love clean 
              lines and geometric shapes. Maybe a small pendant with a simple chain that 
              sits just below the collarbone."
            </p>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end pt-6">
        <Button
          onClick={onNext}
          disabled={!canProceed}
          className="bg-stone-100 text-stone-900 hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue to Review
        </Button>
      </div>
    </div>
  );
}
