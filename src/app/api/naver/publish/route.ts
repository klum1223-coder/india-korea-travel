import type { NextRequest } from 'next/server'
import type { BlogPost } from '@/types'
import { publishToNaverBlog } from '@/lib/naver/blog-publisher'
import { fetchNaverBlogPosts } from '@/lib/naver/blog-fetcher'
import { promises as fs } from 'fs'
import path from 'path'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Absolute path to the blog posts JSON data file. */
const BLOG_POSTS_PATH = path.join(process.cwd(), 'src', 'lib', 'data', 'blog-posts.json')

async function readBlogPosts(): Promise<BlogPost[]> {
  try {
    const raw = await fs.readFile(BLOG_POSTS_PATH, 'utf-8')
    return JSON.parse(raw) as BlogPost[]
  } catch {
    // File does not exist yet — return empty list gracefully
    return []
  }
}

async function writeBlogPosts(posts: BlogPost[]): Promise<void> {
  await fs.writeFile(BLOG_POSTS_PATH, JSON.stringify(posts, null, 2), 'utf-8')
}

// ---------------------------------------------------------------------------
// POST /api/naver/publish
// Body: { postSlug: string }
// Finds the post, publishes it to Naver Blog, and persists the returned URL.
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  let body: { postSlug?: string }

  try {
    body = (await request.json()) as { postSlug?: string }
  } catch {
    return Response.json(
      { success: false, error: 'Invalid JSON body.' },
      { status: 400 }
    )
  }

  const { postSlug } = body

  if (!postSlug || typeof postSlug !== 'string' || postSlug.trim() === '') {
    return Response.json(
      { success: false, error: 'Missing required field: postSlug.' },
      { status: 400 }
    )
  }

  const posts = await readBlogPosts()
  const postIndex = posts.findIndex((p) => p.slug === postSlug.trim())

  if (postIndex === -1) {
    return Response.json(
      { success: false, error: `Blog post not found: ${postSlug}` },
      { status: 404 }
    )
  }

  const post = posts[postIndex]
  const result = await publishToNaverBlog(post)

  if (result.success && result.blogUrl) {
    // Persist the Naver URL back into the data file
    posts[postIndex] = { ...post, naverBlogUrl: result.blogUrl }
    try {
      await writeBlogPosts(posts)
    } catch (err) {
      // Non-fatal: the publish succeeded; just warn about the write failure
      const message = err instanceof Error ? err.message : String(err)
      console.warn('[Naver] Could not persist naverBlogUrl to blog-posts.json:', message)
    }
  }

  const status = result.success ? 200 : 502
  return Response.json(result, { status })
}

// ---------------------------------------------------------------------------
// GET /api/naver/publish
// Returns the latest posts from the configured Naver Blog RSS feed.
// ---------------------------------------------------------------------------

export async function GET() {
  const blogId = process.env.NAVER_BLOG_ID ?? ''
  const posts = await fetchNaverBlogPosts(blogId, 3)
  return Response.json(posts)
}
