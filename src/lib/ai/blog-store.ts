import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import type { BlogPost } from '@/types'

// Path is resolved relative to the project root at runtime
const DATA_FILE = join(process.cwd(), 'src', 'lib', 'data', 'blog-posts.json')

function readPosts(): BlogPost[] {
  try {
    const raw = readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(raw) as BlogPost[]
  } catch {
    return []
  }
}

function writePosts(posts: BlogPost[]): void {
  writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2), 'utf-8')
}

/**
 * Returns all blog posts, sorted by publishedAt descending (newest first).
 */
export function getAllPosts(): BlogPost[] {
  const posts = readPosts()
  return posts.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
}

/**
 * Returns a single post by its slug, or undefined if not found.
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return readPosts().find((p) => p.slug === slug)
}

/**
 * Adds a new post to the store. Throws if a post with the same slug already exists.
 */
export function addPost(post: BlogPost): void {
  const posts = readPosts()
  if (posts.some((p) => p.slug === post.slug)) {
    throw new Error(`A post with slug "${post.slug}" already exists.`)
  }
  posts.unshift(post) // newest first in the file
  writePosts(posts)
}

/**
 * Returns the single most-viewed post across all categories.
 * Falls back to the most recently published post if the store is empty.
 */
export function getFeaturedPost(): BlogPost | undefined {
  const posts = readPosts()
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
  let posts = getAllPosts()
  if (category) {
    posts = posts.filter((p) => p.category === category)
  }
  return posts.slice(0, limit)
}
