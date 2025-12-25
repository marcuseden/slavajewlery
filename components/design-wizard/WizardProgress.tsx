'use client';

interface WizardProgressProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export function WizardProgress({ currentStep, totalSteps, steps }: WizardProgressProps) {
  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          
          return (
            <div key={stepNumber} className="flex items-center">
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium
                ${isActive 
                  ? 'bg-stone-100 text-stone-900' 
                  : isCompleted 
                    ? 'bg-stone-700 text-stone-300'
                    : 'bg-stone-800 text-stone-500'
                }
              `}>
                {stepNumber}
              </div>
              
              {stepNumber < totalSteps && (
                <div className={`
                  w-12 h-0.5 ml-2
                  ${stepNumber < currentStep ? 'bg-stone-600' : 'bg-stone-800'}
                `} />
              )}
            </div>
          );
        })}
      </div>

      {/* Current Step Title */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-stone-100 mb-2">
          {steps[currentStep - 1]}
        </h1>
        <p className="text-stone-400">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
}




