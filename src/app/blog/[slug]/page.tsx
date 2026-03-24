import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Container from '@/components/ui/Container'
import BlogPostContent from '@/components/blog/BlogPostContent'
import PostCard from '@/components/blog/PostCard'
import postsData from '@/lib/data/blog-posts.json'
import type { BlogPost } from '@/types'

const posts = postsData as BlogPost[]

function findPost(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = findPost(slug)
  if (!post) {
    return { title: 'Post Not Found | Korea Travel Blog | Discover Korea' }
  }
  return {
    title: `${post.title} | Korea Travel Blog | Discover Korea`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = findPost(slug)

  if (!post) {
    notFound()
  }

  // Related posts: same category or shared tags, excluding current post
  const relatedPosts = posts
    .filter(
      (p) =>
        p.slug !== post.slug &&
        (p.category === post.category || p.tags.some((t) => post.tags.includes(t)))
    )
    .slice(0, 3)

  // Fallback: just take the first 3 other posts if no related ones
  const morePosts =
    relatedPosts.length > 0
      ? relatedPosts
      : posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <div className="min-h-screen pb-20">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent" aria-hidden="true" />

      <section className="py-12 sm:py-16">
        <Container>
          <BlogPostContent post={post} />
        </Container>
      </section>

      {/* More Stories */}
      {morePosts.length > 0 && (
        <section className="py-12 bg-surface/50 border-t border-surface">
          <Container>
            <h2 className="font-poppins text-2xl font-bold text-primary mb-6">
              More Stories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {morePosts.map((relPost) => (
                <PostCard key={relPost.slug} post={relPost} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  )
}
