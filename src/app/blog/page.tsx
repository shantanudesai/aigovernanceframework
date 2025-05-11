'use client';

import Link from 'next/link';
import { ArrowLeftIcon, NewspaperIcon } from '@heroicons/react/24/outline';

export default function Blog() {
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

        <div className="flex flex-col items-center justify-center text-center py-20">
          <NewspaperIcon className="h-20 w-20 text-gray-400 mb-8" />
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-6">
            Blog Coming Soon!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            We're working on bringing you insightful articles about AI governance, best practices, and industry trends. Stay tuned!
          </p>
        </div>
      </div>
    </main>
  );
} 