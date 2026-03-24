import type { BlogPost } from '@/types'
import postsData from '../data/blog-posts.json'

// In-memory store seeded from static JSON at module load time.
// New posts added via addPost() live only for the lifetime of the server process,
// which is acceptable for a serverless/demo deployment where the filesystem is read-only.
let posts: BlogPost[] = postsData as BlogPost[]

/**
 * Returns all blog posts, sorted by publishedAt descending (newest first).
 */
export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

/**
 * Returns a single post by its slug, or undefined if not found.
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug)
}

/**
 * Adds a new post to the in-memory store. Throws if a post with the same slug already exists.
 */
export function addPost(post: BlogPost): void {
  if (posts.some((p) => p.slug === post.slug)) {
    throw new Error(`A post with slug "${post.slug}" already exists.`)
  }
  posts = [post, ...posts]
}

/**
 * Returns the single most-viewed post across all categories.
 * Falls back to the most recently published post if the store is empty.
 */
export function getFeaturedPost(): BlogPost | undefined {
  if (posts.length === 0) return undefined
  return posts.reduce((top, p) => (p.viewCount > top.viewCount ? p : top), posts[0])
}

/**
 * Returns the most recently published posts, up to `limit`.
 * Optionally filters by category.
 */
export function getRecentPosts(
  limit: number = 10,
  category?: BlogPost['category']
): BlogPost[] {
  let result = getAllPosts()
  if (category) {
    result = result.filter((p) => p.category === category)
  }
  return result.slice(0, limit)
}
