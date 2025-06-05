import { Metadata } from 'next';
import { blogPosts } from '@/data/blog-data';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found - AI Governance Framework',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: `${post.title} - AI Governance Framework`,
    description: post.description,
    openGraph: {
      title: `${post.title} - AI Governance Framework`,
      description: post.description,
      type: 'article',
      url: `https://ultimateaigovernanceframework.vercel.app/blog/${post.slug}`,
      images: [
        {
          url: post.heroImage,
          width: 1200,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} - AI Governance Framework`,
      description: post.description,
      images: [post.heroImage],
    },
  };
} 