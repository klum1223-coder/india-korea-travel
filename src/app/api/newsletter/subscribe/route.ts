import type { NextRequest } from 'next/server'
import { addSubscriber, removeSubscriber } from '@/lib/newsletter/store'

// ─── POST /api/newsletter/subscribe ──────────────────────────────────────────
// Body: { email: string }
// Subscribes an email address. Returns 200 even if already subscribed.

export async function POST(request: NextRequest) {
  let body: { email?: string }

  try {
    body = (await request.json()) as { email?: string }
  } catch {
    return Response.json(
      { success: false, error: 'Invalid JSON body.' },
      { status: 400 }
    )
  }

  const email = body.email?.trim()

  if (!email) {
    return Response.json(
      { success: false, error: 'email is required.' },
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

  const email = body.email?.trim()

  if (!email) {
    return Response.json(
      { success: false, error: 'email is required.' },
      { status: 400 }
    )
  }

  const removed = await removeSubscriber(email)

  return Response.json({
    success: true,
    message: removed ? 'Unsubscribed successfully.' : 'Email not found.',
  })
}
