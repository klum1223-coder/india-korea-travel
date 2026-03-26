import type { NextRequest } from 'next/server'
import { getSubscribers, getSubscriberCount } from '@/lib/newsletter/store'
import {
  sendNewsletter,
  generateBlogNewsletterHtml,
} from '@/lib/newsletter/sender'

// ─── POST /api/newsletter/send ────────────────────────────────────────────────
// Body: { title: string; excerpt: string; slug: string }
// Sends a new-blog-post notification to all subscribers.
//
// Optional API key protection:
//   Set NEWSLETTER_API_SECRET in env.
//   Pass header: Authorization: Bearer <secret>
//   If the env var is not set, the endpoint is unprotected (development).

export async function POST(request: NextRequest) {
  // API key guard (optional)
  const secret = process.env.NEWSLETTER_API_SECRET
  if (secret) {
    const authHeader = request.headers.get('authorization') ?? ''
    const token = authHeader.replace(/^Bearer\s+/i, '').trim()
    if (token !== secret) {
      return Response.json(
        { success: false, error: 'Unauthorized.' },
        { status: 401 }
      )
    }
  }

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
// Returns the current subscriber count (no auth required).

export async function GET() {
  const count = await getSubscriberCount()
  return Response.json({ success: true, count })
}
