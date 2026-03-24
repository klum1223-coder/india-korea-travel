export interface NaverBlogPost {
  title: string
  link: string
  description: string
  pubDate: string
}

/**
 * Attempts to fetch recent posts from a Naver Blog RSS feed.
 * RSS URL: https://rss.blog.naver.com/{blogId}.xml
 *
 * On failure (CORS, network error, malformed XML, or no blog configured)
 * returns mock data so the homepage section degrades gracefully.
 */
export async function fetchNaverBlogPosts(
  blogId: string,
  count: number = 3
): Promise<NaverBlogPost[]> {
  const mockPosts: NaverBlogPost[] = [
    {
      title: '인도 학생들이 사랑한 서울 벚꽃 명소 TOP 5',
      link: '#',
      description: '봄이 되면 서울은 온통 벚꽃으로 물듭니다. 인도 학생들이 특히 좋아하는 벚꽃 명소 다섯 곳을 소개합니다.',
      pubDate: new Date().toISOString(),
    },
    {
      title: '한국에서 인도 채식 음식 찾기 완전 가이드',
      link: '#',
      description: '채식주의자 인도 여행객을 위한 한국 식당 안내. 비건·자인·할랄 옵션까지 총정리했습니다.',
      pubDate: new Date().toISOString(),
    },
    {
      title: 'KAIST 캠퍼스 투어: 인도 학생 체험 후기',
      link: '#',
      description: '세계적인 과학기술 대학 KAIST를 방문한 인도 학생들의 생생한 후기를 전합니다.',
      pubDate: new Date().toISOString(),
    },
  ]

  if (!blogId || blogId.trim() === '') {
    return mockPosts.slice(0, count)
  }

  const rssUrl = `https://rss.blog.naver.com/${encodeURIComponent(blogId)}.xml`

  try {
    const response = await fetch(rssUrl, {
      // Use no-store so we always get the latest posts at request time
      cache: 'no-store',
      headers: {
        Accept: 'application/rss+xml, application/xml, text/xml',
      },
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      console.warn(`[Naver] RSS feed returned ${response.status} for blog: ${blogId}`)
      return mockPosts.slice(0, count)
    }

    const xml = await response.text()
    const posts = parseRSSItems(xml, count)

    if (posts.length === 0) {
      console.warn('[Naver] RSS feed parsed but returned no items, falling back to mock data')
      return mockPosts.slice(0, count)
    }

    return posts
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.warn('[Naver] Failed to fetch RSS feed, using mock data:', message)
    return mockPosts.slice(0, count)
  }
}

/**
 * Minimal RSS 2.0 parser that extracts <item> fields without an XML library.
 * Naver Blog RSS is well-structured so regex extraction is reliable enough here.
 */
function parseRSSItems(xml: string, count: number): NaverBlogPost[] {
  const items: NaverBlogPost[] = []

  // Match each <item>…</item> block
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let itemMatch: RegExpExecArray | null

  while ((itemMatch = itemRegex.exec(xml)) !== null && items.length < count) {
    const itemXml = itemMatch[1]

    const title = extractText(itemXml, 'title')
    const link = extractText(itemXml, 'link')
    const description = extractText(itemXml, 'description')
    const pubDate = extractText(itemXml, 'pubDate')

    if (title && link) {
      items.push({
        title: decodeHTMLEntities(title),
        link: link.trim(),
        description: stripHTML(decodeHTMLEntities(description)).slice(0, 200),
        pubDate: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      })
    }
  }

  return items
}

function extractText(xml: string, tag: string): string {
  // Handle both plain <tag>value</tag> and CDATA <tag><![CDATA[value]]></tag>
  const cdataRegex = new RegExp(`<${tag}>\\s*<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>\\s*<\\/${tag}>`, 'i')
  const plainRegex = new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i')

  const cdata = cdataRegex.exec(xml)
  if (cdata) return cdata[1].trim()

  const plain = plainRegex.exec(xml)
  if (plain) return plain[1].trim()

  return ''
}

function decodeHTMLEntities(str: string): string {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}

function stripHTML(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim()
}
