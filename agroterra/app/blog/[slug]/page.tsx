import { blogPosts } from '@/data/blogData'
import { notFound } from 'next/navigation'
import BlogDetailClient from './BlogDetailClient'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)
  if (!post) notFound()

  const related = blogPosts.filter((p) => p.slug !== slug).slice(0, 3)

  return <BlogDetailClient post={post} related={related} />
}