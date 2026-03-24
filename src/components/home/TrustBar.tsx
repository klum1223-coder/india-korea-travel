import Container from '@/components/ui/Container'

const partners = [
  'Yonsei University',
  'Seoul National University',
  'KAIST',
  'Samsung',
  'Hyundai',
]

export default function TrustBar() {
  return (
    <section className="bg-surface border-y border-surface py-6">
      <Container>
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
          {/* Label */}
          <p className="text-text-secondary text-sm font-semibold uppercase tracking-widest whitespace-nowrap shrink-0">
            Trusted by Schools Across India
          </p>

          {/* Divider */}
          <div className="hidden sm:block h-6 w-px bg-text-secondary/20 shrink-0" />

          {/* Partner logos (text placeholders) */}
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-6 sm:gap-8">
            {partners.map((partner) => (
              <span
                key={partner}
                className="text-text-secondary/60 text-sm font-semibold tracking-wide hover:text-text-secondary transition-colors duration-200"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
