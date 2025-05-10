import React from 'react';
import { SummaryProps } from './types';
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

type RiskColor = 'red' | 'yellow' | 'blue' | 'green';

interface RiskAssessment {
  level: string;
  icon: typeof CheckCircleIcon;
  color: RiskColor;
  description: string;
}

const getRiskLevel = (riskLevel: string): RiskAssessment => {
  switch (riskLevel) {
    case 'unacceptable':
      return {
        level: 'Unacceptable Risk',
        icon: XCircleIcon,
        color: 'red',
        description: 'Your AI system includes prohibited functions under the EU AI Act.',
      };
    case 'high':
      return {
        level: 'High Risk',
        icon: ExclamationTriangleIcon,
        color: 'yellow',
        description: 'Your AI system is classified as high-risk under the EU AI Act.',
      };
    case 'limited':
      return {
        level: 'Limited Risk',
        icon: ExclamationTriangleIcon,
        color: 'blue',
        description: 'Your AI system has transparency obligations under the EU AI Act.',
      };
    default:
      return {
        level: 'Minimal Risk',
        icon: CheckCircleIcon,
        color: 'green',
        description: 'Your AI system is classified as minimal risk under the EU AI Act.',
      };
  }
};

export default function Summary({ answers, result, isLoading }: SummaryProps) {
  const colorClasses: Record<RiskColor, string> = {
    red: 'bg-red-50 text-red-700 ring-red-600/20',
    yellow: 'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
    blue: 'bg-sky-50 text-sky-700 ring-sky-600/20',
    green: 'bg-green-50 text-green-700 ring-green-600/20',
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600" />
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const assessment = getRiskLevel(result.riskLevel);

  return (
    <div className="space-y-8">
      {/* Risk Level Indicator */}
      <div className={`rounded-md p-4 ring-1 ring-inset ${colorClasses[assessment.color]}`}>
        <div className="flex">
          <div className="flex-shrink-0">
            <assessment.icon className="h-5 w-5" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium">{assessment.level}</h3>
            <div className="mt-2 text-sm">
              <p>{assessment.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Immediate Actions (if any) */}
      {result.recommendations.immediate.length > 0 && (
        <div>
          <h3 className="text-lg font-medium leading-6 text-red-700 mb-4">
            Immediate Actions Required
          </h3>
          <div className="bg-red-50 shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-red-200">
              {result.recommendations.immediate.map((action, index) => (
                <li key={index} className="px-4 py-4">
                  <p className="text-sm font-medium text-red-900">{action}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Recommendations by Category */}
      {(result.recommendations.governance.length > 0 ||
        result.recommendations.technical.length > 0 ||
        result.recommendations.documentation.length > 0) && (
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Recommended Actions
          </h3>
          <div className="space-y-6">
            {/* Governance */}
            {result.recommendations.governance.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Governance & Policy</h4>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul role="list" className="divide-y divide-gray-200">
                    {result.recommendations.governance.map((rec, index) => (
                      <li key={index} className="px-4 py-4">
                        <p className="text-sm text-gray-900">{rec}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Technical */}
            {result.recommendations.technical.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Technical Implementation</h4>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul role="list" className="divide-y divide-gray-200">
                    {result.recommendations.technical.map((rec, index) => (
                      <li key={index} className="px-4 py-4">
                        <p className="text-sm text-gray-900">{rec}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Documentation */}
            {result.recommendations.documentation.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Documentation & Evidence</h4>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul role="list" className="divide-y divide-gray-200">
                    {result.recommendations.documentation.map((rec, index) => (
                      <li key={index} className="px-4 py-4">
                        <p className="text-sm text-gray-900">{rec}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Applicable Controls */}
      {result.applicableControls.length > 0 && (
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Framework Controls to Implement
          </h3>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul role="list" className="divide-y divide-gray-200">
              {result.applicableControls.map((controlCode) => (
                <li key={controlCode}>
                  <Link
                    href={`/domain/${controlCode.split('-')[0].toLowerCase()}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-4 py-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-sky-600">{controlCode}</span>
                      <ArrowRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8">
        <a
          href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 hover:text-sky-500"
        >
          Learn more about the EU AI Act →
        </a>
      </div>
    </div>
  );
} 