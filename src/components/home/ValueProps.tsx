import React from 'react'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

const icons: Record<string, React.ReactNode> = {
  graduation: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
    </svg>
  ),
  university: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20M4 20V10l8-6 8 6v10" />
      <path d="M9 20v-4a3 3 0 0 1 6 0v4M9 10h6" />
    </svg>
  ),
  factory: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20V8l-6 4V8l-6 4V4H2z" />
      <path d="M17 20v-4M13 20v-4M9 20v-4" />
    </svg>
  ),
  meal: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7" />
    </svg>
  ),
  shield: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  ),
  globe: (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
}

const borderColors = [
  'border-l-secondary',
  'border-l-primary',
  'border-l-accent',
  'border-l-teal',
  'border-l-success',
  'border-l-coral',
]

const iconColors = [
  'text-secondary',
  'text-primary',
  'text-accent',
  'text-teal',
  'text-success',
  'text-coral',
]

const valueProps = [
  {
    icon: 'graduation',
    title: 'Structured Education',
    description: 'Not tourism, real learning outcomes for every day of the program.',
  },
  {
    icon: 'university',
    title: 'Top Universities',
    description: 'Yonsei, SNU, KAIST campus visits & curriculum exposure for aspiring students.',
  },
  {
    icon: 'factory',
    title: 'Industry Visits',
    description: 'Samsung, Hyundai, KARI factory & lab tours showing innovation up close.',
  },
  {
    icon: 'meal',
    title: 'Indian Meals',
    description: 'Vegetarian, Halal & Jain options at every meal throughout the trip.',
  },
  {
    icon: 'shield',
    title: 'Safe & Managed',
    description: 'English guide, private transport, and 24/7 on-ground support always.',
  },
  {
    icon: 'globe',
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
              className={`card-hover animate-card-entrance bg-white rounded-2xl p-6 shadow-sm border border-gray-200 border-l-4 ${borderColors[i]} focus-within:ring-2 focus-within:ring-accent/40`}
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`${iconColors[i]} mb-4`} aria-hidden="true">
                {icons[prop.icon]}
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
