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
  keyControlActivities?: string;
  requiredEvidence?: string;
  controlTestPlan?: string;
}

interface ListItemData {
  text: string;
  isNested: boolean;
  isParent: boolean;
}

export default function ControlDetails({
  keyControlActivities = '',
  requiredEvidence = '',
  controlTestPlan = '',
}: ControlDetailsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper function to split text into bullet points with parent-child relationships
  const splitIntoItems = (text: string): ListItemData[] => {
    if (!text) return [];
    
    // Split by newlines first, then clean up each line
    const lines = text
      .split('\n')
      .map(line => line.trim())
      .filter(item => item.length > 0);

    const items: ListItemData[] = [];
    let currentParent: ListItemData | null = null;

    lines.forEach(line => {
      const isIndented = line.startsWith('  -');
      const cleanedText = line.replace(/^-\s*/, '').replace(/^  -\s*/, '');
      const isParent = cleanedText.endsWith(':');
      
      // If line ends with colon, it's a parent
      if (isParent) {
        currentParent = {
          text: cleanedText,
          isNested: isIndented,
          isParent: true
        };
        items.push(currentParent);
      } else if (isIndented || (currentParent && !line.startsWith('-'))) {
        // If line is indented or follows a parent without starting with dash, it's a child
        items.push({
          text: cleanedText,
          isNested: true,
          isParent: false
        });
      } else {
        // Reset parent if we encounter a new top-level item
        currentParent = null;
        items.push({
          text: cleanedText,
          isNested: false,
          isParent: false
        });
      }
    });

    return items;
  };

  // Component for individual list items with hover effect
  const ListItem = ({ item }: { item: ListItemData }) => (
    <li 
      className={`
        flex items-start group py-3 
        ${item.isNested ? 'pl-16 ml-8 border-l-2 border-sky-100' : 'px-4'} 
        ${item.isParent ? 'font-medium mb-1' : ''} 
        rounded-md hover:bg-gray-100 transition-colors duration-150
      `}
    >
      <div className={`
        flex-shrink-0 
        ${item.isParent ? 'w-1.5 h-1.5' : 'w-1 h-1'} 
        rounded-full 
        ${item.isParent ? 'bg-sky-600' : 'bg-sky-400'} 
        ${item.isParent ? 'mt-[0.9rem]' : 'mt-3'}
        mr-3
      `} />
      <span className={`
        leading-relaxed 
        ${item.isParent ? 'text-zinc-800' : 'text-zinc-600'}
        ${item.isNested ? 'relative' : ''}
      `}>
        {item.text}
        {item.isParent && (
          <div className="absolute -left-[calc(4rem+2px)] top-full h-2 w-3 border-l-2 border-b-2 border-sky-100 rounded-bl-lg" />
        )}
      </span>
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
              {keyControlActivities && (
                <div>
                  <div className="flex items-center mb-4">
                    <ClipboardDocumentCheckIcon className="h-6 w-6 text-sky-600 mr-2" />
                    <h3 className="font-semibold text-zinc-900">Key Control Activities</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <ul className="divide-y divide-gray-100">
                      {splitIntoItems(keyControlActivities).map((item, index) => (
                        <ListItem key={index} item={item} />
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {requiredEvidence && (
                <div>
                  <div className="flex items-center mb-4">
                    <DocumentTextIcon className="h-6 w-6 text-sky-600 mr-2" />
                    <h3 className="font-semibold text-zinc-900">Required Evidence</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <ul className="divide-y divide-gray-100">
                      {splitIntoItems(requiredEvidence).map((item, index) => (
                        <ListItem key={index} item={item} />
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {controlTestPlan && (
                <div>
                  <div className="flex items-center mb-4">
                    <ClipboardDocumentListIcon className="h-6 w-6 text-sky-600 mr-2" />
                    <h3 className="font-semibold text-zinc-900">Control Test Plan and Procedures</h3>
                  </div>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <ul className="divide-y divide-gray-100">
                      {splitIntoItems(controlTestPlan).map((item, index) => (
                        <ListItem key={index} item={item} />
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 