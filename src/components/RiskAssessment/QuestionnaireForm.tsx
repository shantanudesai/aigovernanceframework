'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepIndicator from './StepIndicator';
import QuestionStep from './QuestionStep';
import Summary from './Summary';
import { QuestionnaireState, Step, RiskAssessmentResult } from './types';
import { determineRiskLevel, prohibitedQuestions, highRiskQuestions, limitedRiskQuestions, detailQuestions } from '@/lib/risk-assessment';

const STEPS: Step[] = [
  {
    id: 'prohibited',
    title: 'Prohibited Uses',
    description: 'Check for unacceptable risk AI systems',
  },
  {
    id: 'highRisk',
    title: 'High-Risk Applications',
    description: 'Check for high-risk functions',
  },
  {
    id: 'limitedRisk',
    title: 'Limited-Risk Applications',
    description: 'Check for transparency requirements',
  },
  {
    id: 'details',
    title: 'Additional Details',
    description: 'Gather more information about your system',
  }
];

export default function QuestionnaireForm() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireState>({
    prohibited: Array(prohibitedQuestions.length).fill(false),
    highRisk: Array(highRiskQuestions.length).fill(false),
    limitedRisk: Array(limitedRiskQuestions.length).fill(false),
    details: Array(detailQuestions.length).fill(false)
  });
  const [assessmentResult, setAssessmentResult] = useState<RiskAssessmentResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentStep = STEPS[currentStepIndex];
  const isLastStep = currentStepIndex === STEPS.length - 1;

  const handleAnswer = (stepId: keyof QuestionnaireState, answer: boolean[]) => {
    setAnswers(prev => ({
      ...prev,
      [stepId]: answer
    }));
  };

  const submitAssessment = async () => {
    setIsSubmitting(true);
    try {
      const result: RiskAssessmentResult = determineRiskLevel(answers);
      setAssessmentResult(result);
    } catch (error) {
      console.error('Error determining risk level:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getQuestionsForStep = (stepId: keyof QuestionnaireState) => {
    switch (stepId) {
      case 'prohibited':
        return prohibitedQuestions;
      case 'highRisk':
        return highRiskQuestions;
      case 'limitedRisk':
        return limitedRiskQuestions;
      case 'details':
        return detailQuestions;
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 mb-8"
            >
              <svg
                className="mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
              Back to Ultimate AI Governance Framework
            </a>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              EU AI Act Risk Assessment
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Determine your AI system's risk level and applicable requirements under the EU AI Act.
            </p>
          </div>

          <div className="mb-12">
            <StepIndicator steps={STEPS} currentStepIndex={currentStepIndex} />
          </div>

          <AnimatePresence mode="wait">
            {!isLastStep || !assessmentResult ? (
              <motion.div
                key={currentStep.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
              >
                <QuestionStep
                  step={currentStep}
                  questions={getQuestionsForStep(currentStep.id)}
                  value={answers[currentStep.id]}
                  onAnswer={(answer) => handleAnswer(currentStep.id, answer)}
                />

                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  {currentStepIndex > 0 && (
                    <button 
                      onClick={() => setCurrentStepIndex(currentStepIndex - 1)}
                      className="px-6 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Previous
                    </button>
                  )}
                  <button 
                    onClick={() => {
                      if (currentStepIndex === STEPS.length - 1) {
                        submitAssessment();
                      } else {
                        setCurrentStepIndex(currentStepIndex + 1);
                      }
                    }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-auto"
                  >
                    {currentStepIndex === STEPS.length - 1 ? 'Submit Assessment' : 'Next'}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-8"
              >
                <Summary 
                  answers={answers} 
                  result={assessmentResult}
                  isLoading={isSubmitting}
                />

                <div className="mt-8 pt-6 border-t border-gray-200">
                  <button 
                    onClick={() => {
                      setCurrentStepIndex(0);
                      setAnswers({
                        prohibited: Array(prohibitedQuestions.length).fill(false),
                        highRisk: Array(highRiskQuestions.length).fill(false),
                        limitedRisk: Array(limitedRiskQuestions.length).fill(false),
                        details: Array(detailQuestions.length).fill(false)
                      });
                      setAssessmentResult(null);
                    }}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Start New Assessment
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 