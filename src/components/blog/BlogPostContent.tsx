import Image from 'next/image'
import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import ShareButtons from '@/components/blog/ShareButtons'
import type { BlogPost } from '@/types'
import { sanitizeHtml } from '@/lib/security/sanitize'

const categoryLabels: Record<BlogPost['category'], string> = {
  'todays-korea': "Today's Korea",
  'travel-story': 'Travel Story',
  'seasonal': 'Seasonal',
  'k-culture': 'K-Culture',
  'student-tips': 'Student Tips',
  'school-spotlight': 'School Spotlight',
}

function categoryBadgeVariant(cat: BlogPost['category']): 'default' | 'success' | 'info' {
  if (cat === 'todays-korea') return 'success'
  if (cat === 'k-culture') return 'info'
  return 'default'
}

interface BlogPostContentProps {
  post: BlogPost
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="max-w-3xl mx-auto">
      {/* Back link */}
      <div className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors duration-200 text-sm font-medium group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <Badge variant={categoryBadgeVariant(post.category)}>
            {categoryLabels[post.category]}
          </Badge>
        </div>

        <h1 className="font-poppins text-3xl sm:text-4xl font-bold text-primary leading-tight mb-3">
          {post.title}
        </h1>

        {post.titleKo && (
          <p className="text-text-secondary/70 text-base mb-4 font-medium">{post.titleKo}</p>
        )}

        <div className="flex flex-wrap items-center gap-3 text-sm text-text-secondary/70 mb-5">
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formattedDate}
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {post.readTime} min read
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {post.viewCount.toLocaleString('en-IN')} views
          </span>
        </div>

        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full bg-surface text-text-secondary text-xs font-medium">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Hero image */}
      <div className="relative rounded-2xl aspect-video overflow-hidden mb-10 border border-surface">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
            priority
          />
        ) : (
          <div className="bg-gradient-to-br from-primary/10 via-surface to-secondary/10 w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Body */}
      <div
        className="prose-content max-w-3xl mb-12"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.body) }}
      />

      {/* Related package CTA */}
      {post.relatedPackageSlug && (
        <div className="rounded-2xl bg-primary/5 border border-primary/15 p-6 mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h4 className="font-poppins font-bold text-primary text-base mb-1">
                Planning a Korea School Trip?
              </h4>
              <p className="text-text-secondary text-sm">
                This story is connected to one of our tour packages. Explore the full itinerary and pricing.
              </p>
            </div>
            <Link
              href={`/packages/${post.relatedPackageSlug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-white font-semibold text-sm hover:bg-secondary/90 transition-colors duration-200 whitespace-nowrap shadow-sm"
            >
              View Tour Package
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      )}

      {/* Share buttons */}
      <div className="border-t border-surface pt-8 mb-10">
        <p className="text-sm font-semibold text-text-secondary mb-3">Share this article</p>
        <ShareButtons title={post.title} />
      </div>

      {/* Naver Blog link if available */}
      {post.naverBlogUrl && (
        <div className="rounded-xl bg-surface border border-surface/80 p-4 flex items-center gap-3 mb-10">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#03C75A] text-white text-sm font-bold select-none shrink-0">
            N
          </span>
          <div className="flex-grow">
            <p className="text-sm text-text-secondary">
              Read this article in Korean on our Naver Blog
            </p>
          </div>
          <a
            href={post.naverBlogUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#03C75A] font-semibold text-sm hover:underline whitespace-nowrap"
          >
            Visit →
          </a>
        </div>
      )}
    </article>
  )
}
