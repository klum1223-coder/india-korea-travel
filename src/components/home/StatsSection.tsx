import Container from '@/components/ui/Container'

const stats = [
  { value: '50+', label: 'Schools Served' },
  { value: '1000+', label: 'Students Transformed' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '6', label: 'Cities Covered' },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-primary relative overflow-hidden" aria-label="Program statistics">
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        aria-hidden="true"
      />

      <Container>
        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span className="font-poppins text-4xl sm:text-5xl font-bold text-accent leading-none">
                {stat.value}
              </span>
              <span className="mt-2 text-sm sm:text-base text-white/85 font-medium">
                {stat.label}
              </span>
              {/* Separator dot for all but last on desktop */}
              {i < stats.length - 1 && (
                <span
                  className="hidden md:block absolute top-1/2 -translate-y-1/2 w-px h-10 bg-white/15"
                  style={{ left: `${(i + 1) * 25}%` }}
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
