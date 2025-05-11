'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Pillar from '../components/Pillar';
import Link from 'next/link';
import Toast from '@/components/Toast';

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
      <Toast />
      {/* Subtle Menu */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end space-x-8 py-4">
            <Link href="/tools" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Tools
            </Link>
            <Link href="/blog" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-500 hover:text-gray-900">
              About
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 relative"
        >
          <div className="relative inline-block">
            <h1 className="font-heading text-4xl font-bold text-zinc-900 sm:text-5xl mb-4 relative">
              <span className="relative">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="absolute -top-4 -left-1 transform -rotate-12 text-red-500 font-bold text-3xl sm:text-4xl font-handwriting z-10 whitespace-nowrap"
                  style={{ 
                    textShadow: '1px 1px 2px rgba(255,100,100,0.3)',
                    filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.1))',
                    letterSpacing: '1px',
                    transformOrigin: 'bottom left'
                  }}
                >
                  Ultimate
                </motion.span>
                AI
              </span> Governance Framework
            </h1>
          </div>
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