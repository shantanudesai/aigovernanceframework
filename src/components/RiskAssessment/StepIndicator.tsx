'use client';

import React from 'react';
import { StepIndicatorProps } from './types';
import { CheckIcon } from '@heroicons/react/24/solid';

export default function StepIndicator({ steps, currentStepIndex }: StepIndicatorProps) {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <li key={step.id} className="relative">
              <div className={`
                group relative flex items-start p-4 rounded-lg border
                ${isCompleted ? 'bg-blue-50 border-blue-200' : 
                  isCurrent ? 'bg-white border-blue-500 shadow-sm' : 
                  'bg-white border-gray-200'}
              `}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <span className={`
                      flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full mr-3
                      ${isCompleted ? 'bg-blue-500' : 
                        isCurrent ? 'bg-blue-500' : 
                        'bg-gray-200'}
                    `}>
                      {isCompleted ? (
                        <CheckIcon className="w-5 h-5 text-white" />
                      ) : (
                        <span className={`text-sm font-medium ${isCurrent ? 'text-white' : 'text-gray-500'}`}>
                          {index + 1}
                        </span>
                      )}
                    </span>
                    <span className={`
                      text-sm font-medium
                      ${isCompleted ? 'text-blue-600' : 
                        isCurrent ? 'text-blue-600' : 
                        'text-gray-500'}
                    `}>
                      {step.title}
                    </span>
                  </div>
                  {step.description && (
                    <p className={`
                      mt-2 text-sm
                      ${isCompleted || isCurrent ? 'text-blue-600' : 'text-gray-500'}
                    `}>
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
} 