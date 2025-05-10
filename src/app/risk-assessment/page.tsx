import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const RiskAssessmentQuestionnaire = dynamic(
  () => import('@/components/RiskAssessment/Questionnaire'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Risk Assessment - AI Governance Framework',
  description: 'Assess your AI system\'s risk level under the EU AI Act',
};

export default function RiskAssessmentPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <RiskAssessmentQuestionnaire />
    </div>
  );
} 