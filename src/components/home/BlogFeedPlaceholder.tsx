import AILiveFeed from '@/components/blog/AILiveFeed'
import postsData from '@/lib/data/blog-posts.json'
import type { BlogPost } from '@/types'

const posts = postsData as BlogPost[]

export default function BlogFeedPlaceholder() {
  return <AILiveFeed posts={posts} />
}
