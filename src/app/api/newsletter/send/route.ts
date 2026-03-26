import type { NextRequest } from 'next/server'
import { getSubscribers, getSubscriberCount } from '@/lib/newsletter/store'
import {
  sendNewsletter,
  generateBlogNewsletterHtml,
} from '@/lib/newsletter/sender'
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limiter'

// ─── POST /api/newsletter/send ────────────────────────────────────────────────
// Body: { title: string; excerpt: string; slug: string }
// Sends a new-blog-post notification to all subscribers.
//
// Authentication (required — not optional):
//   Set NEWSLETTER_API_SECRET in env.
//   Pass header: Authorization: Bearer <secret>
//   Requests without a valid secret are rejected with 401.

export async function POST(request: NextRequest) {
  // ── Auth: NEWSLETTER_API_SECRET is required ───────────────────────────────
  const secret = process.env.NEWSLETTER_API_SECRET
  if (!secret) {
    // Secret not configured → endpoint is disabled
    return Response.json(
      { success: false, error: 'Newsletter send endpoint is not configured.' },
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

  // ── Rate limiting: 10 sends per hour per IP (generous but bounded) ────────
  const ip = getClientIp(request)
  const rateLimit = checkRateLimit(`newsletter-send:${ip}`, 10, 60 * 60_000)
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
  let body: { title?: string; excerpt?: string; slug?: string }
  try {
    body = (await request.json()) as {
      title?: string
      excerpt?: string
      slug?: string
    }
  } catch {
    return Response.json(
      { success: false, error: 'Invalid JSON body.' },
      { status: 400 }
    )
  }

  const { title, excerpt, slug } = body

  if (!title || !excerpt || !slug) {
    return Response.json(
      { success: false, error: 'title, excerpt, and slug are required.' },
      { status: 400 }
    )
  }

  const subscribers = await getSubscribers()

  if (subscribers.length === 0) {
    return Response.json({
      success: true,
      message: 'No subscribers — nothing sent.',
      sent: 0,
      failed: 0,
    })
  }

  const htmlContent = generateBlogNewsletterHtml({ title, excerpt, slug })
  const subject = `New Article: ${title}`

  const { sent, failed } = await sendNewsletter(subject, htmlContent, subscribers)

  return Response.json({
    success: true,
    message: `Newsletter dispatched. Sent: ${sent}, Failed: ${failed}.`,
    sent,
    failed,
  })
}

// ─── GET /api/newsletter/send ─────────────────────────────────────────────────
// Returns the current subscriber count. Requires auth to prevent info leakage.

export async function GET(request: NextRequest) {
  const secret = process.env.NEWSLETTER_API_SECRET
  if (secret) {
    const authHeader = request.headers.get('authorization') ?? ''
    const token = authHeader.replace(/^Bearer\s+/i, '').trim()
    if (!token || token !== secret) {
      return Response.json({ success: false, error: 'Unauthorized.' }, { status: 401 })
    }
  }

  const count = await getSubscriberCount()
  return Response.json({ success: true, count })
}
