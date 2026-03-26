import type { NextRequest } from 'next/server'
import { publishToNaverBlog } from '@/lib/naver/blog-publisher'
import { fetchNaverBlogPosts } from '@/lib/naver/blog-fetcher'
import { getAllPosts } from '@/lib/ai/blog-store'
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limiter'

// ---------------------------------------------------------------------------
// POST /api/naver/publish
// Body: { postSlug: string }
// Finds the post in the in-memory store and publishes it to Naver Blog.
//
// Authentication (required):
//   Set NAVER_PUBLISH_API_SECRET in env.
//   Pass header: Authorization: Bearer <secret>
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // ── Auth guard ────────────────────────────────────────────────────────────
  const secret = process.env.NAVER_PUBLISH_API_SECRET
  if (!secret) {
    return Response.json(
      { success: false, error: 'Naver publish endpoint is not configured.' },
      { status: 503 }
    )
  }

  const authHeader = request.headers.get('authorization') ?? ''
  const token = authHeader.replace(/^Bearer\s+/i, '').trim()
  if (!token || token !== secret) {
    return Response.json(
      { success: false, error: 'Unauthorized.' },
      { status: 401 }
    )
  }

  // ── Rate limiting: 20 publishes per hour per IP ───────────────────────────
  const ip = getClientIp(request)
  const rateLimit = checkRateLimit(`naver-publish:${ip}`, 20, 60 * 60_000)
  if (!rateLimit.allowed) {
    return Response.json(
      { success: false, error: 'Rate limit exceeded. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) },
      }
    )
  }

  // ── Parse body ────────────────────────────────────────────────────────────
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
      {
        success: false,
        error: 'This post has already been published to Naver Blog.',
        naverBlogUrl: post.naverBlogUrl,
      },
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
// No auth required — this is public-facing read data.
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
