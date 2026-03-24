import Link from 'next/link'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Badge from '@/components/ui/Badge'
import packagesData from '@/lib/data/packages.json'

// Derive a display name from slug and duration
function getPackageName(slug: string): string {
  const nameMap: Record<string, string> = {
    '5n6d-seoul-busan': 'Seoul & Busan Explorer',
    '8d7n-stem-industry': 'STEM & Industry Immersion',
    '9d8n-comprehensive': 'Comprehensive Korea Experience',
    '10d9n-korea-jeju': 'Korea & Jeju Ultimate Tour',
  }
  return nameMap[slug] ?? slug
}

// Get the lowest starting price across all pricing tiers
function getStartingPrice(pricing: unknown): number | null {
  if (!pricing || typeof pricing !== 'object') return null
  const p = pricing as Record<string, unknown>

  const candidates: number[] = []

  // Array format (5n6d package)
  if (Array.isArray(pricing)) {
    for (const tier of pricing) {
      if (tier && typeof tier === 'object') {
        const t = tier as Record<string, unknown>
        if (typeof t.pax30 === 'number') candidates.push(t.pax30)
        if (typeof t.pax25 === 'number') candidates.push(t.pax25)
        if (typeof t.pax20 === 'number') candidates.push(t.pax20)
        if (typeof t.pax15 === 'number') candidates.push(t.pax15)
      }
    }
    return candidates.length > 0 ? Math.min(...candidates) : null
  }

  // Object format (other packages)
  for (const key of Object.keys(p)) {
    if (key === 'sglSupplement') continue
    const tier = p[key]
    if (tier && typeof tier === 'object') {
      const t = tier as Record<string, unknown>
      if (typeof t.pax30 === 'number') candidates.push(t.pax30)
      if (typeof t.pax25 === 'number') candidates.push(t.pax25)
      if (typeof t.pax20 === 'number') candidates.push(t.pax20)
      if (typeof t.pax15 === 'number') candidates.push(t.pax15)
    }
  }
  return candidates.length > 0 ? Math.min(...candidates) : null
}

export default function PackageShowcase() {
  const featured = packagesData.slice(0, 3)

  return (
    <section className="py-20 bg-background">
      <Container>
        <SectionHeading
          title="Our Tour Packages"
          subtitle="Carefully crafted educational itineraries for Indian schools — from short explorations to comprehensive immersions."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {featured.map((pkg) => {
            const name = getPackageName(pkg.slug)
            const startingPrice = getStartingPrice(pkg.pricing)

            return (
              <div
                key={pkg.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 border border-surface flex flex-col"
              >
                {/* Card header with gradient */}
                <div className="bg-gradient-to-br from-primary to-primary/80 p-6 text-white relative">
                  {pkg.badge && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="default">{pkg.badge}</Badge>
                    </div>
                  )}
                  <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-1">
                    {pkg.duration}
                  </p>
                  <h3 className="font-poppins text-xl font-bold leading-snug pr-20">
                    {name}
                  </h3>
                  <p className="text-white/70 text-xs mt-1">
                    {pkg.cities.join(' · ')}
                  </p>
                </div>

                {/* Card body */}
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                    {pkg.tagline}
                  </p>

                  {/* Highlights preview */}
                  <ul className="space-y-1 mb-5">
                    {pkg.highlights.slice(0, 3).map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-xs text-text-secondary"
                      >
                        <span className="text-secondary font-bold mt-0.5 shrink-0">✓</span>
                        {highlight}
                      </li>
                    ))}
                    {pkg.highlights.length > 3 && (
                      <li className="text-xs text-text-secondary/60 pl-4">
                        +{pkg.highlights.length - 3} more highlights
                      </li>
                    )}
                  </ul>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-surface">
                    {startingPrice != null && (
                      <div>
                        <p className="text-xs text-text-secondary">From</p>
                        <p className="font-poppins text-xl font-bold text-primary">
                          ${startingPrice.toLocaleString()}
                        </p>
                        <p className="text-xs text-text-secondary/60">per person</p>
                      </div>
                    )}
                    <Link
                      href={`/packages/${pkg.slug}`}
                      className="inline-flex items-center justify-center font-semibold transition-colors duration-200 bg-secondary text-white hover:bg-secondary/90 shadow-sm px-4 py-2 text-sm rounded-lg"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href="/packages"
            className="inline-flex items-center justify-center font-semibold transition-colors duration-200 border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white px-7 py-3 text-base rounded-xl"
          >
            Compare All Packages →
          </Link>
        </div>
      </Container>
    </section>
  )
}
