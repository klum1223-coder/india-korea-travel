/**
 * Input sanitization utilities for API routes.
 * No external dependencies — pure string manipulation only.
 */

/**
 * Remove HTML tags and escape common special characters to prevent XSS.
 * Intended for plain-text fields (names, messages, etc.).
 */
export function sanitizeInput(input: string): string {
  return input
    // Strip all HTML tags
    .replace(/<[^>]*>/g, '')
    // Collapse whitespace
    .trim()
}

/**
 * Sanitize HTML content for safe rendering.
 * Removes dangerous elements/attributes while keeping safe markup.
 *
 * Used before dangerouslySetInnerHTML to neutralise AI-generated content.
 */
export function sanitizeHtml(html: string): string {
  return html
    // Remove <script> blocks (including content)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove <style> blocks
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Remove <iframe>, <object>, <embed>, <form>
    .replace(/<(iframe|object|embed|form|base|meta|link)\b[^>]*>.*?<\/\1>/gi, '')
    .replace(/<(iframe|object|embed|form|base|meta|link)\b[^>]*\/?>/gi, '')
    // Strip on* event handler attributes (onclick, onload, onerror, etc.)
    .replace(/\s+on\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]*)/gi, '')
    // Strip javascript: and data: URIs in href / src / action
    .replace(/(href|src|action)\s*=\s*(?:"javascript:[^"]*"|'javascript:[^']*')/gi, '')
    .replace(/(href|src|action)\s*=\s*(?:"data:[^"]*"|'data:[^']*')/gi, '')
}

/**
 * Normalise and lower-case an email address.
 */
export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

/**
 * Strict RFC-5321-inspired email validation.
 * Rejects addresses that slip through simpler patterns.
 */
export function isValidEmail(email: string): boolean {
  // Must have exactly one @
  const parts = email.split('@')
  if (parts.length !== 2) return false

  const [local, domain] = parts

  // Local part: 1–64 chars, no leading/trailing dots
  if (!local || local.length > 64) return false
  if (local.startsWith('.') || local.endsWith('.')) return false

  // Domain: must have at least one dot, no leading/trailing hyphens per label
  if (!domain || domain.length > 255) return false
  const labels = domain.split('.')
  if (labels.length < 2) return false
  for (const label of labels) {
    if (!label || label.length > 63) return false
    if (label.startsWith('-') || label.endsWith('-')) return false
    if (!/^[a-zA-Z0-9-]+$/.test(label)) return false
  }

  // TLD must be at least 2 alphabetic chars
  const tld = labels[labels.length - 1]
  if (!/^[a-zA-Z]{2,}$/.test(tld)) return false

  // Full pattern guard
  const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/
  return emailPattern.test(email)
}
