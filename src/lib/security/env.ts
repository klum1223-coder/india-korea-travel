/**
 * Server-side environment variable validation.
 *
 * This module MUST only be imported in server-side code (API routes,
 * Server Components, middleware). Never import it in client components.
 *
 * At build/startup time it warns about missing recommended secrets so
 * issues surface in logs rather than at runtime during a real request.
 */

// ─── Server-only secrets ─────────────────────────────────────────────────────
// These variables must NEVER have a NEXT_PUBLIC_ prefix.

export const SERVER_ENV = {
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  NEWSLETTER_API_SECRET: process.env.NEWSLETTER_API_SECRET,
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  NAVER_BLOG_ID: process.env.NAVER_BLOG_ID,
  NAVER_CLIENT_ID: process.env.NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET: process.env.NAVER_CLIENT_SECRET,
} as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns true when the current execution context is the server.
 * Useful as a guard in shared modules.
 */
export function isServerSide(): boolean {
  return typeof window === 'undefined'
}

/**
 * Asserts that the given environment variable is present and non-empty.
 * Throws an error (caught by Next.js and surfaced as a 500) if missing.
 */
export function requireEnv(key: keyof typeof SERVER_ENV): string {
  const value = SERVER_ENV[key]
  if (!value) {
    throw new Error(
      `Missing required server environment variable: ${key}. ` +
        'Please add it to .env.local or your deployment environment.'
    )
  }
  return value
}

/**
 * Returns true when the variable is present and non-empty, false otherwise.
 * Use this when the variable is optional (graceful degradation).
 */
export function hasEnv(key: keyof typeof SERVER_ENV): boolean {
  return Boolean(SERVER_ENV[key])
}

// ─── Startup validation (runs once per cold start) ───────────────────────────

const RECOMMENDED: Array<keyof typeof SERVER_ENV> = [
  'ANTHROPIC_API_KEY',
  'NEWSLETTER_API_SECRET',
]

if (isServerSide()) {
  for (const key of RECOMMENDED) {
    if (!SERVER_ENV[key]) {
      console.warn(
        `[Security] Recommended environment variable "${key}" is not set. ` +
          'Some features may be unprotected or non-functional.'
      )
    }
  }
}
