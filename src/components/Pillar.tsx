'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface PillarProps {
  title: string;
  code: string;
  description: string;
  index: number;
}

export default function Pillar({ title, code, description, index }: PillarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/domain/${code.toLowerCase()}`} className="block">
        <div className="relative bg-white rounded-lg shadow-sm border border-zinc-100 p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
          {/* Icon Placeholder - You can add specific icons for each domain later */}
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center mb-4">
            <span className="text-sky-600 font-semibold">{code}</span>
          </div>
          
          {/* Content */}
          <div className="space-y-2">
            <h3 className="font-heading text-lg font-semibold text-zinc-900 line-clamp-2">
              {title}
            </h3>
            <p className="text-zinc-600 text-sm line-clamp-2">
              {description}
            </p>
          </div>
          
          {/* Learn More Link */}
          <div className="mt-4 inline-flex items-center text-sky-600 text-sm font-medium">
            Learn More
            <ArrowRightIcon className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
} 