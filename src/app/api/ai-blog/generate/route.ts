import type { NextRequest } from 'next/server'
import type { ContentType } from '@/lib/ai/prompts'
import { generateBlogPost, getCurrentSeason } from '@/lib/ai/content-generator'
import { checkContentQuality } from '@/lib/ai/quality-check'
import { addPost, getRecentPosts } from '@/lib/ai/blog-store'
import type { BlogPost } from '@/types'
import { getSubscribers } from '@/lib/newsletter/store'
import {
  sendNewsletter,
  generateBlogNewsletterHtml,
} from '@/lib/newsletter/sender'
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limiter'

// ─── POST /api/ai-blog/generate ─────────────────────────────────────────────
// Body: { contentType: ContentType, topic?: string }
// Generates a blog post via AI, quality-checks it, and persists it.
//
// Authentication (required):
//   Set AI_BLOG_API_SECRET in env.
//   Pass header: Authorization: Bearer <secret>
//   Without a valid secret, the endpoint returns 401.

const VALID_CONTENT_TYPES: ContentType[] = [
  'todays-korea',
  'travel-story',
  'seasonal',
  'k-culture',
  'student-tips',
  'school-spotlight',
]

export async function POST(request: NextRequest) {
  // ── Auth guard ────────────────────────────────────────────────────────────
  // Protects Anthropic API credits from unauthorised callers.
  const secret = process.env.AI_BLOG_API_SECRET
  if (!secret) {
    // No secret configured → endpoint is disabled for safety
    return Response.json(
      { success: false, error: 'AI blog generation endpoint is not configured.' },
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

  // ── Rate limiting: 5 generations per hour per IP ──────────────────────────
  const ip = getClientIp(request)
  const rateLimit = checkRateLimit(`ai-blog-generate:${ip}`, 5, 60 * 60_000)
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
  let body: { contentType?: ContentType; topic?: string }
  try {
    body = (await request.json()) as { contentType?: ContentType; topic?: string }
  } catch {
    return Response.json(
      { success: false, error: 'Invalid JSON body.' },
      { status: 400 }
    )
  }

  const { contentType, topic } = body

  if (!contentType || !VALID_CONTENT_TYPES.includes(contentType)) {
    return Response.json(
      {
        success: false,
        error: `contentType is required and must be one of: ${VALID_CONTENT_TYPES.join(', ')}.`,
      },
      { status: 400 }
    )
  }

  const now = new Date()

  const result = await generateBlogPost({
    contentType,
    currentDate: now.toISOString().split('T')[0],
    currentSeason: getCurrentSeason(now),
    topic,
  })

  if (!result.success || !result.post) {
    return Response.json(
      { success: false, error: result.error ?? 'Content generation failed.' },
      { status: 500 }
    )
  }

  // Quality gate
  const quality = checkContentQuality(result.post)
  if (!quality.passed) {
    return Response.json(
      {
        success: false,
        error: 'Generated content failed quality check.',
        issues: quality.issues,
      },
      { status: 422 }
    )
  }

  // Persist
  try {
    addPost(result.post)
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return Response.json(
      { success: false, error: `Failed to save post: ${message}` },
      { status: 500 }
    )
  }

  // Send newsletter to subscribers (fire-and-forget — errors are logged, not fatal)
  try {
    const subscribers = await getSubscribers()
    if (subscribers.length > 0) {
      const { title, excerpt, slug } = result.post
      const htmlContent = generateBlogNewsletterHtml({ title, excerpt, slug })
      const subject = `New Article: ${title}`
      const { sent, failed } = await sendNewsletter(subject, htmlContent, subscribers)
      console.log(`[Newsletter] Post "${title}" — sent: ${sent}, failed: ${failed}`)
    }
  } catch (newsletterErr) {
    console.error('[Newsletter] Failed to send newsletter:', newsletterErr)
  }

  return Response.json({ success: true, post: result.post }, { status: 201 })
}

// ─── GET /api/ai-blog/generate ───────────────────────────────────────────────
// Query params:
//   limit    – number of posts to return (default: 10)
//   category – filter by BlogPost category
// No auth required — reading posts is public.

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const limitParam = searchParams.get('limit')
  const limit = limitParam ? Math.max(1, parseInt(limitParam, 10) || 10) : 10

  const categoryParam = searchParams.get('category')
  const validCategories: BlogPost['category'][] = [
    'todays-korea',
    'travel-story',
    'seasonal',
    'k-culture',
    'student-tips',
    'school-spotlight',
  ]

  let category: BlogPost['category'] | undefined
  if (categoryParam) {
    if (!validCategories.includes(categoryParam as BlogPost['category'])) {
      return Response.json(
        {
          success: false,
          error: `Invalid category. Must be one of: ${validCategories.join(', ')}.`,
        },
        { status: 400 }
      )
    }
    category = categoryParam as BlogPost['category']
  }

  const posts = getRecentPosts(limit, category)

  return Response.json({ success: true, posts, count: posts.length })
}
