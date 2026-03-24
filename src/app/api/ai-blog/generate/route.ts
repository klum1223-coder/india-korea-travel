import type { NextRequest } from 'next/server'
import type { ContentType } from '@/lib/ai/prompts'
import { generateBlogPost, getCurrentSeason } from '@/lib/ai/content-generator'
import { checkContentQuality } from '@/lib/ai/quality-check'
import { addPost, getRecentPosts } from '@/lib/ai/blog-store'
import type { BlogPost } from '@/types'

// ─── POST /api/ai-blog/generate ─────────────────────────────────────────────
// Body: { contentType: ContentType, topic?: string }
// Generates a blog post via AI, quality-checks it, and persists it.

export async function POST(request: NextRequest) {
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

  const validContentTypes: ContentType[] = [
    'todays-korea',
    'travel-story',
    'seasonal',
    'k-culture',
    'student-tips',
    'school-spotlight',
  ]

  if (!contentType || !validContentTypes.includes(contentType)) {
    return Response.json(
      {
        success: false,
        error: `contentType is required and must be one of: ${validContentTypes.join(', ')}.`,
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

  return Response.json({ success: true, post: result.post }, { status: 201 })
}

// ─── GET /api/ai-blog/generate ───────────────────────────────────────────────
// Query params:
//   limit    – number of posts to return (default: 10)
//   category – filter by BlogPost category

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
