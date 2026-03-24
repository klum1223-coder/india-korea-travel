import Link from 'next/link'
import Badge from '@/components/ui/Badge'
import { clsx } from '@/lib/cn'
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

interface PostCardProps {
  post: BlogPost
  className?: string
}

export default function PostCard({ post, className }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  return (
    <article
      className={clsx(
        'bg-white rounded-2xl overflow-hidden border border-surface shadow-sm',
        'hover:shadow-md hover:-translate-y-1 transition-all duration-300',
        'flex flex-col',
        className
      )}
    >
      {/* Placeholder image area */}
      <div className="bg-gradient-to-br from-primary/8 via-surface to-secondary/8 aspect-video relative flex items-center justify-center flex-shrink-0">
        <svg className="w-10 h-10 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        {post.isAIGenerated && (
          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-primary/90 text-white text-xs font-bold">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            AI
          </span>
        )}
      </div>

      {/* Card content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <Badge variant={categoryBadgeVariant(post.category)}>
            {categoryLabels[post.category]}
          </Badge>
        </div>

        <h3 className="font-poppins text-lg font-bold text-primary leading-snug mb-2 line-clamp-2 flex-grow">
          {post.title}
        </h3>

        <p className="text-text-secondary text-xs leading-relaxed line-clamp-2 mb-3">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 text-xs text-text-secondary/60 mb-4">
          <span>{formattedDate}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime} min read</span>
        </div>

        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-secondary font-semibold text-sm hover:text-secondary/80 transition-colors duration-200 mt-auto group"
          aria-label={`Read ${post.title}`}
        >
          Read
          <span className="group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  )
}
