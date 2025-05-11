import { NextResponse } from 'next/server';
import { determineRiskLevel } from '@/lib/risk-assessment';
import { QuestionnaireState } from '@/lib/risk-assessment';

export async function POST(request: Request) {
  try {
    const answers: QuestionnaireState = await request.json();
    const result = determineRiskLevel(answers);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing risk assessment:', error);
    return NextResponse.json(
      { error: 'Failed to process risk assessment' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not supported' },
    { status: 405 }
  );
} 