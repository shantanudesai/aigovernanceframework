'use client';

import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Toast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Show toast after a short delay
    const showTimer = setTimeout(() => {
      setShow(true);
      // Add highlight class to Tools menu item
      const toolsLink = document.querySelector('a[href="/tools"]');
      if (toolsLink) {
        toolsLink.classList.add('text-sky-600', 'font-semibold');
      }
    }, 1000);

    // Hide toast after 5 seconds
    const hideTimer = setTimeout(() => {
      setShow(false);
      // Remove highlight class from Tools menu item
      const toolsLink = document.querySelector('a[href="/tools"]');
      if (toolsLink) {
        toolsLink.classList.remove('text-sky-600', 'font-semibold');
      }
    }, 6000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      // Cleanup: ensure we remove the highlight if component unmounts
      const toolsLink = document.querySelector('a[href="/tools"]');
      if (toolsLink) {
        toolsLink.classList.remove('text-sky-600', 'font-semibold');
      }
    };
  }, []);

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div className="p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <InformationCircleIcon className="h-5 w-5 text-sky-400" aria-hidden="true" />
                </div>
                <div className="ml-3 w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Check out our AI Governance Tools!
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Explore our arsenal of tools designed to help you implement effective AI governance.
                  </p>
                  <div className="mt-2">
                    <Link
                      href="/tools"
                      className="text-sm font-medium text-sky-600 hover:text-sky-500"
                    >
                      View Tools →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
} 