export type ContentType =
  | 'todays-korea'
  | 'travel-story'
  | 'seasonal'
  | 'k-culture'
  | 'student-tips'
  | 'school-spotlight'

export interface GenerationContext {
  contentType: ContentType
  currentDate: string
  currentSeason: string
  topic?: string
  relatedPackageSlug?: string
}

export function getSystemPrompt(): string {
  return `You are a professional travel content writer for KoreaEdu Tours, a Korea-focused travel agency specializing in educational and cultural tours for Indian students, teachers, and school groups.

Your role:
- Write engaging, accurate, and helpful content about Korea for an Indian audience
- Tone: friendly, informative, enthusiastic but professional — never sensationalist
- Always consider the needs and cultural context of Indian travelers visiting Korea

Content guidelines:
- Include practical tips relevant to Indian travelers (visa, currency, connectivity, safety)
- Highlight vegetarian, Jain, and halal food options wherever relevant
- Mention Indian-friendly restaurants or food adaptations when discussing dining
- Cover weather, packing, and comfort tips appropriate to Indian sensibilities
- Emphasize safety, group travel logistics, and family-friendly aspects
- Reference relevant Korean cultural etiquette that Indian visitors should know
- Celebrate Korean culture with curiosity and respect, not comparison

Prohibited content:
- No political opinions or commentary on India-Korea diplomatic relations
- No religious comparisons or rankings between faiths
- No offensive, discriminatory, or culturally insensitive language
- No medical or legal advice beyond general wellness tips
- No unverified facts or sensational claims

Format requirements:
- Respond ONLY with valid JSON matching the specified schema
- Always end articles with a natural call-to-action referencing our tour packages
- Include a Korean translation for title and body when requested
- Tags should be lowercase, hyphenated, and relevant (e.g., "seoul", "vegetarian-food", "student-travel")`
}

export function getContentPrompt(context: GenerationContext): string {
  const { contentType, currentDate, currentSeason, topic, relatedPackageSlug } = context
  const topicLine = topic ? `\nFocus topic: ${topic}` : ''
  const packageLine = relatedPackageSlug
    ? `\nRelated package slug for CTA: ${relatedPackageSlug}`
    : '\nRelated package slug for CTA: seoul-gyeongju-jeju'

  const baseInstruction = `Current date: ${currentDate}\nCurrent season in Korea: ${currentSeason}${topicLine}${packageLine}`

  const schemaNote = `
Respond with a JSON object matching this exact schema (no markdown, no extra text):
{
  "title": "string (English, compelling headline)",
  "titleKo": "string (Korean translation of title)",
  "excerpt": "string (1-2 sentence summary, max 200 chars)",
  "body": "string (full article in HTML paragraphs using <p> tags)",
  "bodyKo": "string (Korean translation of body)",
  "tags": ["array", "of", "lowercase-hyphenated", "strings"],
  "relatedPackageSlug": "string (slug from packageLine above)"
}`

  switch (contentType) {
    case 'todays-korea':
      return `${baseInstruction}

Write a short, lively blog post (300–500 words) about what is happening in Korea right now — current events, seasonal highlights, trending spots, or timely travel news relevant to Indian visitors.

Requirements:
- Start with a vivid hook about Korea in the current moment
- Cover 2–3 current happenings or highlights
- Include at least one practical tip for Indian travelers visiting now
- Keep the tone conversational and energetic
- End with a brief CTA encouraging readers to explore our Korea packages
${schemaNote}`

    case 'travel-story':
      return `${baseInstruction}

Write a comprehensive Korea travel guide (1500–2500 words) for Indian students and educational groups.

Requirements:
- Detailed narrative guide format with clear sections
- Cover must-visit spots, how to get around, where to stay, and what to eat
- Dedicate a section to vegetarian/Indian-friendly dining options
- Include practical logistics: best time to visit, group travel tips, estimated costs in INR
- Weave in cultural insights and student-friendly activities
- End with a compelling CTA about our educational tour packages
${schemaNote}`

    case 'seasonal':
      return `${baseInstruction}

Write a seasonal travel alert/guide (800–1200 words) for Indian travelers planning to visit Korea during ${currentSeason}.

Requirements:
- Open with why this season is special/important for travel planning
- Cover weather conditions and what to pack (frame for Indian travelers used to different climates)
- Highlight 3–4 seasonal events, festivals, or natural phenomena to look forward to
- Include any seasonal food specialties, especially vegetarian options
- Note any seasonal challenges (crowds, prices, weather extremes) with mitigation tips
- End with CTA tied to seasonal package availability
${schemaNote}`

    case 'k-culture':
      return `${baseInstruction}

Write an engaging K-culture update (500–1000 words) for Indian travelers interested in Korean pop culture, K-drama, K-pop, or Korean lifestyle trends.

Requirements:
- Focus on a current or evergreen K-culture topic relevant to Indian audiences
- Explain cultural context accessibly (assume readers are K-drama/K-pop fans but not experts)
- Connect the cultural topic to actual travel experiences in Korea
- Mention specific locations in Korea where visitors can experience this culture
- Include tips for Indian students who want to immerse in K-culture during their trip
- End with CTA encouraging a K-culture focused Korea tour
${schemaNote}`

    case 'student-tips':
      return `${baseInstruction}

Write a practical tips article (800–1500 words) for Indian students traveling to Korea for education tours or study programs.

Requirements:
- Address common concerns Indian students have: food, safety, communication, budget, culture shock
- Provide actionable tips organized in clear categories (Food, Safety, Communication, Money, Cultural Etiquette)
- Be honest about challenges while staying encouraging
- Include specific product recommendations (apps, SIM cards, transport cards) available in Korea
- Dedicate at least one section to finding vegetarian/Indian food in Korea
- End with CTA about our student-focused Korea educational tour packages
${schemaNote}`

    case 'school-spotlight':
      return `${baseInstruction}

Write an inspiring school/university spotlight article (1000–1500 words) about a notable Korean educational institution for Indian school groups and educators.

Requirements:
- Feature a specific Korean university, research institute, or school (KAIST, POSTECH, Seoul National University, or similar)
- Describe the campus, academic culture, notable programs, and innovation highlights
- Include a "day in the life" narrative segment showing what Indian students experience during a visit
- Cover the institution's global significance and why it inspires Indian students
- Mention any India-Korea academic collaborations or exchange programs if applicable
- Include practical visit information (location, how to arrange a visit, what to expect)
- End with CTA about our school and university tour packages
${schemaNote}`

    default:
      return `${baseInstruction}

Write an engaging blog post (500–800 words) about Korea travel for Indian visitors. Include practical tips, cultural insights, and a CTA for our Korea tour packages.
${schemaNote}`
  }
}
