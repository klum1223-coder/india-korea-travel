import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'

const steps = [
  {
    number: 1,
    title: 'Choose Your Package',
    description:
      'Browse our 4 curated itineraries ranging from 6 to 10 days. Pick the one that best fits your school calendar and learning goals.',
  },
  {
    number: 2,
    title: 'Customize Your Program',
    description:
      'Work with our educational consultants to tailor the itinerary, dietary options, hotel class, and optional activities.',
  },
  {
    number: 3,
    title: 'Travel & Learn',
    description:
      'Fly to Korea with your group and enjoy a fully managed, educationally rich experience from arrival to departure.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 bg-background" aria-labelledby="how-it-works-heading">
      <Container>
        <SectionHeading
          id="how-it-works-heading"
          title="How It Works"
          subtitle="From enquiry to Korea — a simple 3-step journey for your school."
          align="center"
        />

        <ol className="relative flex flex-col md:flex-row items-stretch gap-0">
          {steps.map((step, index) => (
            <li key={step.number} className="flex flex-col md:flex-row flex-1 items-start">
              {/* Step card */}
              <div className="flex flex-col items-center text-center flex-1 px-6">
                {/* Number circle */}
                <div
                  className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-poppins text-2xl font-bold shadow-lg mb-4 shrink-0"
                  aria-hidden="true"
                >
                  {step.number}
                </div>
                <h3 className="font-poppins text-lg font-bold text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>

              {/* Desktop arrow connector — not after last step */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center px-2 shrink-0 mt-7" aria-hidden="true">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 16 H26 M18 8 L26 16 L18 24"
                      stroke="#E8732A"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}

              {/* Mobile vertical connector with arrow tip — not after last step */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex flex-col items-center w-full my-2" aria-hidden="true">
                  {/* Dashed line segment */}
                  <div className="w-px h-6 border-l-2 border-dashed border-secondary/40" />
                  {/* Arrow tip */}
                  <svg width="12" height="8" viewBox="0 0 12 8" fill="none" className="mt-px">
                    <path
                      d="M1 1L6 7L11 1"
                      stroke="#E8732A"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      opacity="0.5"
                    />
                  </svg>
                </div>
              )}
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
