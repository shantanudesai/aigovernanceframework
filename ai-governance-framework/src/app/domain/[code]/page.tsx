import { frameworkData } from '@/data/framework-data';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function DomainPage({ params }: { params: { code: string } }) {
  const controls = frameworkData.data.filter(
    control => control.Master.startsWith(params.code.toUpperCase())
  );

  const domain = controls[0]?.Domain;

  if (!domain) {
    return <div>Domain not found</div>;
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center text-sky-600 hover:text-sky-700 mb-8"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Framework
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="font-heading text-3xl font-bold text-black sm:text-4xl mb-4">
            {domain}
          </h1>
          <p className="text-lg text-zinc-600">
            Control statements and requirements for {domain.toLowerCase()}.
          </p>
        </motion.div>

        <div className="space-y-6">
          {controls.map((control, index) => (
            <motion.div
              key={control.Master}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <h2 className="font-heading text-xl font-semibold text-black">
                  {control.Topic}
                  <span className="ml-2 text-sm text-sky-600">{control.Master}</span>
                </h2>
              </div>
              
              <p className="text-zinc-600 mb-6">{control['Control Statement']}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                {Object.entries(control)
                  .filter(([key]) => ['ISO42001', 'ISO27001', 'ISO27701', 'EU AI ACT', 'NIST RMF', 'SOC2'].includes(key))
                  .map(([key, value]) => value && (
                    <div key={key} className="bg-zinc-50 rounded p-3">
                      <span className="font-medium text-zinc-700">{key}:</span>
                      <span className="ml-2 text-zinc-600">{value}</span>
                    </div>
                  ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 