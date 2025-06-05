import Link from 'next/link';
import { ArrowLeftIcon, CalendarIcon, UserIcon, ClockIcon } from '@heroicons/react/24/outline';
import { blogPosts } from '@/data/blog-data';
import Image from 'next/image';

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

        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-16">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6 font-heading">
              Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Insights and guides on AI governance, information security, and regulatory compliance.
            </p>
          </header>

          <div className="space-y-16">
            {blogPosts.map((post) => (
              <article key={post.id} className="relative bg-white rounded-xl shadow-lg overflow-hidden">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative w-full aspect-[2/1]">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-8">
                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 mr-2" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-2" />
                      {post.readingTime}
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 font-heading">
                    <Link href={`/blog/${post.slug}`} className="hover:text-sky-600">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3">{post.description}</p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center text-sky-600 hover:text-sky-700 font-medium"
                  >
                    Read article
                    <ArrowLeftIcon className="ml-2 h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
} 