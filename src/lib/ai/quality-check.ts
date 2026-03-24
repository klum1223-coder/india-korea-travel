import type { BlogPost } from '@/types'

export interface QualityResult {
  passed: boolean
  issues: string[]
}

// Words that are prohibited in generated content.
// This list covers highly charged political, offensive, and irrelevant terms.
const BANNED_WORDS: string[] = [
  // Political / sovereignty flashpoints
  'axis of evil',
  'north korea bomb',
  'nuclear threat',
  'regime change',
  // Generic offensive terms
  'terrorist',
  'jihad',
  'infidel',
  'slur',
  // Religion comparison bait
  'inferior religion',
  'superior religion',
  'true religion',
  // Placeholder / unfilled template artifacts
  'lorem ipsum',
  'placeholder',
  'todo:',
  'fixme:',
  '[insert',
  '{{',
]

export function checkContentQuality(post: BlogPost): QualityResult {
  const issues: string[] = []

  // ── Title checks ────────────────────────────────────────────────────────────
  if (!post.title || post.title.trim().length === 0) {
    issues.push('Title is missing.')
  } else {
    if (post.title.trim().length < 10) {
      issues.push(`Title is too short (${post.title.trim().length} chars; minimum 10).`)
    }
    if (post.title.trim().length > 100) {
      issues.push(`Title is too long (${post.title.trim().length} chars; maximum 100).`)
    }
  }

  // ── Body checks ──────────────────────────────────────────────────────────────
  if (!post.body || post.body.trim().length === 0) {
    issues.push('Body content is missing.')
  } else {
    // Strip HTML for bare-text length check
    const plainBody = post.body.replace(/<[^>]+>/g, ' ').trim()
    if (plainBody.length < 200) {
      issues.push(`Body is too short (${plainBody.length} chars; minimum 200).`)
    }
  }

  // ── Excerpt checks ───────────────────────────────────────────────────────────
  if (!post.excerpt || post.excerpt.trim().length === 0) {
    issues.push('Excerpt is missing.')
  }

  // ── Tags checks ───────────────────────────────────────────────────────────────
  if (!post.tags || post.tags.length === 0) {
    issues.push('Post must have at least one tag.')
  }

  // ── Banned-word scan ──────────────────────────────────────────────────────────
  const combinedText = [post.title, post.excerpt, post.body]
    .join(' ')
    .toLowerCase()

  for (const word of BANNED_WORDS) {
    if (combinedText.includes(word.toLowerCase())) {
      issues.push(`Content contains prohibited term: "${word}".`)
    }
  }

  return { passed: issues.length === 0, issues }
}
