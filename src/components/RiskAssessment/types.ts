export type RiskLevel = 'unacceptable' | 'high' | 'limited' | 'minimal';

export interface Control {
  id: string;
  domain: string;
  description: string;
  keyControlActivities?: string;
  requiredEvidence?: string;
  controlTestPlan?: string;
}

export interface RiskAssessmentResult {
  level: RiskLevel;
  description: string;
  requirements: string[];
  nextSteps: string[];
  mandatoryControls: Control[];
  recommendedControls: Control[];
  tailoredRecommendations?: Control[];
}

export interface QuestionnaireState {
  prohibited: boolean[];
  highRisk: boolean[];
  limitedRisk: boolean[];
  details: boolean[];
}

export interface Step {
  id: keyof QuestionnaireState;
  title: string;
  description: string;
}

export interface Question {
  id: string;
  label: string;
  tooltip?: string;
}

export interface QuestionStepProps {
  step: Step;
  value: boolean[];
  onAnswer: (answer: boolean[]) => void;
}

export interface SummaryProps {
  answers: QuestionnaireState;
  result?: RiskAssessmentResult;
  isLoading: boolean;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStepIndex: number;
} 