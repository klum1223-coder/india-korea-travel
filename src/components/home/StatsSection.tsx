import Container from '@/components/ui/Container'

const stats = [
  { value: '50+', label: 'Schools Served' },
  { value: '1000+', label: 'Students Transformed' },
  { value: '4.9/5', label: 'Average Rating' },
  { value: '6', label: 'Cities Covered' },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-primary">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center">
              <span className="font-poppins text-4xl sm:text-5xl font-bold text-secondary leading-none">
                {stat.value}
              </span>
              <span className="mt-2 text-sm sm:text-base text-white/70 font-medium">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
