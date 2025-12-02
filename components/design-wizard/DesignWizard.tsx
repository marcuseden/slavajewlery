'use client';

import { useState } from 'react';
import { WizardHeader } from './WizardHeader';
import { WizardProgress } from './WizardProgress';
import { StepIntent } from './steps/StepIntent';
import { StepMetal } from './steps/StepMetal';
import { StepStones } from './steps/StepStones';
import { StepSize } from './steps/StepSize';
import { StepVision } from './steps/StepVision';
import { StepReview } from './steps/StepReview';
import { Button } from '@/components/ui/button';

export interface DesignData {
  intent: string;
  category: string;
  metal: string;
  karat: string;
  style_tags: string[];
  price_band: string;
  stone_config: {
    center_stone?: {
      type: string;
      shape: string;
      carat: number;
    };
    accent_stones?: {
      type: string;
      count: number;
      size: string;
    }[];
  };
  size_fit: {
    ring_size?: number;
    necklace_length?: string;
    bracelet_size?: string;
  };
  user_vision: string;
}

const STEPS = [
  { id: 1, title: 'Intent & Type', component: StepIntent },
  { id: 2, title: 'Metal & Style', component: StepMetal },
  { id: 3, title: 'Stones & Details', component: StepStones },
  { id: 4, title: 'Size & Fit', component: StepSize },
  { id: 5, title: 'Your Vision', component: StepVision },
  { id: 6, title: 'Review & Generate', component: StepReview },
];

export function DesignWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [designData, setDesignData] = useState<DesignData>({
    intent: '',
    category: '',
    metal: '',
    karat: '',
    style_tags: [],
    price_band: '',
    stone_config: {},
    size_fit: {},
    user_vision: '',
  });

  const updateDesignData = (updates: Partial<DesignData>) => {
    setDesignData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const CurrentStepComponent = STEPS[currentStep - 1].component;

  return (
    <div className="min-h-screen bg-stone-950">
      <WizardHeader />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <WizardProgress 
          currentStep={currentStep} 
          totalSteps={STEPS.length}
          steps={STEPS.map(step => step.title)}
        />
        
        <div className="mt-8 mb-8">
          <CurrentStepComponent 
            data={designData}
            updateData={updateDesignData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-8 border-t border-stone-800">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="bg-stone-900 border-stone-700 hover:bg-stone-800"
          >
            Previous
          </Button>

          <div className="text-stone-400 text-sm">
            Step {currentStep} of {STEPS.length}
          </div>

          <Button
            onClick={nextStep}
            disabled={currentStep === STEPS.length}
            className="bg-stone-100 text-stone-900 hover:bg-stone-200"
          >
            {currentStep === STEPS.length ? 'Generate Design' : 'Continue'}
          </Button>
        </div>
      </div>
    </div>
  );
}
