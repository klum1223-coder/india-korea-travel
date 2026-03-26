import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

const valueProps = [
  {
    emoji: '🎓',
    title: 'Structured Education',
    description: 'Not tourism, real learning outcomes for every day of the program.',
  },
  {
    emoji: '🏫',
    title: 'Top Universities',
    description: 'Yonsei, SNU, KAIST campus visits & curriculum exposure for aspiring students.',
  },
  {
    emoji: '🏭',
    title: 'Industry Visits',
    description: 'Samsung, Hyundai, KARI factory & lab tours showing innovation up close.',
  },
  {
    emoji: '🍛',
    title: 'Indian Meals',
    description: 'Vegetarian, Halal & Jain options at every meal throughout the trip.',
  },
  {
    emoji: '🛡️',
    title: 'Safe & Managed',
    description: 'English guide, private transport, and 24/7 on-ground support always.',
  },
  {
    emoji: '☮️',
    title: 'Peace Education',
    description: 'DMZ: a classroom like no other on Earth for global awareness.',
  },
]

export default function ValueProps() {
  return (
    <section className="py-20 bg-background" aria-labelledby="value-props-heading">
      <Container>
        <SectionHeading
          id="value-props-heading"
          title="Why Schools Choose Us"
          subtitle="Every element of our program is designed with educators in mind — from itinerary to meals to safety."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {valueProps.map((prop, i) => (
            <div
              key={prop.title}
              className="card-hover bg-white rounded-2xl p-6 shadow-sm border border-gray-200 focus-within:ring-2 focus-within:ring-accent/40"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="text-4xl mb-4" aria-hidden="true">
                {prop.emoji}
              </div>
              <h3 className="font-poppins text-lg font-bold text-primary mb-2">
                {prop.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {prop.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
