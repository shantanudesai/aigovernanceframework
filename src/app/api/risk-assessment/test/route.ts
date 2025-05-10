import { NextResponse } from 'next/server';
import { processRiskAssessment } from '@/lib/risk-assessment';
import { RiskAssessmentResponse } from '@/types/risk-assessment';

// Test cases for different risk levels
const TEST_CASES = {
  unacceptable: [
    { questionId: 'subliminal_manipulation', response: true },
    { questionId: 'fundamental_rights', response: true }
  ],
  high: [
    { questionId: 'fundamental_rights', response: true },
    { questionId: 'safety_critical', response: true },
    { questionId: 'law_enforcement', response: true }
  ],
  limited: [
    { questionId: 'public_services', response: true },
    { questionId: 'education_employment', response: true }
  ],
  minimal: [
    { questionId: 'fundamental_rights', response: false },
    { questionId: 'safety_critical', response: false },
    { questionId: 'public_services', response: false }
  ]
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const testCase = searchParams.get('case') as keyof typeof TEST_CASES;
    
    if (!testCase || !TEST_CASES[testCase]) {
      return NextResponse.json(
        { 
          error: 'Invalid test case. Available cases: ' + Object.keys(TEST_CASES).join(', '),
          availableCases: Object.keys(TEST_CASES)
        },
        { status: 400 }
      );
    }

    const responses = TEST_CASES[testCase] as RiskAssessmentResponse[];
    const result = await processRiskAssessment(responses);

    return NextResponse.json({
      testCase,
      responses,
      result,
      success: result.riskLevel === testCase
    });
  } catch (error) {
    console.error('Error running risk assessment test:', error);
    return NextResponse.json(
      { error: 'Failed to run risk assessment test' },
      { status: 500 }
    );
  }
} 