const partners = [
  'Yonsei University',
  'Seoul National University',
  'KAIST',
  'Samsung',
  'Hyundai',
]

export default function TrustBar() {
  // Duplicate list for seamless marquee loop
  const doubledPartners = [...partners, ...partners]

  return (
    <section className="bg-surface border-y border-surface/80 py-5 overflow-hidden">
      <div className="flex items-center gap-0">
        {/* Static label */}
        <div className="shrink-0 px-6 sm:px-10 border-r border-text-secondary/15 mr-6">
          <p className="text-text-secondary text-xs font-bold uppercase tracking-widest whitespace-nowrap">
            Trusted Partners
          </p>
        </div>

        {/* Marquee track */}
        <div className="relative flex-1 overflow-hidden">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" aria-hidden="true" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" aria-hidden="true" />

          <div className="flex gap-10 animate-marquee w-max" aria-hidden="true">
            {doubledPartners.map((partner, i) => (
              <span
                key={`${partner}-${i}`}
                className="text-text-secondary text-sm font-semibold tracking-wide whitespace-nowrap px-2"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>

        {/* Accessible non-animated list for screen readers */}
        <ul className="sr-only">
          {partners.map((partner) => (
            <li key={partner}>{partner}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
