import React from 'react';
import { QuestionStepProps } from './types';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@headlessui/react';

const QUESTIONS = {
  prohibited: {
    title: 'Does your AI system perform any prohibited functions?',
    options: [
      {
        id: 'subliminal',
        label: 'Use subliminal techniques to materially distort behavior',
        tooltip: 'E.g., manipulative voice-activated toys influencing children\'s choices',
      },
      {
        id: 'vulnerability',
        label: 'Exploit vulnerabilities of specific groups',
        tooltip: 'E.g., deceptive financial ads targeting elderly users',
      },
      {
        id: 'social-scoring',
        label: 'Conduct social scoring based on behavior or characteristics',
        tooltip: 'E.g., scoring job applicants based on social media activity',
      },
      {
        id: 'biometric',
        label: 'Use real-time remote biometric identification in public spaces',
        tooltip: 'E.g., facial recognition in public squares without legal exemptions',
      },
    ],
  },
  safety: {
    title: 'Is your AI system a safety component of a product regulated under EU harmonization legislation?',
    tooltip: 'E.g., AI controlling diagnostic functions in medical devices, safety systems in autonomous vehicles',
  },
  'annex-iii': {
    title: 'Does your AI system perform any of these high-risk functions?',
    options: [
      {
        id: 'biometrics',
        label: 'Biometric identification or categorization',
        tooltip: 'E.g., AI for facial recognition in access control systems',
      },
      {
        id: 'infrastructure',
        label: 'Management of critical infrastructure',
        tooltip: 'E.g., AI controlling traffic flow or grid stability',
      },
      {
        id: 'education',
        label: 'Education and vocational training',
        tooltip: 'E.g., AI ranking university applicants or grading exams',
      },
      {
        id: 'employment',
        label: 'Employment and worker management',
        tooltip: 'E.g., AI screening resumes or monitoring performance',
      },
      {
        id: 'services',
        label: 'Access to essential services',
        tooltip: 'E.g., AI assessing loan applications or welfare eligibility',
      },
      {
        id: 'law-enforcement',
        label: 'Law enforcement',
        tooltip: 'E.g., AI predicting crime hotspots or analyzing evidence',
      },
      {
        id: 'migration',
        label: 'Migration and border control',
        tooltip: 'E.g., AI processing visa applications or border surveillance',
      },
      {
        id: 'justice',
        label: 'Administration of justice',
        tooltip: 'E.g., AI assisting in legal sentencing or voter eligibility',
      },
    ],
  },
  'human-interaction': {
    title: 'Does your AI system interact directly with humans in a way that requires transparency?',
    tooltip: 'E.g., chatbots providing customer service, virtual assistants, emotion recognition systems',
  },
  'content-generation': {
    title: 'Does your AI system generate or manipulate content that could be mistaken for human-generated?',
    tooltip: 'E.g., deep fakes creating realistic videos, AI-generated news articles, or text-to-image models',
  },
};

export default function QuestionStep({ step, onAnswer, value }: QuestionStepProps) {
  const question = QUESTIONS[step.id as keyof typeof QUESTIONS];

  if (!question) return null;

  const renderTooltip = (tooltip: string) => (
    <Tooltip>
      <Tooltip.Button className="ml-2 text-gray-400 hover:text-gray-500">
        <InformationCircleIcon className="h-5 w-5" />
      </Tooltip.Button>
      <Tooltip.Panel className="absolute z-10 w-72 px-4 mt-3 transform -translate-x-1/2 left-1/2">
        <div className="bg-black text-white text-sm rounded-lg shadow-lg p-2">
          {tooltip}
        </div>
      </Tooltip.Panel>
    </Tooltip>
  );

  if ('options' in question) {
    return (
      <div className="space-y-6">
        <div className="flex items-center">
          <h2 className="text-xl font-medium text-gray-900">{question.title}</h2>
          {renderTooltip(question.options[0].tooltip)}
        </div>
        <div className="space-y-4">
          {question.options.map((option) => (
            <div key={option.id} className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id={option.id}
                  type="checkbox"
                  checked={value?.includes(option.id)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...(value || []), option.id]
                      : (value || []).filter((id: string) => id !== option.id);
                    onAnswer(newValue);
                  }}
                  className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor={option.id} className="font-medium text-gray-700">
                  {option.label}
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <h2 className="text-xl font-medium text-gray-900">{question.title}</h2>
        {renderTooltip(question.tooltip)}
      </div>
      <div className="space-x-4">
        <button
          onClick={() => onAnswer(true)}
          className={`btn-secondary ${value === true ? 'ring-2 ring-sky-500' : ''}`}
        >
          Yes
        </button>
        <button
          onClick={() => onAnswer(false)}
          className={`btn-secondary ${value === false ? 'ring-2 ring-sky-500' : ''}`}
        >
          No
        </button>
      </div>
    </div>
  );
} 