'use client';

import React from 'react';
import { QuestionStepProps, Question } from './types';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

export default function QuestionStep({ step, questions, value, onAnswer }: QuestionStepProps & { questions: Question[] }) {
  const handleToggle = (index: number) => {
    const newValue = [...value];
    newValue[index] = !newValue[index];
    onAnswer(newValue);
  };

  const handleClearAll = () => {
    onAnswer(Array(value.length).fill(false));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">{step.title}</h2>
          <p className="text-gray-600">{step.description}</p>
        </div>
        <button
          onClick={handleClearAll}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={question.id} className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
            <div className="p-6">
              <div className="flex items-start justify-between gap-x-8">
                <div className="flex-1">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <label className="text-base font-medium text-gray-900">
                        {question.label}
                      </label>
                    </div>
                    {question.tooltip && (
                      <div className="ml-2 relative group">
                        <InformationCircleIcon className="h-5 w-5 text-gray-400 hover:text-gray-500" />
                        <div className="hidden group-hover:block absolute z-50 w-72 p-3 bg-gray-900 text-white text-sm rounded-lg -right-2 transform translate-x-full">
                          {question.tooltip}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className={`
                      relative inline-flex items-center px-4 py-2 rounded-l-md border text-sm font-medium
                      focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${!value[index]
                        ? 'bg-blue-50 border-blue-200 text-blue-600 z-10 ring-2 ring-blue-500'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    No
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggle(index)}
                    className={`
                      relative inline-flex items-center px-4 py-2 rounded-r-md border text-sm font-medium
                      focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500
                      ${value[index]
                        ? 'bg-blue-600 border-blue-600 text-white z-10'
                        : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 