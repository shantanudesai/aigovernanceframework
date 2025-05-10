'use client';

import { useState } from 'react';
import { RiskAssessmentResponse, RiskAssessmentResult } from '@/types/risk-assessment';

const QUESTIONS = [
  {
    id: 'subliminal_manipulation',
    question: 'Does the AI system use subliminal manipulation or exploit vulnerabilities?',
    category: 'Prohibited Practices'
  },
  {
    id: 'fundamental_rights',
    question: 'Could the system impact fundamental rights (e.g., privacy, non-discrimination)?',
    category: 'Rights Impact'
  },
  {
    id: 'safety_critical',
    question: 'Is the system used in safety-critical applications?',
    category: 'Safety'
  },
  {
    id: 'law_enforcement',
    question: 'Is the system used in law enforcement or judicial decisions?',
    category: 'Law Enforcement'
  },
  {
    id: 'public_services',
    question: 'Is the system used to provide essential public services?',
    category: 'Public Services'
  },
  {
    id: 'education_employment',
    question: 'Is the system used in education or employment decisions?',
    category: 'Social Impact'
  }
];

export default function RiskAssessmentQuestionnaire() {
  const [responses, setResponses] = useState<RiskAssessmentResponse[]>([]);
  const [result, setResult] = useState<RiskAssessmentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getResponse = (questionId: string) => {
    return responses.find(r => r.questionId === questionId)?.response;
  };

  const handleResponseChange = (questionId: string, value: boolean) => {
    setResponses(prev => {
      const existing = prev.find(r => r.questionId === questionId);
      if (existing) {
        return prev.map(r => r.questionId === questionId ? { ...r, response: value } : r);
      }
      return [...prev, { questionId, response: value }];
    });
  };

  const handleSubmit = async () => {
    if (responses.length !== QUESTIONS.length) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/risk-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responses })
      });

      if (!response.ok) {
        throw new Error('Failed to process risk assessment');
      }

      const result = await response.json();
      setResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while processing your assessment');
      console.error('Risk assessment error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">AI Risk Assessment Questionnaire</h1>
      
      <div className="space-y-6">
        {QUESTIONS.map(q => {
          const response = getResponse(q.id);
          return (
            <div key={q.id} className="border rounded-lg p-4 bg-white shadow-sm">
              <p className="text-sm text-gray-500 mb-2">{q.category}</p>
              <p className="mb-4 text-gray-900">{q.question}</p>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleResponseChange(q.id, true)}
                  className={`flex-1 px-4 py-2 rounded-md transition-colors duration-200 ${
                    response === true
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => handleResponseChange(q.id, false)}
                  className={`flex-1 px-4 py-2 rounded-md transition-colors duration-200 ${
                    response === false
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          );
        })}

        <button
          onClick={handleSubmit}
          disabled={isLoading || responses.length !== QUESTIONS.length}
          className={`w-full py-3 px-4 rounded-lg transition-colors duration-200 ${
            isLoading || responses.length !== QUESTIONS.length
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isLoading ? 'Processing...' : 'Submit Assessment'}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 border rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Assessment Results</h2>
            <div className="space-y-4">
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="font-medium">Risk Level:</p>
                <p className={`text-lg ${
                  result.riskLevel === 'unacceptable' ? 'text-red-600' :
                  result.riskLevel === 'high' ? 'text-orange-600' :
                  result.riskLevel === 'limited' ? 'text-yellow-600' :
                  'text-green-600'
                }`}>
                  {result.riskLevel.charAt(0).toUpperCase() + result.riskLevel.slice(1)}
                </p>
              </div>
              
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="font-medium">Summary:</p>
                <p className="mt-1 text-gray-700">{result.summary}</p>
              </div>

              <div className="p-3 rounded-lg bg-gray-50">
                <p className="font-medium mb-2">Recommended Controls:</p>
                <ul className="list-disc pl-5 space-y-1">
                  {result.recommendedControls.map(control => (
                    <li key={control} className="text-gray-700">{control}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 