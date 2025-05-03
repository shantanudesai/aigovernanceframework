'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Pillar from '../components/Pillar';

const domains = [
  { code: 'GL', title: 'Governance & Leadership', description: 'Executive commitment, roles, and strategic alignment for AI governance.' },
  { code: 'RM', title: 'Risk Management', description: 'Comprehensive risk management framework for AI systems.' },
  { code: 'RO', title: 'Regulatory Operations', description: 'Compliance framework, transparency, and reporting requirements.' },
  { code: 'LC', title: 'System, Data & Model Lifecycle', description: 'Data quality, system development, and lifecycle management.' },
  { code: 'SE', title: 'Security', description: 'Security governance, architecture, and controls for AI systems.' },
  { code: 'RS', title: 'Safe Responsible AI', description: 'Human oversight, safety, robustness, and fairness in AI.' },
  { code: 'PR', title: 'Privacy', description: 'Privacy by design, data protection, and privacy-enhancing technologies.' },
  { code: 'AA', title: 'Assurance & Audit', description: 'Internal assessment, certification, and validation processes.' },
  { code: 'OM', title: 'Operational Monitoring', description: 'System performance monitoring and continuous improvement.' },
  { code: 'TP', title: 'Third Party & Supply Chain', description: 'Third-party responsibilities and supplier risk management.' },
  { code: 'CO', title: 'Transparency & Communication', description: 'AI system transparency and stakeholder engagement.' },
  { code: 'IM', title: 'Incident Management', description: 'Incident detection, response, and improvement processes.' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50/50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-4xl font-bold text-zinc-900 sm:text-5xl mb-4">
            AI Governance Framework
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            A comprehensive framework for implementing and managing AI governance controls across twelve key domains.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains.map((domain, index) => (
            <Pillar
              key={domain.code}
              title={domain.title}
              code={domain.code}
              description={domain.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 