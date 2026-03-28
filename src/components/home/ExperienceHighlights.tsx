import Link from 'next/link'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import experiencesData from '@/lib/data/experiences.json'

type ExperienceCategory = 'educational' | 'industrial' | 'cultural' | 'kwave' | 'sightseeing'

const categoryColors: Record<ExperienceCategory, string> = {
  educational: 'bg-blue-100 text-blue-700',
  industrial: 'bg-orange-100 text-orange-700',
  cultural: 'bg-purple-100 text-purple-700',
  kwave: 'bg-pink-100 text-pink-700',
  sightseeing: 'bg-green-100 text-green-700',
}

const categoryBarColors: Record<ExperienceCategory, string> = {
  educational: 'bg-blue-500',
  industrial: 'bg-orange-500',
  cultural: 'bg-purple-500',
  kwave: 'bg-pink-500',
  sightseeing: 'bg-green-500',
}

// Pick 8 featured experiences with a mix of categories
const FEATURED_IDS = [
  'dmz-tour',
  'kaist',
  'hyundai-motor-ulsan-plant',
  'samsung-innovation-museum',
  'hanbok-experience',
  'kpop-dance-class-mv',
  'gyeongbok-palace',
  'nami-island',
]

const experienceImages: Record<string, string> = {
  'dmz-tour': '/images/experiences/seoul-night.jpg',
  'kaist': '/images/blog/korea-university.jpg',
  'hyundai-motor-ulsan-plant': '/images/experiences/ddp-interior.jpg',
  'samsung-innovation-museum': '/images/experiences/ddp-seoul.jpg',
  'hanbok-experience': '/images/experiences/hanbok-experience.jpg',
  'kpop-dance-class-mv': '/images/blog/hongdae-night.jpg',
  'gyeongbok-palace': '/images/experiences/gyeongbok-palace.jpg',
  'nami-island': '/images/experiences/cherry-night.jpg',
}

export default function ExperienceHighlights() {
  const featured = FEATURED_IDS
    .map((id) => experiencesData.find((e) => e.id === id))
    .filter((e): e is (typeof experiencesData)[number] => e !== undefined)

  return (
    <section className="py-20 bg-surface" aria-labelledby="experience-highlights-heading">
      <Container>
        <SectionHeading
          id="experience-highlights-heading"
          title="Experience Highlights"
          subtitle="A taste of what awaits — from ancient palaces to cutting-edge innovation labs."
          align="center"
        />
      </Container>

      {/*
        Carousel: scroll-snap, hidden scrollbar, gradient fade hints via carousel-wrapper.
        Left/right padding aligns cards with the max-w-7xl container on larger screens.
      */}
      <div
        className="carousel-wrapper mt-2"
        aria-label="Scrollable experience cards — swipe to explore"
      >
        <div
          className="carousel-track scrollbar-hide gap-4 px-4 sm:px-8 lg:px-[max(2rem,calc((100vw_-_80rem)/2_+_2rem))]"
          role="list"
        >
          {featured.map((exp) => {
            const category = exp.category as ExperienceCategory
            const imageUrl = experienceImages[exp.id]
            return (
              <div
                key={exp.id}
                role="listitem"
                className="card-hover group bg-white rounded-2xl shadow-sm border border-gray-200 hover:border-primary/20 hover:shadow-lg flex flex-col w-64 shrink-0 transition-all duration-300"
              >
                {/* Experience image */}
                {imageUrl && (
                  <div className="relative aspect-[3/2] w-full overflow-hidden rounded-t-2xl">
                    <Image
                      src={imageUrl}
                      alt={exp.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="256px"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                )}

                {/* Category color bar */}
                <div
                  className={`h-1.5 ${!imageUrl ? 'rounded-t-2xl' : ''} ${categoryBarColors[category]}`}
                  aria-hidden="true"
                />

                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-poppins text-sm font-bold text-primary leading-snug">
                      {exp.name}
                    </h3>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                      {exp.city}
                    </span>
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${categoryColors[category]}`}
                    >
                      {exp.category}
                    </span>
                  </div>

                  <p className="text-text-secondary text-xs leading-relaxed flex-1">
                    {exp.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <span className="text-xs text-text-secondary/80">
                      Duration: {exp.duration}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Swipe hint — visible on mobile only */}
      <p className="text-center text-xs text-text-secondary/50 mt-3 md:hidden" aria-hidden="true">
        ← swipe to explore →
      </p>

      {/* Link to all experiences */}
      <div className="text-center mt-6">
        <Link
          href="/experiences"
          className="inline-flex items-center gap-1 text-secondary font-semibold hover:text-secondary/80 hover:gap-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2 rounded-sm"
        >
          Explore All Experiences →
        </Link>
      </div>
    </section>
  )
}
