import { NextResponse } from 'next/server';
import { determineRiskLevel } from '@/lib/risk-assessment';
import { QuestionnaireState } from '@/lib/risk-assessment';

const TEST_CASES: Array<{
  description: string;
  answers: QuestionnaireState;
  expectedLevel: 'unacceptable' | 'high' | 'limited' | 'minimal';
}> = [
  {
    description: 'Unacceptable risk - subliminal manipulation',
    answers: {
      prohibited: [true, false, false, false],
      highRisk: [false, false, false, false, false, false, false],
      limitedRisk: [false, false, false, false],
      details: [false, false, false]
    },
    expectedLevel: 'unacceptable'
  },
  {
    description: 'High risk - law enforcement',
    answers: {
      prohibited: [false, false, false, false],
      highRisk: [false, false, false, false, true, false, false],
      limitedRisk: [false, false, false, false],
      details: [false, false, false]
    },
    expectedLevel: 'high'
  },
  {
    description: 'Limited risk - chatbot',
    answers: {
      prohibited: [false, false, false, false],
      highRisk: [false, false, false, false, false, false, false],
      limitedRisk: [true, false, false, false],
      details: [false, false, false]
    },
    expectedLevel: 'limited'
  },
  {
    description: 'Minimal risk - no risk indicators',
    answers: {
      prohibited: [false, false, false, false],
      highRisk: [false, false, false, false, false, false, false],
      limitedRisk: [false, false, false, false],
      details: [false, false, false]
    },
    expectedLevel: 'minimal'
  }
];

export async function GET() {
  const results = [];

  for (const testCase of TEST_CASES) {
    try {
      const result = determineRiskLevel(testCase.answers);
      results.push({
        description: testCase.description,
        answers: testCase.answers,
        result,
        success: result.level === testCase.expectedLevel
      });
    } catch (error) {
      console.error('Error running risk assessment test:', error);
      results.push({
        description: testCase.description,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  return NextResponse.json(results);
} 