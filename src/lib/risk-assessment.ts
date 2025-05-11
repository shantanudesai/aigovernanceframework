import { RiskAssessmentResult, Control } from '@/components/RiskAssessment/types';
import sourceAssurance from '@/data/SourceAssurance.json';
import { QuestionnaireState } from '@/components/RiskAssessment/types';

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

export function determineRiskLevel(answers: QuestionnaireState) {
  // Check for prohibited uses
  if (answers.prohibited.some(answer => answer)) {
    return {
      level: 'unacceptable',
      description: 'Your AI system falls under prohibited uses according to the EU AI Act.',
      requirements: [
        'Immediate cessation of system development/deployment',
        'Review and redesign to remove prohibited functionalities',
        'Consult legal experts for compliance guidance'
      ],
      nextSteps: [
        'Document all current system capabilities and uses',
        'Identify specific aspects that trigger prohibited status',
        'Develop remediation plan with clear timelines'
      ],
      mandatoryControls: [],
      recommendedControls: []
    } as const;
  }

  // Check for high-risk systems
  if (answers.highRisk.some(answer => answer)) {
    return {
      level: 'high',
      description: 'Your AI system is classified as high-risk under the EU AI Act.',
      requirements: [
        'Implement comprehensive risk management system',
        'Ensure data governance and quality controls',
        'Maintain technical documentation and logs',
        'Enable human oversight mechanisms',
        'Ensure accuracy, robustness, and cybersecurity',
        'Register in EU database before deployment'
      ],
      nextSteps: [
        'Conduct detailed risk assessment',
        'Review and enhance data governance',
        'Implement monitoring systems',
        'Prepare compliance documentation'
      ],
      mandatoryControls: [],
      recommendedControls: []
    } as const;
  }

  // Check for limited risk systems
  if (answers.limitedRisk.some(answer => answer)) {
    return {
      level: 'limited',
      description: 'Your AI system has specific transparency obligations under the EU AI Act.',
      requirements: [
        'Notify users they are interacting with AI',
        'Label AI-generated content appropriately',
        'Design system to prevent emotional manipulation',
        'Implement opt-out mechanisms where applicable'
      ],
      nextSteps: [
        'Review user interface for transparency',
        'Update documentation and disclosures',
        'Implement content labeling system',
        'Train staff on transparency requirements'
      ],
      mandatoryControls: [],
      recommendedControls: []
    } as const;
  }

  // Minimal risk systems
  return {
    level: 'minimal',
    description: 'Your AI system falls under minimal risk category.',
    requirements: [
      'Follow AI best practices and standards',
      'Consider voluntary codes of conduct',
      'Monitor regulatory developments'
    ],
    nextSteps: [
      'Document system capabilities and limitations',
      'Implement basic monitoring controls',
      'Stay informed about industry standards'
    ],
    mandatoryControls: [],
    recommendedControls: []
  } as const;
} 