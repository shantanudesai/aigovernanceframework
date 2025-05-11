import { RiskAssessmentResult, Control } from '@/components/RiskAssessment/types';
import sourceAssurance from '@/data/SourceAssurance.json';

interface SourceAssuranceControl {
  Domain: string;
  Master: string;
  Topic: string;
  'Control Statement': string;
  'Key control activities': string;
  'Required Evidence': string;
  'Control test plan and procedures': string;
  'Risk Category'?: string;
  'Description'?: string;
  'Mandatory Controls'?: string;
  'Recommended Controls'?: string;
  'Tailored Recommendations (High Risk)'?: string;
}

interface SourceAssuranceData {
  data: SourceAssuranceControl[];
}

export interface QuestionnaireState {
  prohibited: boolean[];
  highRisk: boolean[];
  limitedRisk: boolean[];
  details: boolean[];
}

export const prohibitedQuestions = [
  {
    id: 'subliminal',
    label: 'Does the AI system use subliminal manipulation likely to cause harm?',
    tooltip: 'E.g., manipulative voice-activated toys influencing children\'s choices'
  },
  {
    id: 'vulnerability',
    label: 'Does the AI system exploit vulnerabilities of specific groups based on age, disability, or social/economic situation?',
    tooltip: 'E.g., deceptive financial ads targeting elderly users'
  },
  {
    id: 'social_scoring',
    label: 'Does the AI system perform social scoring for general purposes by public authorities?',
    tooltip: 'E.g., scoring citizens based on social behavior for public services access'
  },
  {
    id: 'biometric_identification',
    label: 'Does the AI system perform real-time remote biometric identification in publicly accessible spaces for law enforcement?',
    tooltip: 'E.g., facial recognition systems in public areas'
  }
];

export const highRiskQuestions = [
  {
    id: 'critical_infrastructure',
    label: 'Is the AI system used in critical infrastructure that could put life and health at risk?',
    tooltip: 'E.g., AI systems managing energy grids or water supply'
  },
  {
    id: 'education_vocational',
    label: 'Is the AI system used for educational or vocational training purposes?',
    tooltip: 'E.g., automated assessment systems or admission decisions'
  },
  {
    id: 'employment_workers',
    label: 'Is the AI system used for employment, worker management, or access to self-employment?',
    tooltip: 'E.g., CV screening tools or employee monitoring systems'
  },
  {
    id: 'essential_services',
    label: 'Is the AI system used for access to essential private or public services?',
    tooltip: 'E.g., credit scoring or social benefits allocation'
  },
  {
    id: 'law_enforcement',
    label: 'Is the AI system used by law enforcement authorities?',
    tooltip: 'E.g., crime prediction or evidence evaluation'
  },
  {
    id: 'migration_asylum',
    label: 'Is the AI system used for migration, asylum, and border control management?',
    tooltip: 'E.g., verification of travel documents or risk assessment'
  },
  {
    id: 'justice_democratic',
    label: 'Is the AI system used in administration of justice and democratic processes?',
    tooltip: 'E.g., legal research assistance or voting systems'
  }
];

export const limitedRiskQuestions = [
  {
    id: 'chatbot',
    label: 'Is the AI system an interactive chatbot or virtual assistant?',
    tooltip: 'E.g., customer service chatbots or digital assistants'
  },
  {
    id: 'emotion_recognition',
    label: 'Does the AI system use emotion recognition?',
    tooltip: 'E.g., systems analyzing facial expressions or voice patterns'
  },
  {
    id: 'biometric_categorization',
    label: 'Does the AI system perform biometric categorization?',
    tooltip: 'E.g., systems categorizing people by ethnicity or gender'
  },
  {
    id: 'content_manipulation',
    label: 'Does the AI system generate or manipulate content (images, video, audio, text)?',
    tooltip: 'E.g., deepfakes or AI-generated content'
  }
];

export const detailQuestions = [
  {
    id: 'data_collection',
    label: 'Does the system collect or process personal data?',
    tooltip: 'Including any information that can identify individuals'
  },
  {
    id: 'automated_decisions',
    label: 'Does the system make automated decisions affecting individuals?',
    tooltip: 'Decisions made without meaningful human oversight'
  },
  {
    id: 'third_party',
    label: 'Does the system integrate with or depend on third-party AI systems?',
    tooltip: 'Including API calls to external AI services'
  }
];

function getControlsForRiskLevel(riskLevel: string, answers: QuestionnaireState): {
  mandatory: Control[],
  recommended: Control[],
  tailored: Control[]
} {
  const data = (sourceAssurance as any).data;
  const controls = {
    mandatory: [] as Control[],
    recommended: [] as Control[],
    tailored: [] as Control[]
  };

  if (riskLevel === 'unacceptable') {
    return controls; // No controls for unacceptable risk systems as they are banned
  }

  // Helper function to check if a control is relevant for high-risk systems
  const isHighRiskControl = (control: any): boolean => {
    const euAiAct = control['EU AI ACT'];
    if (!euAiAct) return false;
    // Convert to string to handle both number and string formats
    const articles = String(euAiAct).split(' ').map(a => parseFloat(a));
    return articles.some(article => article >= 8 && article <= 15);
  };

  // Helper function to check if a control is relevant for limited-risk systems
  const isLimitedRiskControl = (control: any): boolean => {
    const euAiAct = control['EU AI ACT'];
    if (!euAiAct) return false;
    const articles = String(euAiAct).split(' ').map(a => parseFloat(a));
    return articles.some(article => article >= 50 && article <= 55);
  };

  data.forEach((item: any) => {
    const control: Control = {
      id: item.Master,
      domain: item.Domain,
      description: item['Control Statement'],
      keyControlActivities: item['Key control activities'],
      requiredEvidence: item['Required Evidence'],
      controlTestPlan: item['Control test plan and procedures']
    };

    if (riskLevel === 'high') {
      // For high-risk systems
      if (isHighRiskControl(item)) {
        controls.mandatory.push(control);
      } else if (item.Domain.includes('Risk Management') || 
                 item.Domain.includes('Governance & Leadership') ||
                 item.Domain.includes('Safe Responsible AI')) {
        controls.recommended.push(control);
      }

      // Add tailored recommendations based on specific high-risk categories
      if (answers.highRisk[0] && item.Domain.includes('Critical Infrastructure')) { // Critical infrastructure
        controls.tailored.push(control);
      }
      if (answers.highRisk[1] && item.Domain.includes('Education')) { // Education
        controls.tailored.push(control);
      }
      if (answers.highRisk[2] && item.Domain.includes('Employment')) { // Employment
        controls.tailored.push(control);
      }
      // Add more specific mappings as needed
    } else if (riskLevel === 'limited') {
      // For limited-risk systems
      if (isLimitedRiskControl(item)) {
        controls.mandatory.push(control);
      }
      if (item.Domain.includes('Transparency') || item.Domain.includes('Communication')) {
        controls.recommended.push(control);
      }
    } else if (riskLevel === 'minimal') {
      // For minimal-risk systems, recommend basic governance controls
      if (item.Domain.includes('Governance') || 
          item.Domain.includes('Risk Management') ||
          item.Domain.includes('Transparency')) {
        controls.recommended.push(control);
      }
    }
  });

  // Remove duplicates
  controls.mandatory = Array.from(new Set(controls.mandatory.map(c => JSON.stringify(c)))).map(c => JSON.parse(c));
  controls.recommended = Array.from(new Set(controls.recommended.map(c => JSON.stringify(c)))).map(c => JSON.parse(c));
  controls.tailored = Array.from(new Set(controls.tailored.map(c => JSON.stringify(c)))).map(c => JSON.parse(c));

  return controls;
}

export function determineRiskLevel(answers: QuestionnaireState): RiskAssessmentResult {
  // Check for prohibited practices
  if (answers.prohibited.some((answer: boolean) => answer)) {
    return {
      level: 'unacceptable',
      description: 'Your AI system includes prohibited practices under the EU AI Act',
      requirements: [
        'Immediate cessation of development/deployment',
        'Legal consultation required',
        'System redesign needed to remove prohibited elements'
      ],
      nextSteps: [
        'Document all current system capabilities and uses',
        'Identify and remove prohibited functionalities',
        'Develop compliance plan with legal counsel'
      ],
      mandatoryControls: [],
      recommendedControls: [],
    };
  }

  // Check for high-risk applications
  if (answers.highRisk.some((answer: boolean) => answer)) {
    const controls = getControlsForRiskLevel('high', answers);
    return {
      level: 'high',
      description: 'Your AI system is classified as high-risk under the EU AI Act',
      requirements: [
        'Mandatory conformity assessment',
        'Risk management system',
        'Data governance practices',
        'Technical documentation',
        'Record keeping and logging',
        'Human oversight measures',
        'Accuracy and robustness',
        'Registration in EU database'
      ],
      nextSteps: [
        'Establish risk management system',
        'Prepare technical documentation',
        'Implement monitoring system',
        'Set up human oversight mechanisms',
        'Plan for conformity assessment'
      ],
      mandatoryControls: controls.mandatory,
      recommendedControls: controls.recommended,
      tailoredRecommendations: controls.tailored
    };
  }

  // Check for limited-risk applications
  if (answers.limitedRisk.some((answer: boolean) => answer)) {
    const controls = getControlsForRiskLevel('limited', answers);
    return {
      level: 'limited',
      description: 'Your AI system has specific transparency obligations under the EU AI Act',
      requirements: [
        'Disclosure of AI system nature',
        'Notification of emotion recognition',
        'Disclosure of deep fake content',
        'Transparency about biometric categorization'
      ],
      nextSteps: [
        'Implement transparency measures',
        'Update user interfaces and documentation',
        'Review and update privacy notices',
        'Train staff on transparency requirements'
      ],
      mandatoryControls: controls.mandatory,
      recommendedControls: controls.recommended,
      tailoredRecommendations: controls.tailored
    };
  }

  // Minimal risk
  const controls = getControlsForRiskLevel('minimal', answers);
  return {
    level: 'minimal',
    description: 'Your AI system falls under minimal risk category',
    requirements: [
      'Voluntary codes of conduct',
      'Basic documentation practices',
      'Regular risk monitoring'
    ],
    nextSteps: [
      'Consider voluntary compliance measures',
      'Document system capabilities',
      'Monitor for regulatory changes'
    ],
    mandatoryControls: controls.mandatory,
    recommendedControls: controls.recommended,
    tailoredRecommendations: controls.tailored
  };
} 