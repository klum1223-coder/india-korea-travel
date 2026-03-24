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
    <section className="py-20 bg-surface">
      <Container>
        <SectionHeading
          title="How It Works"
          subtitle="From enquiry to Korea — a simple 3-step journey for your school."
          align="center"
        />

        <div className="relative flex flex-col md:flex-row items-start md:items-stretch gap-8 md:gap-0">
          {steps.map((step, index) => (
            <div key={step.number} className="flex flex-col md:flex-row flex-1 items-start">
              {/* Step card */}
              <div className="flex flex-col items-center text-center flex-1 px-6">
                {/* Circle */}
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center font-poppins text-2xl font-bold shadow-lg mb-4 shrink-0">
                  {step.number}
                </div>
                <h3 className="font-poppins text-lg font-bold text-primary mb-2">
                  {step.title}
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>

              {/* Arrow connector (not after last step) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center px-2 shrink-0 mt-7">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
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

              {/* Mobile vertical connector */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center w-full my-1">
                  <div className="w-0.5 h-8 bg-secondary/40" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Connecting line behind steps (desktop) */}
        <div className="hidden md:block relative -mt-[calc(theme(spacing.16)/2+theme(spacing.4))] pointer-events-none" aria-hidden="true">
          {/* intentionally empty — arrows handle connection */}
        </div>
      </Container>
    </section>
  )
}
