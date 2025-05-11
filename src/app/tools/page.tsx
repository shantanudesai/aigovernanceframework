import { ArrowRightIcon, ArrowLeftIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const tools = [
  {
    name: 'EU AI Act Risk Assessment',
    description: 'Determine your AI system\'s risk level and applicable requirements under the EU AI Act. This tool helps you assess whether your AI system falls under high-risk categories and identifies the specific obligations that apply.',
    href: '/risk-assessment',
    status: 'Available',
  }
];

export default function Tools() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-zinc-50/50">
      {/* Subtle Menu */}
      <div className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end space-x-8 py-4">
            <Link href="/tools" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Tools
            </Link>
            <Link href="/blog" className="text-base font-medium text-gray-500 hover:text-gray-900">
              Blog
            </Link>
            <Link href="/about" className="text-base font-medium text-gray-500 hover:text-gray-900">
              About
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-base font-medium text-gray-500 hover:text-gray-900"
          >
            <ArrowLeftIcon className="mr-2 h-5 w-5" />
            Back to Framework
          </Link>
        </div>

        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            AI Governance Tools
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Practical tools to help you implement effective AI governance
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Available Tool */}
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-gray-900">{tool.name}</h3>
                  <p className="text-base text-green-600">Available</p>
                </div>
                <p className="mt-4 text-lg text-gray-500">
                  {tool.description}
                </p>
              </div>
              <Link
                href={tool.href}
                className="mt-8 inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Launch Tool
                <ArrowRightIcon className="ml-2 -mr-0.5 h-5 w-5" aria-hidden="true" />
              </Link>
            </div>
          ))}

          {/* Get in Touch Card */}
          <div className="relative flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold text-gray-900">Have a Tool Idea?</h3>
              </div>
              <p className="mt-4 text-lg text-gray-500">
                We're always looking to expand our toolkit. If you have ideas for AI governance tools that could benefit the community, we'd love to hear from you!
              </p>
            </div>
            <a
              href="mailto:ultimateaigovernanceframework@proton.me"
              className="mt-8 inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-3 text-base font-semibold text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-200"
            >
              <EnvelopeIcon className="mr-2 h-5 w-5" />
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </main>
  );
} 