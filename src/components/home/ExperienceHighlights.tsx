import Link from 'next/link'
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

export default function ExperienceHighlights() {
  const featured = FEATURED_IDS
    .map((id) => experiencesData.find((e) => e.id === id))
    .filter((e): e is (typeof experiencesData)[number] => e !== undefined)

  return (
    <section className="py-20 bg-surface">
      <Container>
        <SectionHeading
          title="Experience Highlights"
          subtitle="A taste of what awaits — from ancient palaces to cutting-edge innovation labs."
          align="center"
        />
      </Container>

      {/* Full-width scroll container */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 px-4 sm:px-6 lg:px-8 min-w-max mx-auto" style={{ maxWidth: 'none' }}>
          {featured.map((exp) => {
            const category = exp.category as ExperienceCategory
            return (
              <div
                key={exp.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-surface flex flex-col w-64 shrink-0"
              >
                {/* Category color bar */}
                <div
                  className={`h-1.5 rounded-t-2xl ${
                    category === 'educational'
                      ? 'bg-blue-500'
                      : category === 'industrial'
                      ? 'bg-orange-500'
                      : category === 'cultural'
                      ? 'bg-purple-500'
                      : category === 'kwave'
                      ? 'bg-pink-500'
                      : 'bg-green-500'
                  }`}
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

                  <div className="mt-3 pt-3 border-t border-surface">
                    <span className="text-xs text-text-secondary/60">
                      Duration: {exp.duration}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Link to all experiences */}
      <div className="text-center mt-8">
        <Link
          href="/experiences"
          className="inline-flex items-center gap-1 text-secondary font-semibold hover:text-secondary/80 transition-colors duration-200"
        >
          Explore All Experiences →
        </Link>
      </div>
    </section>
  )
}
