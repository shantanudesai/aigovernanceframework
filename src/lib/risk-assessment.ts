import { RiskLevel, RiskAssessmentResponse, RiskAssessmentResult } from '@/types/risk-assessment';
import { redis } from './redis';
import { v4 as uuidv4 } from 'uuid';
import { getControlsForRiskLevel } from './controls';

// Questions that indicate unacceptable risk under EU AI Act
const UNACCEPTABLE_INDICATORS = [
  'subliminal_manipulation'
];

// Questions that directly indicate high risk under EU AI Act
const HIGH_RISK_INDICATORS = [
  'safety_critical',
  'law_enforcement',
  'fundamental_rights'
];

// Risk weights for different aspects
const RISK_WEIGHTS: Record<string, number> = {
  fundamental_rights: 3,
  safety_critical: 3,
  critical_infrastructure: 2,
  education_employment: 2,
  public_services: 2,
  law_enforcement: 3,
  migration_asylum: 2,
  justice_democracy: 3
};

export async function processRiskAssessment(
  responses: RiskAssessmentResponse[]
): Promise<RiskAssessmentResult> {
  // Check for unacceptable risk indicators first
  const hasUnacceptableRisk = responses.some(
    (response) => UNACCEPTABLE_INDICATORS.includes(response.questionId) && response.response
  );

  if (hasUnacceptableRisk) {
    return createResult('unacceptable', responses);
  }

  // Check for direct high-risk indicators
  const hasHighRiskIndicator = responses.some(
    (response) => HIGH_RISK_INDICATORS.includes(response.questionId) && response.response
  );

  if (hasHighRiskIndicator) {
    return createResult('high', responses);
  }

  // For remaining cases, calculate risk based on other factors
  const hasLimitedRiskIndicator = responses.some(
    (response) => 
      (response.questionId === 'public_services' || 
       response.questionId === 'education_employment') && 
      response.response
  );

  if (hasLimitedRiskIndicator) {
    return createResult('limited', responses);
  }

  // If no specific risk indicators are triggered, classify as minimal risk
  return createResult('minimal', responses);
}

async function createResult(
  riskLevel: RiskLevel,
  responses: RiskAssessmentResponse[]
): Promise<RiskAssessmentResult> {
  const result: RiskAssessmentResult = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    riskLevel,
    responses,
    recommendedControls: await getRecommendedControls(riskLevel),
    summary: generateRiskSummary(riskLevel)
  };

  // Store the result in Redis
  await storeAssessmentResult(result);

  return result;
}

async function getRecommendedControls(riskLevel: RiskLevel): Promise<string[]> {
  const controls = getControlsForRiskLevel(riskLevel);
  return controls.map(control => control.id);
}

function generateRiskSummary(riskLevel: RiskLevel): string {
  const summaries: Record<RiskLevel, string> = {
    unacceptable: 'This AI system falls under prohibited practices in the EU AI Act. It cannot be deployed in the EU.',
    high: 'This AI system is classified as high-risk under the EU AI Act. Strict compliance requirements apply.',
    limited: 'This AI system has transparency obligations under the EU AI Act.',
    minimal: 'This AI system poses minimal risk. Basic AI governance practices recommended.'
  };

  return summaries[riskLevel];
}

async function storeAssessmentResult(result: RiskAssessmentResult): Promise<void> {
  const key = `assessment:${result.id}`;
  await redis.set(key, JSON.stringify(result));
  // Store ID in a list for retrieval
  await redis.lpush('recent_assessments', result.id);
}

export async function getAssessmentResult(id: string): Promise<RiskAssessmentResult | null> {
  const key = `assessment:${id}`;
  const result = await redis.get(key);
  
  if (!result) return null;
  
  try {
    return JSON.parse(result) as RiskAssessmentResult;
  } catch {
    return null;
  }
}

export async function getRecentAssessments(limit: number = 10): Promise<RiskAssessmentResult[]> {
  const ids = await redis.lrange('recent_assessments', 0, limit - 1);
  if (!ids) return [];
  
  const results = await Promise.all(
    ids.map(id => typeof id === 'string' ? getAssessmentResult(id) : null)
  );
  
  return results.filter((result): result is RiskAssessmentResult => result !== null);
} 