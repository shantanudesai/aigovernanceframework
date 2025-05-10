import { NextResponse } from 'next/server';
import { processRiskAssessment, getAssessmentResult, getRecentAssessments } from '@/lib/risk-assessment';
import { RiskAssessmentResponse } from '@/types/risk-assessment';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const responses = body.responses as RiskAssessmentResponse[];

    if (!Array.isArray(responses)) {
      return NextResponse.json(
        { error: 'Invalid request format. Expected array of responses.' },
        { status: 400 }
      );
    }

    const result = await processRiskAssessment(responses);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error processing risk assessment:', error);
    return NextResponse.json(
      { error: 'Failed to process risk assessment' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const result = await getAssessmentResult(id);
      if (!result) {
        return NextResponse.json(
          { error: 'Assessment not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(result);
    }

    const results = await getRecentAssessments();
    return NextResponse.json(results);
  } catch (error) {
    console.error('Error retrieving risk assessment:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve risk assessment' },
      { status: 500 }
    );
  }
} 