'use client';

import React, { useState } from 'react';
import { SummaryProps, Control } from './types';
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, ChevronDownIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface ControlDetailsProps {
  control: Control;
  isOpen: boolean;
  onToggle: () => void;
}

const getDomainCode = (domain: string): string => {
  const domainMap: { [key: string]: string } = {
    'Risk Management': 'rm',
    'Governance & Leadership': 'gl',
    'System, Data and Model Lifecycle': 'lc',
    'Security': 'se',
    'Safe Responsible AI': 'rs',
    'Privacy': 'pr',
    'Assurance and Audit': 'aa',
    'Third Party & Supply Chain': 'tp',
    'Transparency & Communication': 'co',
    'Incident Management': 'im',
    'Operational Monitoring': 'om',
    'Regulatory Operations': 'ro'
  };
  return domainMap[domain] || '';
};

const ControlDetails = ({ control, isOpen, onToggle }: ControlDetailsProps) => {
  return (
    <div className="border rounded-lg mb-4">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
      >
        <div className="flex items-center space-x-4">
          <span className="font-medium text-gray-900">{control.id}</span>
          <span className="text-gray-400">|</span>
          <span className="text-gray-600">{control.domain}</span>
        </div>
        <ChevronDownIcon
          className={`h-5 w-5 text-gray-400 transform transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 border-t">
          <div className="mt-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Description</h4>
              <p className="text-sm text-gray-600">{control.description}</p>
            </div>
            
            <div className="flex justify-end">
              <Link 
                href={`/domain/${getDomainCode(control.domain)}`}
                className="inline-flex items-center text-sm text-sky-600 hover:text-sky-700"
              >
                <span>View in Framework</span>
                <ArrowTopRightOnSquareIcon className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ControlSection = ({ 
  title, 
  subtitle,
  controls 
}: { 
  title: string; 
  subtitle: string;
  controls: Control[] 
}) => {
  const [openControlId, setOpenControlId] = useState<string | null>(null);

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      {subtitle && (
        <p className="text-sm text-gray-600 mb-4">{subtitle}</p>
      )}
      <div className="space-y-2">
        {controls.map((control) => (
          <ControlDetails
            key={control.id}
            control={control}
            isOpen={openControlId === control.id}
            onToggle={() => setOpenControlId(openControlId === control.id ? null : control.id)}
          />
        ))}
      </div>
    </div>
  );
};

const riskLevelConfig = {
  unacceptable: {
    icon: XCircleIcon,
    color: 'red',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200'
  },
  high: {
    icon: ExclamationTriangleIcon,
    color: 'orange',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    borderColor: 'border-orange-200'
  },
  limited: {
    icon: ExclamationTriangleIcon,
    color: 'yellow',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    borderColor: 'border-yellow-200'
  },
  minimal: {
    icon: CheckCircleIcon,
    color: 'green',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    borderColor: 'border-green-200'
  }
};

export default function Summary({ result, isLoading }: SummaryProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3">Analyzing your responses...</span>
      </div>
    );
  }

  if (!result) return null;

  const config = riskLevelConfig[result.level];
  const Icon = config.icon;

  return (
    <div className="space-y-8">
      <div className={`p-6 rounded-lg ${config.bgColor} ${config.borderColor} border`}>
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className={`h-6 w-6 text-${config.color}-600`} />
          </div>
          <div className="ml-3">
            <h3 className={`text-lg font-medium text-${config.color}-800`}>
              {result.level === 'unacceptable' ? 'Unacceptable Risk' :
               result.level === 'high' ? 'High Risk' :
               result.level === 'limited' ? 'Limited Risk' :
               'Minimal Risk'}
            </h3>
            <p className={`mt-2 text-${config.color}-700`}>
              {result.description}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">Requirements</h4>
          <ul className="space-y-3">
            {result.requirements.map((requirement, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-800">
                  {index + 1}
                </span>
                <span className="ml-3 text-gray-700">{requirement}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-medium text-gray-900 mb-4">Next Steps</h4>
          <ul className="space-y-3">
            {result.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-100 text-green-800">
                  {index + 1}
                </span>
                <span className="ml-3 text-gray-700">{step}</span>
              </li>
            ))}
          </ul>
        </div>

        {(result.mandatoryControls.length > 0 || 
          result.recommendedControls.length > 0 || 
          (result.tailoredRecommendations && result.tailoredRecommendations.length > 0)) && (
          <div className="mt-8">
            <h4 className="text-lg font-medium text-gray-900 mb-6">Controls Mapping</h4>
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-8">
              {result.mandatoryControls.length > 0 && (
                <ControlSection 
                  title="Mandatory Controls" 
                  subtitle="Controls required by the EU AI Act based on your system's risk level"
                  controls={result.mandatoryControls} 
                />
              )}
              
              {result.recommendedControls.length > 0 && (
                <ControlSection 
                  title="Recommended Controls" 
                  subtitle="Additional controls recommended for your type of AI system"
                  controls={result.recommendedControls} 
                />
              )}
              
              {result.tailoredRecommendations && result.tailoredRecommendations.length > 0 && (
                <ControlSection 
                  title="Tailored Recommendations" 
                  subtitle="Specific controls based on your system's characteristics"
                  controls={result.tailoredRecommendations} 
                />
              )}
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Important Note</h4>
          <p className="text-sm text-gray-600">
            This assessment is a preliminary evaluation based on the EU AI Act. For a complete compliance assessment, 
            please consult with legal experts and maintain detailed documentation of your AI system's development, 
            deployment, and monitoring processes.
          </p>
        </div>
      </div>
    </div>
  );
} 