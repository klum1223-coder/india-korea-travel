import type { BlogPost } from '@/types'

export interface NaverPublishResult {
  success: boolean
  blogUrl?: string
  error?: string
}

export interface NaverConfig {
  clientId: string      // NAVER_CLIENT_ID env var
  clientSecret: string  // NAVER_CLIENT_SECRET env var
  blogId: string        // NAVER_BLOG_ID env var
  accessToken?: string  // NAVER_ACCESS_TOKEN env var
}

function getNaverConfig(): NaverConfig | null {
  const clientId = process.env.NAVER_CLIENT_ID
  const clientSecret = process.env.NAVER_CLIENT_SECRET
  const blogId = process.env.NAVER_BLOG_ID

  if (!clientId || !clientSecret || !blogId) {
    return null
  }

  return {
    clientId,
    clientSecret,
    blogId,
    accessToken: process.env.NAVER_ACCESS_TOKEN,
  }
}

export async function publishToNaverBlog(post: BlogPost): Promise<NaverPublishResult> {
  const config = getNaverConfig()
  if (!config) {
    console.log('[Naver] Not configured, skipping publish')
    return { success: false, error: 'Naver Blog not configured' }
  }

  if (!config.accessToken) {
    console.log('[Naver] No access token configured — cannot publish without OAuth token')
    return { success: false, error: 'Naver access token not configured. Complete OAuth flow first.' }
  }

  // Use Korean content if available, fall back to English
  const title = post.titleKo ?? post.title
  const htmlBody = convertToNaverHTML(post)
  const categoryName = mapToNaverCategory(post.category)

  console.log('[Naver] Publishing post:', {
    slug: post.slug,
    title,
    category: categoryName,
    blogId: config.blogId,
  })

  // Naver Blog Write API endpoint
  // Docs: https://developers.naver.com/docs/login/blog/blog.md
  const apiUrl = 'https://openapi.naver.com/blog/writePost.json'

  const params = new URLSearchParams({
    blogId: config.blogId,
    title,
    contents: htmlBody,
    categoryName,
  })

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${config.accessToken}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('[Naver] API error:', response.status, errorText)
      return {
        success: false,
        error: `Naver API responded with ${response.status}: ${errorText}`,
      }
    }

    const data = (await response.json()) as { blogUrl?: string; postId?: string }
    const blogUrl =
      data.blogUrl ?? `https://blog.naver.com/${config.blogId}/${data.postId ?? ''}`

    console.log('[Naver] Published successfully:', blogUrl)
    return { success: true, blogUrl }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[Naver] Publish failed:', message)
    return { success: false, error: message }
  }
}

export function convertToNaverHTML(post: BlogPost): string {
  // Prefer Korean body when available
  const body = post.bodyKo ?? post.body

  // Naver strips external stylesheets, so all styling must be inline.
  // The body is already HTML (generated with <p> tags by the AI pipeline).
  // We wrap it and append a footer with a homepage CTA.

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.koreaedu.tours'
  const postUrl = `${siteUrl}/blog/${post.slug}`

  const tagsHtml =
    post.tags.length > 0
      ? `<p style="margin:8px 0;font-size:13px;color:#888;">${post.tags.map((t) => `#${t}`).join(' ')}</p>`
      : ''

  const footer = `
<hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 24px;" />
<div style="background:#f0fdf4;border-left:4px solid #16a34a;padding:16px 20px;border-radius:4px;margin-bottom:16px;">
  <p style="margin:0 0 8px;font-weight:700;color:#15803d;font-size:15px;">KoreaEdu Tours</p>
  <p style="margin:0 0 12px;font-size:14px;color:#374151;">인도 학생과 교육 그룹을 위한 전문 한국 여행사입니다. 교육적이고 잊지 못할 한국 여행을 계획해 드립니다.</p>
  <p style="margin:0;font-size:14px;">
    🌐 홈페이지에서도 확인하세요:
    <a href="${postUrl}" style="color:#16a34a;text-decoration:underline;" target="_blank" rel="noopener noreferrer">${postUrl}</a>
  </p>
</div>
<p style="font-size:14px;color:#374151;">
  📦 저희 한국 투어 패키지를 둘러보세요:
  <a href="${siteUrl}/packages" style="color:#16a34a;text-decoration:underline;" target="_blank" rel="noopener noreferrer">${siteUrl}/packages</a>
</p>
<p style="font-size:13px;color:#9ca3af;margin-top:24px;">
  문의: <a href="${siteUrl}/contact" style="color:#6b7280;" target="_blank" rel="noopener noreferrer">${siteUrl}/contact</a>
</p>
${tagsHtml}`

  return `<div style="font-family:'Malgun Gothic','Apple SD Gothic Neo',sans-serif;font-size:15px;line-height:1.75;color:#1f2937;max-width:720px;margin:0 auto;">
${body}
${footer}
</div>`
}

export function mapToNaverCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    'todays-korea': '일상·생각',
    'travel-story': '국내여행',
    'seasonal': '국내여행',
    'k-culture': '문화·예술',
    'student-tips': '교육·학문',
    'school-spotlight': '교육·학문',
  }
  return categoryMap[category] ?? '일상·생각'
}
