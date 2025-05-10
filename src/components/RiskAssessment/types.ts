export interface Step {
  id: string;
  title: string;
  description: string;
}

export interface QuestionnaireState {
  prohibited: string[];
  safety: boolean | null;
  annexIII: string[];
  humanInteraction: boolean | null;
  contentGeneration: boolean | null;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStepIndex: number;
}

export interface QuestionStepProps {
  step: Step;
  onAnswer: (answer: any) => void;
  value: any;
}

export interface RiskAssessmentResult {
  id: string;
  timestamp: number;
  riskLevel: 'unacceptable' | 'high' | 'limited' | 'minimal';
  answers: QuestionnaireState;
  applicableControls: string[];
  recommendations: {
    immediate: string[];
    governance: string[];
    technical: string[];
    documentation: string[];
  };
}

export interface SummaryProps {
  answers: QuestionnaireState;
  result?: RiskAssessmentResult;
  isLoading?: boolean;
} 