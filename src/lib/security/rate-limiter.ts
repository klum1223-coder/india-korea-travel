/**
 * In-memory rate limiter for Next.js API routes.
 *
 * NOTE: Each Vercel Serverless Function instance has its own memory,
 * so limits are per-instance rather than globally coordinated.
 * This still prevents most abuse from a single client against one cold instance.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

// Global map shared across requests within the same serverless instance
const store = new Map<string, RateLimitEntry>()

// Periodically clean up expired entries to avoid memory leaks
// (runs at most once per 5 minutes per instance)
let lastCleanup = Date.now()
function maybeCleanup() {
  const now = Date.now()
  if (now - lastCleanup < 5 * 60 * 1000) return
  lastCleanup = now
  for (const [key, entry] of store.entries()) {
    if (now >= entry.resetAt) store.delete(key)
  }
}

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetAt: number
}

/**
 * Check whether the given key (typically an IP address) is within the
 * allowed request budget for the current time window.
 *
 * @param key        - Unique identifier, usually the client IP
 * @param maxRequests - Maximum number of requests allowed per window
 * @param windowMs   - Window duration in milliseconds (default: 60 000)
 */
export function checkRateLimit(
  key: string,
  maxRequests: number,
  windowMs = 60_000
): RateLimitResult {
  maybeCleanup()

  const now = Date.now()
  const existing = store.get(key)

  if (!existing || now >= existing.resetAt) {
    // Start a new window
    const entry: RateLimitEntry = { count: 1, resetAt: now + windowMs }
    store.set(key, entry)
    return { allowed: true, remaining: maxRequests - 1, resetAt: entry.resetAt }
  }

  existing.count += 1

  if (existing.count > maxRequests) {
    return { allowed: false, remaining: 0, resetAt: existing.resetAt }
  }

  return {
    allowed: true,
    remaining: maxRequests - existing.count,
    resetAt: existing.resetAt,
  }
}

/**
 * Extract the best-guess client IP from a Next.js request.
 * Falls back to '127.0.0.1' when running locally or when headers are absent.
 */
export function getClientIp(request: Request): string {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    '127.0.0.1'
  )
}
