'use client';

import { Button } from '@/components/ui/button';
import { DesignData } from '../DesignWizard';

interface StepReviewProps {
  data: DesignData;
  updateData: (updates: Partial<DesignData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

export function StepReview({ data }: StepReviewProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-stone-100 mb-4">
          Review Your Design
        </h2>
        <div className="bg-stone-900 border border-stone-700 rounded-lg p-6">
          <p className="text-stone-300">
            Review component will be implemented here.
          </p>
        </div>
      </div>
    </div>
  );
}
