import type { NextRequest } from 'next/server'
import { publishToNaverBlog } from '@/lib/naver/blog-publisher'
import { fetchNaverBlogPosts } from '@/lib/naver/blog-fetcher'
import { getAllPosts } from '@/lib/ai/blog-store'

// ---------------------------------------------------------------------------
// POST /api/naver/publish
// Body: { postSlug: string }
// Finds the post in the in-memory store and publishes it to Naver Blog.
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

  const posts = getAllPosts()
  const post = posts.find((p) => p.slug === postSlug.trim())

  if (!post) {
    return Response.json(
      { success: false, error: 'Blog post not found.' },
      { status: 404 }
    )
  }

  if (post.naverBlogUrl) {
    return Response.json(
      { success: false, error: 'This post has already been published to Naver Blog.', naverBlogUrl: post.naverBlogUrl },
      { status: 409 }
    )
  }

  const result = await publishToNaverBlog(post)
  const status = result.success ? 200 : 502
  return Response.json(result, { status })
}

// ---------------------------------------------------------------------------
// GET /api/naver/publish
// Returns the latest posts from the configured Naver Blog RSS feed.
// ---------------------------------------------------------------------------

export async function GET() {
  const blogId = process.env.NAVER_BLOG_ID

  if (!blogId) {
    return Response.json(
      { error: 'NAVER_BLOG_ID not configured.' },
      { status: 400 }
    )
  }

  const posts = await fetchNaverBlogPosts(blogId, 3)
  return Response.json(posts)
}
