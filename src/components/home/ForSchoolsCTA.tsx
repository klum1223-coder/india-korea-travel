import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function ForSchoolsCTA() {
  return (
    <section className="py-20 bg-surface">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 rounded-full px-4 py-1.5 mb-6">
            <span className="text-secondary text-sm font-semibold">For Educators</span>
          </div>

          <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-primary mb-4 leading-tight">
            Are you a School Principal or Teacher?
          </h2>

          <p className="text-text-secondary text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            Our Korea Educational Immersion Program is built for Indian schools. Every day has
            structured learning outcomes, curriculum alignment, and educator-approved activities.
            We handle all the logistics — you focus on the students.
          </p>

          {/* Feature bullets */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
            {[
              {
                icon: '📋',
                title: 'Ready-made Proposals',
                desc: 'Download a full program proposal to present to your school management.',
              },
              {
                icon: '🎤',
                title: 'School Presentations',
                desc: "We'll visit your school or present online to parents and students.",
              },
              {
                icon: '✏️',
                title: 'Custom Itineraries',
                desc: 'Every program is tailored to your curriculum and group requirements.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-xl p-4 shadow-sm border border-surface"
              >
                <div className="text-2xl mb-2" aria-hidden="true">
                  {item.icon}
                </div>
                <h4 className="font-poppins text-sm font-bold text-primary mb-1">
                  {item.title}
                </h4>
                <p className="text-text-secondary text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/for-schools"
              className="inline-flex items-center justify-center font-semibold transition-colors duration-200 bg-secondary text-white hover:bg-secondary/90 shadow-sm px-7 py-3.5 text-base rounded-xl"
            >
              Download Program Proposal
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center font-semibold transition-colors duration-200 border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white px-7 py-3.5 text-base rounded-xl"
            >
              Schedule a Presentation
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
