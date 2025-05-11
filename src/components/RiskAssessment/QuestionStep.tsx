'use client';

import React from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Question } from './types';

interface QuestionStepProps {
  title: string;
  questions: Question[];
  answers: boolean[];
  onAnswerChange: (index: number, value: boolean) => void;
  onClearAll: () => void;
}

export default function QuestionStep({
  title,
  questions,
  answers,
  onAnswerChange,
  onClearAll,
}: QuestionStepProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">{title}</h2>
        <button
          onClick={onClearAll}
          className="text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {questions.map((question, index) => (
          <div key={index} className="relative bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-start sm:items-center gap-2 flex-1">
                <span className="text-base sm:text-lg text-gray-900 flex-1 pr-4">{question.text}</span>
                {question.tooltip && (
                  <div className="flex-shrink-0 relative group">
                    <InformationCircleIcon className="h-5 w-5 text-gray-400" />
                    <div className="hidden group-hover:block absolute z-10 w-72 -left-1/2 transform -translate-x-1/4 bottom-full mb-2 px-4 py-2 bg-gray-900 rounded-lg">
                      <p className="text-sm text-white">{question.tooltip}</p>
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end sm:justify-start items-center space-x-2 mt-2 sm:mt-0">
                <button
                  onClick={() => onAnswerChange(index, false)}
                  className={`px-6 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
                    !answers[index]
                      ? 'bg-sky-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  No
                </button>
                <button
                  onClick={() => onAnswerChange(index, true)}
                  className={`px-6 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 ${
                    answers[index]
                      ? 'bg-sky-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 