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

interface FeaturedPostCardProps {
  post: BlogPost | null
}

export default function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  if (!post) {
    return (
      <div className="rounded-2xl border border-surface bg-white shadow-sm p-10 text-center text-text-secondary">
        <p className="font-poppins text-lg font-semibold mb-2">No posts yet</p>
        <p className="text-sm">Fresh Korea travel stories are on their way — check back soon.</p>
      </div>
    )
  }

  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <article className="rounded-2xl overflow-hidden border border-surface bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Placeholder image area */}
        <div className="bg-gradient-to-br from-primary/10 via-surface to-secondary/10 aspect-video md:aspect-auto md:min-h-64 flex items-center justify-center relative">
          <div className="text-center px-6">
            <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-primary/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-text-secondary/50 uppercase tracking-widest">Featured Story</span>
          </div>
          {/* AI badge */}
          {post.isAIGenerated && (
            <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/90 text-white text-xs font-bold">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              AI Live
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <Badge variant={categoryBadgeVariant(post.category)}>
                {categoryLabels[post.category]}
              </Badge>
              <span className="text-xs text-text-secondary/60">{formattedDate}</span>
              <span className="text-xs text-text-secondary/50">{post.readTime} min read</span>
            </div>

            <h3 className="font-poppins text-2xl font-bold text-primary leading-snug mb-3 line-clamp-3">
              {post.title}
            </h3>

            <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 mb-4">
              {post.excerpt}
            </p>

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-5">
                {post.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-surface text-text-secondary text-xs font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center gap-1.5 text-secondary font-semibold text-sm hover:text-secondary/80 transition-colors duration-200 group"
            >
              Read Full Story
              <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
            </Link>

            {/* Related package CTA */}
            {post.relatedPackageSlug && (
              <Link
                href={`/packages/${post.relatedPackageSlug}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary text-xs font-semibold hover:bg-secondary/20 transition-colors duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                View Related Tour Package
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
