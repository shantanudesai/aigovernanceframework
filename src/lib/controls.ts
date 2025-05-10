import { Control, RiskLevel } from '@/types/risk-assessment';
import sourceAssurance from '@/data/SourceAssurance.json';

interface SourceAssuranceControl {
  Domain: string;
  Master: string;
  Topic: string;
  'Control Statement': string;
  'EU AI ACT': number | null;
}

// Map EU AI Act article numbers to risk levels
const ARTICLE_RISK_MAPPING: Record<number, RiskLevel[]> = {
  5: ['unacceptable'],
  6: ['high'],
  7: ['high'],
  8: ['high'],
  9: ['high', 'limited'],
  10: ['high', 'limited'],
  11: ['high'],
  52: ['limited'],
  69: ['minimal']
};

function mapControlToRiskLevels(control: SourceAssuranceControl): RiskLevel[] {
  if (!control['EU AI ACT']) {
    return ['minimal']; // Default to minimal if no EU AI Act article is specified
  }

  const article = Math.floor(control['EU AI ACT']); // Handle decimal article numbers
  return ARTICLE_RISK_MAPPING[article] || ['minimal'];
}

export function getControls(): Control[] {
  return (sourceAssurance.data as SourceAssuranceControl[]).map(control => ({
    id: control.Master,
    domain: control.Domain,
    topic: control.Topic,
    statement: control['Control Statement'],
    applicableRiskLevels: mapControlToRiskLevels(control)
  }));
}

export function getControlsForRiskLevel(riskLevel: RiskLevel): Control[] {
  const allControls = getControls();
  return allControls.filter(control => 
    control.applicableRiskLevels.includes(riskLevel)
  );
} 