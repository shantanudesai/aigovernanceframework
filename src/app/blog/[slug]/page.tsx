import BlogPostContent from './BlogPostContent';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  return <BlogPostContent slug={params.slug} />;
} 