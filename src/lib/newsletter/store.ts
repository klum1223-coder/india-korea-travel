// ─── Newsletter Subscriber Store ─────────────────────────────────────────────
// In-memory storage using a Set. Data is lost on server restart.
//
// PRODUCTION UPGRADE GUIDE:
// Replace this module with a database-backed implementation.
// Recommended options:
//   - Vercel KV (Redis) — import { kv } from '@vercel/kv'
//   - Supabase — use the Supabase client with a `subscribers` table
//   - Prisma + PostgreSQL — model: Subscriber { id, email, createdAt }
// All four functions below have the same signatures, so swapping is seamless.

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// In-memory store — survives the process lifetime only
const subscribers = new Set<string>()

function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim().toLowerCase())
}

export async function addSubscriber(
  email: string
): Promise<{ success: boolean; message: string; alreadyExists?: boolean }> {
  const normalised = email.trim().toLowerCase()

  if (!isValidEmail(normalised)) {
    return { success: false, message: 'Invalid email address.' }
  }

  if (subscribers.has(normalised)) {
    return {
      success: true,
      message: 'Already subscribed.',
      alreadyExists: true,
    }
  }

  subscribers.add(normalised)
  return { success: true, message: 'Successfully subscribed!' }
}

export async function removeSubscriber(email: string): Promise<boolean> {
  const normalised = email.trim().toLowerCase()
  return subscribers.delete(normalised)
}

export async function getSubscribers(): Promise<string[]> {
  return Array.from(subscribers)
}

export async function getSubscriberCount(): Promise<number> {
  return subscribers.size
}
