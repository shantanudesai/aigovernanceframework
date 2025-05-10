import React from 'react';
import { StepIndicatorProps } from './types';
import { CheckIcon } from '@heroicons/react/24/solid';

export default function StepIndicator({ steps, currentStepIndex }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <li key={step.id} className="md:flex-1">
              <div className={`
                group flex flex-col border-l-4 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4
                ${isCompleted ? 'border-sky-600' : isCurrent ? 'border-sky-400' : 'border-gray-200'}
              `}>
                <span className={`
                  text-sm font-medium
                  ${isCompleted ? 'text-sky-600' : isCurrent ? 'text-sky-400' : 'text-gray-500'}
                `}>
                  Step {index + 1}
                </span>
                <span className="text-sm font-medium">
                  {step.title}
                </span>
                {step.description && (
                  <span className="text-sm text-gray-500">
                    {step.description}
                  </span>
                )}
                {isCompleted && (
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 md:top-4 md:translate-y-0">
                    <CheckIcon className="h-5 w-5 text-sky-600" />
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
} 