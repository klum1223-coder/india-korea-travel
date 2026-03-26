import type { NextRequest } from 'next/server'
import { addSubscriber, removeSubscriber } from '@/lib/newsletter/store'
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limiter'
import { sanitizeEmail, isValidEmail } from '@/lib/security/sanitize'

// ─── POST /api/newsletter/subscribe ──────────────────────────────────────────
// Body: { email: string; _hp?: string }
// Subscribes an email address. Returns 200 even if already subscribed.

export async function POST(request: NextRequest) {
  // ── Rate limiting: 3 requests per minute per IP ───────────────────────────
  const ip = getClientIp(request)
  const rateLimit = checkRateLimit(`newsletter-subscribe:${ip}`, 3, 60_000)
  if (!rateLimit.allowed) {
    return Response.json(
      { success: false, error: 'Too many requests. Please wait a moment and try again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) },
      }
    )
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let body: { email?: string; _hp?: string }
  try {
    body = (await request.json()) as { email?: string; _hp?: string }
  } catch {
    return Response.json(
      { success: false, error: 'Invalid JSON body.' },
      { status: 400 }
    )
  }

  // ── Honeypot check ────────────────────────────────────────────────────────
  if (body._hp && String(body._hp).trim() !== '') {
    // Silently succeed to not reveal the bot check
    return Response.json({ success: true, message: 'Thank you for subscribing!' })
  }

  // ── Email validation ──────────────────────────────────────────────────────
  const rawEmail = body.email?.trim()
  if (!rawEmail) {
    return Response.json(
      { success: false, error: 'email is required.' },
      { status: 400 }
    )
  }

  const email = sanitizeEmail(rawEmail)
  if (!isValidEmail(email)) {
    return Response.json(
      { success: false, error: 'Please enter a valid email address.' },
      { status: 400 }
    )
  }

  const result = await addSubscriber(email)

  if (!result.success) {
    return Response.json(
      { success: false, error: result.message },
      { status: 400 }
    )
  }

  // Both "new" and "already subscribed" are treated as successes on the client
  return Response.json({ success: true, message: result.message })
}

// ─── DELETE /api/newsletter/subscribe ────────────────────────────────────────
// Body: { email: string }
// Unsubscribes an email address.

export async function DELETE(request: NextRequest) {
  let body: { email?: string }
  try {
    body = (await request.json()) as { email?: string }
  } catch {
    return Response.json(
      { success: false, error: 'Invalid JSON body.' },
      { status: 400 }
    )
  }

  const rawEmail = body.email?.trim()
  if (!rawEmail) {
    return Response.json(
      { success: false, error: 'email is required.' },
      { status: 400 }
    )
  }

  const email = sanitizeEmail(rawEmail)
  if (!isValidEmail(email)) {
    return Response.json(
      { success: false, error: 'Please enter a valid email address.' },
      { status: 400 }
    )
  }

  const removed = await removeSubscriber(email)

  return Response.json({
    success: true,
    message: removed ? 'Unsubscribed successfully.' : 'Email not found.',
  })
}
