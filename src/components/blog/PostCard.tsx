import Link from 'next/link'
import Image from 'next/image'
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

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
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
      {/* Image area */}
      <div className="aspect-video relative flex-shrink-0 overflow-hidden">
        {post.thumbnail ? (
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="bg-gradient-to-br from-primary/8 via-surface to-secondary/8 w-full h-full flex items-center justify-center">
            <svg className="w-10 h-10 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
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
          {stripHtml(post.excerpt)}
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
