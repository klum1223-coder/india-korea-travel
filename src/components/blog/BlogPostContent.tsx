import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import type { BlogPost } from '@/types'

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

      {/* Hero placeholder image */}
      <div className="bg-gradient-to-br from-primary/10 via-surface to-secondary/10 rounded-2xl aspect-video flex items-center justify-center mb-10 border border-surface">
        <svg className="w-16 h-16 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Body */}
      <div
        className="prose-content max-w-3xl mb-12"
        dangerouslySetInnerHTML={{ __html: post.body }}
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
        <div className="flex flex-wrap gap-3">
          {/* WhatsApp */}
          <div
            role="button"
            aria-label="Share on WhatsApp"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp
          </div>

          {/* Facebook */}
          <div
            role="button"
            aria-label="Share on Facebook"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1877F2] text-white text-sm font-semibold cursor-pointer hover:opacity-90 transition-opacity duration-200"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Facebook
          </div>

          {/* Copy link */}
          <div
            role="button"
            aria-label="Copy link to clipboard"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-surface border border-surface text-text-secondary text-sm font-semibold cursor-pointer hover:bg-primary/5 hover:text-primary transition-colors duration-200"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
            </svg>
            Copy Link
          </div>
        </div>
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
