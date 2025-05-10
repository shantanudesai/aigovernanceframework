import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepIndicator from './StepIndicator';
import QuestionStep from './QuestionStep';
import Summary from './Summary';
import { QuestionnaireState, Step, RiskAssessmentResult } from './types';

const STEPS: Step[] = [
  {
    id: 'prohibited',
    title: 'Prohibited Uses',
    description: 'Check for unacceptable risk AI systems',
  },
  {
    id: 'safety',
    title: 'Safety Component',
    description: 'Assess if your AI is a safety component',
  },
  {
    id: 'annex-iii',
    title: 'Annex III Functions',
    description: 'Check for high-risk functions',
  },
  {
    id: 'human-interaction',
    title: 'Human Interaction',
    description: 'Evaluate transparency requirements',
  },
  {
    id: 'content-generation',
    title: 'Content Generation',
    description: 'Check for AI-generated content',
  },
];

export default function QuestionnaireForm() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionnaireState>({
    prohibited: [],
    safety: null,
    annexIII: [],
    humanInteraction: null,
    contentGeneration: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [assessmentResult, setAssessmentResult] = useState<RiskAssessmentResult | null>(null);

  const handleNext = async () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Submit assessment
      try {
        setIsSubmitting(true);
        const response = await fetch('/api/risk-assessment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(answers),
        });

        if (!response.ok) {
          throw new Error('Failed to submit assessment');
        }

        const result = await response.json();
        setAssessmentResult(result);
        setCurrentStepIndex(prev => prev + 1);
      } catch (error) {
        console.error('Error submitting assessment:', error);
        // You might want to show an error message to the user here
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleAnswer = (stepId: string, answer: any) => {
    setAnswers(prev => ({
      ...prev,
      [stepId]: answer,
    }));
  };

  const isLastStep = currentStepIndex === STEPS.length;
  const currentStep = STEPS[currentStepIndex];

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-zinc-900 sm:text-4xl mb-4">
          EU AI Act Risk Assessment
        </h1>
        <p className="text-lg text-zinc-600">
          Determine your AI system's risk level and applicable requirements under the EU AI Act.
        </p>
      </div>

      <div className="mb-8">
        <StepIndicator steps={STEPS} currentStepIndex={currentStepIndex} />
      </div>

      <AnimatePresence mode="wait">
        {!isLastStep ? (
          <motion.div
            key={currentStep.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionStep
              step={currentStep}
              onAnswer={(answer) => handleAnswer(currentStep.id, answer)}
              value={answers[currentStep.id as keyof QuestionnaireState]}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Summary 
              answers={answers} 
              result={assessmentResult || undefined}
              isLoading={isSubmitting}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-8 flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentStepIndex === 0}
          className="btn-secondary disabled:opacity-50"
        >
          Previous
        </button>
        {!isLastStep && (
          <button
            onClick={handleNext}
            disabled={isSubmitting}
            className="btn disabled:opacity-50"
          >
            {currentStepIndex === STEPS.length - 1 ? (
              isSubmitting ? 'Submitting...' : 'Submit'
            ) : (
              'Next'
            )}
          </button>
        )}
      </div>
    </div>
  );
} 