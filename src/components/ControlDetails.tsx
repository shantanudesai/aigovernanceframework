import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDownIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface ControlDetailsProps {
  keyControlActivities: string;
  requiredEvidence: string;
  controlTestPlan: string;
}

export default function ControlDetails({
  keyControlActivities,
  requiredEvidence,
  controlTestPlan,
}: ControlDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper function to split text into bullet points
  const splitIntoItems = (text: string) => {
    // Split by dashes and filter out empty items
    return text
      .split('-')
      .map(item => item.trim())
      .filter(item => item.length > 0);
  };

  // Component for individual list items with hover effect
  const ListItem = ({ text }: { text: string }) => (
    <li className="flex items-start space-x-3 group py-3 px-4 rounded-md hover:bg-gray-100 transition-colors duration-150">
      <div className="flex-shrink-0 w-1 h-1 rounded-full bg-sky-500 mt-3" />
      <span className="text-zinc-600 leading-relaxed">{text}</span>
    </li>
  );

  return (
    <div className="mt-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center text-sky-600 hover:text-sky-700 font-medium text-sm"
      >
        <ChevronDownIcon
          className={`h-5 w-5 mr-1 transform transition-transform ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
        Implementation Guidance
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-8 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div>
                <div className="flex items-center mb-4">
                  <ClipboardDocumentCheckIcon className="h-6 w-6 text-sky-600 mr-2" />
                  <h3 className="font-semibold text-zinc-900">Key Control Activities</h3>
                </div>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <ul className="divide-y divide-gray-100">
                    {splitIntoItems(keyControlActivities).map((item, index) => (
                      <ListItem key={index} text={item} />
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <DocumentTextIcon className="h-6 w-6 text-sky-600 mr-2" />
                  <h3 className="font-semibold text-zinc-900">Required Evidence</h3>
                </div>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <ul className="divide-y divide-gray-100">
                    {splitIntoItems(requiredEvidence).map((item, index) => (
                      <ListItem key={index} text={item} />
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <ClipboardDocumentListIcon className="h-6 w-6 text-sky-600 mr-2" />
                  <h3 className="font-semibold text-zinc-900">Control Test Plan and Procedures</h3>
                </div>
                <div className="bg-gray-50 rounded-lg overflow-hidden">
                  <ul className="divide-y divide-gray-100">
                    {splitIntoItems(controlTestPlan).map((item, index) => (
                      <ListItem key={index} text={item} />
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 