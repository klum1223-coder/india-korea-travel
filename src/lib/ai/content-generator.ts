import type { BlogPost } from '@/types'
import { getSystemPrompt, getContentPrompt, GenerationContext, ContentType } from './prompts'

export type { GenerationContext, ContentType }

export interface GenerateResult {
  success: boolean
  post?: BlogPost
  error?: string
}

interface ClaudeMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ClaudeResponse {
  content: Array<{ type: string; text: string }>
  error?: { message: string; type: string }
}

interface ParsedContent {
  title: string
  titleKo?: string
  excerpt: string
  body: string
  bodyKo?: string
  tags: string[]
  relatedPackageSlug?: string
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

function estimateReadTime(body: string): number {
  // Strip HTML tags for word count
  const text = body.replace(/<[^>]+>/g, ' ')
  const wordCount = text.trim().split(/\s+/).length
  // Average reading speed: 200 words per minute
  return Math.max(1, Math.round(wordCount / 200))
}

async function callClaudeAPI(context: GenerationContext): Promise<ParsedContent> {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not set')
  }

  const messages: ClaudeMessage[] = [
    {
      role: 'user',
      content: getContentPrompt(context),
    },
  ]

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      system: getSystemPrompt(),
      messages,
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Claude API error ${response.status}: ${errorText}`)
  }

  const data = (await response.json()) as ClaudeResponse

  if (data.error) {
    throw new Error(`Claude API returned error: ${data.error.message}`)
  }

  const rawText = data.content?.[0]?.text
  if (!rawText) {
    throw new Error('Claude API returned empty content')
  }

  // Strip any markdown code fences if present
  const jsonText = rawText
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```\s*$/, '')
    .trim()

  let parsed: ParsedContent
  try {
    parsed = JSON.parse(jsonText) as ParsedContent
  } catch {
    throw new Error(`Failed to parse Claude response as JSON: ${rawText.slice(0, 200)}`)
  }

  if (!parsed.title || !parsed.body || !parsed.excerpt) {
    throw new Error('Claude response missing required fields (title, body, excerpt)')
  }

  return parsed
}

function getMockPost(context: GenerationContext): ParsedContent {
  const mocks: Record<ContentType, ParsedContent> = {
    'todays-korea': {
      title: "Spring Cherry Blossoms Are Blooming Across Seoul Right Now",
      titleKo: "지금 서울 전역에 봄 벚꽃이 피어나고 있습니다",
      excerpt: "Seoul is bursting into pink this season — here's where Indian travelers can catch the best cherry blossom views right now.",
      body: "<p>Every spring, Seoul transforms into a pastel dreamscape as cherry blossoms (벚꽃, beotkkot) carpet the city's parks and riversides in shades of white and pink. This year the blooms have arrived slightly early, with peak blossoms expected across the city this week.</p><p>The most iconic spot remains <strong>Yeouido Hangang Park</strong>, where a kilometre-long promenade of cherry trees lines the riverside. Arrive early in the morning to avoid the largest crowds, and grab a kimbap or corn dog from the nearby convenience stores — a quintessentially Korean spring picnic experience.</p><p>For Indian travelers, Insadong nearby offers plenty of vegetarian street food including hotteok (sweet pancakes) and roasted chestnuts. The neighbourhood's art galleries and craft shops make for a perfect half-day pairing with your blossom walk.</p><p>Ready to experience Korea in full bloom? Our spring Korea tour packages are filling fast — <a href='/packages'>explore our Seoul and Jeju tours</a> and secure your spot today.</p>",
      bodyKo: "<p>매년 봄, 서울은 벚꽃으로 뒤덮여 아름다운 풍경을 연출합니다. 올해는 꽃이 조금 일찍 피어 이번 주 전국적으로 만개가 예상됩니다.</p><p>가장 유명한 곳은 여의도 한강공원으로, 강변을 따라 1킬로미터에 걸쳐 벚꽃 산책로가 펼쳐져 있습니다. 인파를 피하려면 이른 아침에 방문하세요.</p><p>인도 여행객들을 위해 인근 인사동에는 채식 길거리 음식이 풍부하며, 호떡과 군밤도 즐길 수 있습니다.</p><p>만개한 벚꽃 속 한국을 경험할 준비가 되셨나요? 저희 봄 여행 패키지를 확인해 보세요.</p>",
      tags: ["cherry-blossoms", "seoul", "spring", "yeouido", "hangang", "vegetarian-food"],
      relatedPackageSlug: "seoul-gyeongju-jeju",
    },
    'travel-story': {
      title: "The Complete Korea Travel Guide for Indian Student Groups",
      titleKo: "인도 학생 단체를 위한 한국 여행 완벽 가이드",
      excerpt: "Everything Indian students and school groups need to know before visiting Korea — from visa to vegetarian food and K-culture hotspots.",
      body: "<p>Korea has emerged as one of the most exciting educational travel destinations for Indian students, and it's easy to see why. From world-class universities to cutting-edge technology campuses, traditional palaces to K-pop studios, Korea offers an unparalleled blend of academic inspiration and cultural discovery.</p><p><strong>Getting There and Visa Basics</strong><br/>Indian citizens require a visa to enter Korea. Group tourist visas are processed through the Korean Embassy in New Delhi or the Consulates in Mumbai, Chennai, and Kolkata. Processing typically takes 5–7 business days. KoreaEdu Tours handles all visa documentation as part of our package service.</p><p><strong>Food for Indian Travelers</strong><br/>Finding vegetarian food in Korea has become significantly easier in recent years. Seoul's Itaewon district hosts several Indian restaurants including Moti Mahal and New Delhi Restaurant. Templestay cuisine (사찰음식) is entirely vegetarian and can be found near major Buddhist temples. Most convenience stores stock instant noodles, fruits, and snacks suitable for vegetarians.</p><p><strong>Must-Visit Destinations</strong><br/>Seoul anchors most Korea itineraries: Gyeongbokgung Palace, Bukchon Hanok Village, the Dongdaemun Design Plaza, and the Han River parks are essential stops. For students interested in technology and innovation, a visit to KAIST in Daejeon or Samsung Innovation Museum in Suwon is transformative. Jeju Island rounds out the perfect Korea itinerary with its volcanic landscapes and UNESCO heritage sites.</p><p><strong>Getting Around</strong><br/>Korea's public transport is exceptional. The T-money card (available at any convenience store) works on buses, subways, and even taxis across the country. For group travel, chartered coaches are both cost-effective and comfortable. Download Naver Maps (works better than Google Maps in Korea) and Papago (the best Korean-English translation app) before you land.</p><p><strong>Budget in INR</strong><br/>Expect to spend approximately ₹3,000–₹5,000 per day for meals and local transport. Our all-inclusive tour packages start from ₹85,000 per person for a 5-night-6-day Seoul itinerary including flights from major Indian cities.</p><p>Ready to bring your school group to Korea? <a href='/packages'>Explore our educational tour packages</a> designed specifically for Indian student groups, with Indian cuisine included and experienced bilingual guides.</p>",
      bodyKo: "<p>한국은 인도 학생들에게 가장 흥미로운 교육 여행지 중 하나로 떠올랐습니다. 세계적 수준의 대학, 첨단 기술 캠퍼스, 전통 궁궐, K-팝 스튜디오까지 한국은 학문적 영감과 문화적 발견의 완벽한 조합을 제공합니다.</p><p>한국은 공중교통이 매우 편리하며, T-머니 카드 하나로 버스, 지하철, 택시를 모두 이용할 수 있습니다. 네이버 지도와 파파고 앱은 필수입니다.</p>",
      tags: ["student-travel", "group-tours", "vegetarian-food", "seoul", "kaist", "visa-guide", "budget-travel"],
      relatedPackageSlug: "5n6d-seoul",
    },
    'seasonal': {
      title: "Korea in Autumn: The Golden Season Every Indian Traveler Should Experience",
      titleKo: "가을의 한국: 모든 인도 여행자가 경험해야 할 황금의 계절",
      excerpt: "Autumn in Korea is a spectacular riot of crimson and gold foliage — here's everything Indian travelers need to plan the perfect fall trip.",
      body: "<p>If there is one season that Koreans hold dearest, it is autumn (가을, ga-eul). From late September through November, the peninsula's mountains and temple grounds transform into breathtaking tapestries of crimson, amber, and gold. For Indian travelers, the autumn climate — cool and dry, similar to a Delhi winter — makes this arguably the most comfortable time to visit Korea.</p><p><strong>What to Pack</strong><br/>Temperatures in Seoul range from 5°C to 20°C during October–November. Bring a light down jacket or padded vest, comfortable walking shoes (you'll be doing a lot of hiking), and layers you can add or remove. Indian travelers often underestimate how cold Korean evenings get — a warm scarf is essential.</p><p><strong>Autumn Highlights</strong><br/>Seoraksan National Park in Gangwon Province is the first to turn, usually by late September. Naejangsan National Park in the southwest peaks in late October with the most concentrated foliage in the country. In Seoul, Bukhansan National Park and the grounds of Changdeokgung Palace's Secret Garden offer stunning autumn colour accessible by public transport.</p><p><strong>Autumn Food Specialties</strong><br/>Korean autumn cuisine centres on the harvest: chestnuts, persimmons, and pears appear at every market stall. Vegetarian-friendly options abound at traditional markets — try hotteok (sweet stuffed pancakes) and roasted corn from street vendors. Korean temple food restaurants, which are fully vegetarian, often introduce special autumn menus during this season.</p><p><strong>Practical Notes</strong><br/>Autumn is Korea's busiest tourist season. Book accommodation and package tours at least 2–3 months in advance. Weekends at popular foliage spots get extremely crowded — if your schedule allows, visit foliage parks mid-week.</p><p>Don't miss Korea's most beautiful season. <a href='/packages'>View our autumn Korea packages</a> and secure your group's spot before they fill up.</p>",
      bodyKo: "<p>한국의 가을은 9월 말부터 11월까지 단풍으로 뒤덮입니다. 서울의 기온은 5°C에서 20°C 사이로, 인도 여행자들에게 가장 편안한 시기입니다.</p><p>설악산, 내장산, 북한산 등 전국 각지에서 단풍 명소를 즐길 수 있습니다. 가을 음식으로는 밤, 감, 배 등이 제철을 맞습니다.</p>",
      tags: ["autumn", "foliage", "seoraksan", "seasonal-travel", "packing-tips", "temple-food"],
      relatedPackageSlug: "seoul-gyeongju-jeju",
    },
    'k-culture': {
      title: "K-Pop Dance Class in Seoul: What Indian Students Can Expect",
      titleKo: "서울의 K-팝 댄스 수업: 인도 학생들이 기대할 수 있는 것",
      excerpt: "Joining a K-pop dance class in Seoul is one of the most memorable experiences for Indian fans — here's exactly what to expect.",
      body: "<p>The Korean Wave (한류, Hallyu) has swept across India with remarkable force, turning millions of Indian students into passionate fans of K-pop, K-drama, and Korean fashion. For many, visiting Korea means one thing above all else: experiencing K-pop culture firsthand. And there is no better way to do that than joining a K-pop dance class in Seoul.</p><p><strong>Where to Take a K-Pop Dance Class</strong><br/>The HYBE Insight museum in Yongsan offers immersive experiences connected to BTS and the broader HYBE roster. For hands-on dance classes, dedicated dance academies (댄스 학원) in the Hongdae neighbourhood cater specifically to international visitors with English-speaking instructors. Popular choices include 1MILLION Dance Studio and K-Arts Dance Academy, both of which offer drop-in classes ranging from 30 minutes to 2 hours.</p><p><strong>What Actually Happens in Class</strong><br/>Instructors typically teach a 30–60 second segment of a current chart-topping song's choreography. No prior dance experience is required — these classes are designed for fans, not professionals. You'll learn the moves step-by-step, practise with music, and usually record a short video at the end to take home as a memory. Indian students often find that Bollywood dance training actually gives them an edge in picking up the footwork!</p><p><strong>Beyond the Dance Studio</strong><br/>The full K-culture experience in Seoul extends to the SM Entertainment coex artium, idol-themed cafes in Hongdae, and the famous K-Star Road in Gangnam where statues of top K-pop groups line the street. Many Indian students also make a pilgrimage to the BTS Bangtan spots — filming locations from famous music videos — which are well-mapped by fan communities online.</p><p><strong>Tips for Indian Fans</strong><br/>Book dance classes at least a week in advance, especially during school holiday seasons. Wear comfortable clothes and bring a water bottle. Most studios are located near Hongdae station on Seoul Metro Line 2 — easy to reach from anywhere in the city.</p><p>Want to build K-culture experiences into your Korea trip? Our <a href='/packages'>Korea student tour packages</a> include K-pop dance classes and cultural immersion activities as optional add-ons.</p>",
      bodyKo: "<p>한국의 K-팝 문화는 인도에서 큰 인기를 끌고 있습니다. 서울 홍대 지역에는 외국인 방문객을 위한 K-팝 댄스 학원이 많이 있습니다.</p><p>수업에서는 최신 아이돌의 안무를 단계별로 배울 수 있으며, 초보자도 쉽게 따라할 수 있습니다. HYBE 인사이트, SM 아티움 등 다양한 K-문화 체험 공간도 방문해 보세요.</p>",
      tags: ["k-pop", "dance-class", "hongdae", "hallyu", "student-activities", "bts", "seoul"],
      relatedPackageSlug: "seoul-gyeongju-jeju",
    },
    'student-tips': {
      title: "Vegetarian Food Guide for Indian Travelers in Korea",
      titleKo: "한국을 여행하는 인도 채식주의자를 위한 음식 가이드",
      excerpt: "Finding vegetarian food in Korea is easier than you think — this complete guide covers every option from street food to temple cuisine.",
      body: "<p>One of the most common concerns Indian travelers have about visiting Korea is food. Korean cuisine is famously meat and seafood-centric, and the thought of navigating menus in a foreign language while adhering to vegetarian, Jain, or halal dietary requirements can feel daunting. But the reality is much more manageable — and delicious — than many expect.</p><p><strong>The Good News: Korean Temple Food</strong><br/>Korea has one of the world's great vegetarian culinary traditions hiding in plain sight: Buddhist temple food (사찰음식, sachal eumsik). Served at temples and specialist restaurants across the country, temple food is entirely plant-based (and typically avoids even onion and garlic, making it Jain-friendly). The Templestay program run by the Cultural Corps of Korean Buddhism offers day visits where you can try temple cuisine at locations throughout Seoul and beyond.</p><p><strong>Street Food Options for Vegetarians</strong><br/>Korean street food staples that are typically vegetarian include: <em>hotteok</em> (sweet pancakes filled with brown sugar and cinnamon), <em>gukhwa ppang</em> (chrysanthemum-shaped custard cakes), <em>roasted chestnuts</em> (군밤), <em>roasted sweet potatoes</em> (군고구마), and <em>corn on the cob</em>. Always check with the vendor about cooking oils, as some stalls share fryer oil with meat items.</p><p><strong>Indian Restaurants in Seoul</strong><br/>Seoul's Itaewon district has a cluster of Indian restaurants that will feel immediately familiar: <em>New Delhi Restaurant</em> (halal certified, long-standing), <em>Moti Mahal</em> (North Indian classics), and <em>Ganga</em> (South Indian options including dosas). These restaurants are also beloved by the Korean Indian community and maintain consistent quality. Prices are comparable to mid-range Indian restaurants back home.</p><p><strong>Convenience Store Survival Guide</strong><br/>Korean convenience stores (GS25, CU, 7-Eleven, Emart24) are a vegetarian traveler's best friend. Look for: triangle kimbap with egg or cheese fillings (check labels for 계란/치즈), cup noodles with vegetable flavour (야채맛), banana milk (바나나우유), fresh fruit cups, nuts and seeds. The Korean word for vegetarian is 채식주의자 (chaesik juuija) — save it in your phone for restaurant conversations.</p><p><strong>Apps That Help</strong><br/>Download Papago (best translation app, better than Google Translate for Korean) and HappyCow (finds vegetarian restaurants globally, has decent Seoul listings). Naver Maps allows you to search 채식 (vegetarian) to find specialist restaurants near you.</p><p><strong>Planning Your Meals as a Group</strong><br/>If you are traveling with a school group, our KoreaEdu Tours packages include pre-arranged Indian cuisine meals at vetted restaurants, so you are never left scrambling. We have curated relationships with 12+ restaurants across Seoul, Busan, Jeju, and Gyeongju that serve authentic Indian vegetarian meals.</p><p>Traveling to Korea and worried about food? <a href='/packages'>Our India-focused Korea packages</a> include Indian meals as standard — your taste buds will thank you.</p>",
      bodyKo: "<p>한국은 육류 중심의 음식 문화로 알려져 있지만, 채식주의자를 위한 옵션도 의외로 많습니다. 불교 사찰음식은 완전한 채식으로, 자이나교 식단과도 호환됩니다.</p><p>인사동과 이태원에는 인도 식당이 여러 곳 있으며, 편의점에서도 채식 간식을 쉽게 구할 수 있습니다.</p>",
      tags: ["vegetarian-food", "indian-food", "temple-food", "itaewon", "student-tips", "dietary-guide", "halal"],
      relatedPackageSlug: "5n6d-seoul",
    },
    'school-spotlight': {
      title: "Inside KAIST: Why Korea's MIT Inspires Indian Students",
      titleKo: "KAIST 탐방: 한국의 MIT가 인도 학생들에게 영감을 주는 이유",
      excerpt: "A visit to KAIST — Korea's premier science and technology university — is transformative for Indian students with dreams of careers in innovation.",
      body: "<p>Nestled in the heart of Daejeon, Korea's 'Science City', the Korea Advanced Institute of Science and Technology (KAIST) stands as one of Asia's most prestigious research universities and a symbol of Korea's remarkable technological transformation. For Indian students aspiring to careers in engineering, computer science, or research, a campus visit to KAIST is nothing short of inspiring.</p><p><strong>KAIST at a Glance</strong><br/>Founded in 1971 as Korea's answer to the urgent need for scientific talent to drive national development, KAIST has grown into a global powerhouse. It consistently ranks in the world's top 50 universities for engineering and technology. KAIST alumni have founded over 600 companies with a combined market value exceeding USD 4 billion. Its robotics lab produced the viral 'dancing robot' videos that captured global attention — and yes, visiting students sometimes get to see these machines in person.</p><p><strong>A Day on Campus: What Indian Students Experience</strong><br/>Educational tour groups typically start at the KAIST main gate and proceed to the Information Centre, where a student guide (often an international student) provides an orientation talk. The tour then moves to the Open Innovation Center, where student startups display their projects — from AI diagnostics tools to sustainable materials research. The robotics demonstration, when available, is universally the highlight: watching Boston Dynamics-inspired quadruped robots navigate obstacles live never fails to produce gasps from visiting Indian school students.</p><p>Lunch is typically arranged at the KAIST cafeteria, which offers a surprisingly diverse menu including rice dishes and noodle soups that Indian students find relatively approachable. Korean university cafeterias are generally very affordable — meals cost around ₩5,000–₩8,000 (approximately ₹300–₹500).</p><p>Afternoons are often spent in guided sessions with KAIST international admissions staff, who discuss scholarship opportunities, the application process for international students, and what life is like studying in Korea. Many Indian students who have later enrolled at KAIST cite a school tour visit as their first spark of inspiration.</p><p><strong>India-Korea Academic Connections</strong><br/>KAIST has active research collaborations with IIT Bombay, IIT Delhi, and several NIT campuses. The university participates in the Global Korea Scholarship (GKS) program, which fully funds international students at Korean universities — a pathway many Indian students successfully pursue after learning about it on educational tours.</p><p><strong>Practical Visitor Information</strong><br/>KAIST is located in Yuseong District, Daejeon, approximately 90 minutes from Seoul by KTX (Korea's high-speed train). Campus tours for school groups must be pre-arranged through the International Office at least 4 weeks in advance. Our KoreaEdu Tours packages include all KAIST coordination as part of our premium educational itinerary.</p><p>Inspire your students with a visit to one of Asia's greatest universities. <a href='/packages'>Our educational Korea tour packages</a> include KAIST campus visits, industry site tours, and cultural immersion — all tailored for Indian school groups.</p>",
      bodyKo: "<p>대전에 위치한 KAIST(한국과학기술원)는 아시아 최고의 이공계 대학 중 하나로, 인도 학생들에게 큰 영감을 줍니다. 1971년에 설립된 KAIST는 엔지니어링 및 기술 분야에서 세계 50위권에 꾸준히 랭크되고 있습니다.</p><p>교육 투어 그룹들은 캠퍼스 투어, 로봇 시연, 국제 입학처 상담 등 다양한 프로그램을 경험할 수 있습니다. KAIST는 IIT 뭄바이, IIT 델리 등 인도 대학들과도 활발히 협력하고 있습니다.</p>",
      tags: ["kaist", "university-tour", "daejeon", "stem-education", "school-spotlight", "scholarship", "innovation"],
      relatedPackageSlug: "5n6d-seoul",
    },
  }

  return mocks[context.contentType] ?? mocks['todays-korea']
}

export function getCurrentSeason(date: Date): string {
  const month = date.getMonth() + 1
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}

export async function generateBlogPost(context: GenerationContext): Promise<GenerateResult> {
  let parsed: ParsedContent

  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    // Development fallback: return mock post
    console.warn('[content-generator] ANTHROPIC_API_KEY not set — using mock post for development')
    parsed = getMockPost(context)
  } else {
    try {
      parsed = await callClaudeAPI(context)
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      return { success: false, error: message }
    }
  }

  const now = new Date()
  const slug = slugify(parsed.title) + '-' + now.getTime()

  const post: BlogPost = {
    slug,
    title: parsed.title,
    titleKo: parsed.titleKo,
    body: parsed.body,
    bodyKo: parsed.bodyKo,
    excerpt: parsed.excerpt,
    category: context.contentType,
    tags: Array.isArray(parsed.tags) ? parsed.tags : [],
    thumbnail: '/images/blog/default-thumbnail.jpg',
    publishedAt: now.toISOString(),
    readTime: estimateReadTime(parsed.body),
    relatedPackageSlug: parsed.relatedPackageSlug ?? context.relatedPackageSlug,
    isAIGenerated: true,
    viewCount: 0,
  }

  return { success: true, post }
}
