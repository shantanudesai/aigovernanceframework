export type RiskLevel = 'unacceptable' | 'high' | 'limited' | 'minimal';

export interface RiskAssessmentQuestion {
  id: string;
  question: string;
  category: string;
  weight: number;
}

export interface RiskAssessmentResponse {
  questionId: string;
  response: boolean;
}

export interface RiskAssessmentResult {
  id: string;
  timestamp: string;
  riskLevel: RiskLevel;
  responses: RiskAssessmentResponse[];
  recommendedControls: string[];
  summary: string;
}

export interface Control {
  id: string;
  domain: string;
  topic: string;
  statement: string;
  applicableRiskLevels: RiskLevel[];
} 