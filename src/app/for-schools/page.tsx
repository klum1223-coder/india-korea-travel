import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "For Schools | Discover Korea",
  description:
    "Structured educational programs designed for Indian schools — curriculum-aligned, safety-first Korea study tours for principals and teachers.",
};

const programGoals = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Global Exposure",
    description: "Students experience an advanced economy first-hand — public transport, smart cities, and global campuses.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    title: "Academic Inspiration",
    description: "Campus visits to Yonsei, KAIST, and Seoul National University ignite higher-education ambition.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Cultural Intelligence",
    description: "Immersive encounters with Korean heritage, food, and contemporary culture build empathy and adaptability.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
    title: "Peace Education",
    description: "The DMZ visit teaches students the real cost of conflict and the value of diplomacy — a unique classroom.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    title: "Hands-on Learning",
    description: "Kimchi-making, Taekwondo, K-pop studios, and robotics labs — learning that sticks because students do it.",
  },
];

const timelineItems = [
  {
    day: 1,
    theme: "Arrival & Adaptation",
    outcome: "International travel confidence",
    detail: "ICN Airport arrival → Seoul hotel → Indian dinner",
  },
  {
    day: 2,
    theme: "Korean History & Culture",
    outcome: "Asian history comparison, Heritage understanding",
    detail: "Gyeongbok Palace · Bukchon Hanok Village · Insadong · Cheonggyecheon Stream",
  },
  {
    day: 3,
    theme: "Global Politics & Academia",
    outcome: "International relations, Higher education motivation",
    detail: "DMZ Tour (Imjingak, 3rd Tunnel, Dora Observatory) · Yonsei University · Hongdae",
  },
  {
    day: 4,
    theme: "Technology & Regional Development",
    outcome: "Infrastructure exposure, Urban development",
    detail: "KTX Bullet Train to Busan · Haedong Temple · Gamcheon Village · BIFF Square",
  },
  {
    day: 5,
    theme: "Future Industry & Ocean",
    outcome: "Future career awareness, Global trade",
    detail: "APEC House · Blue Line Park · Haeundae Beach · KMOU University Visit",
  },
  {
    day: 6,
    theme: "Departure & Reflection",
    outcome: "Reflection & personal growth",
    detail: "Breakfast → Transfer to Busan Airport → Lifelong memories",
  },
];

const safetyChecks = [
  "English-speaking certified tour guide (10 hrs/day)",
  "Private AC coach — no public transport for the group",
  "Daily Indian vegetarian / Halal / Jain meals included",
  "24/7 emergency WhatsApp line with Korean local team",
  "Travel insurance guidance provided pre-departure",
  "Documented emergency protocol shared with school",
  "All entry fees and museum tickets pre-confirmed",
  "Group handled exclusively by our trained escorts",
];

const downloadResources = [
  {
    title: "Program Proposal PDF",
    description: "Full overview for principal approval",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Itinerary PDF",
    description: "Day-by-day schedule with timings",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Safety Guidelines",
    description: "Protocols and emergency contacts",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Parent Info Sheet",
    description: "What parents need to know",
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export default function ForSchoolsPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="relative bg-primary py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-4">
              Educational Travel Programs
            </p>
            <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Structured Educational Programs Designed for Indian Schools
            </h1>
            <p className="text-white/75 text-lg sm:text-xl mb-10 max-w-2xl">
              Korea study tours built around curriculum outcomes, student safety, and genuine learning — not just sightseeing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg">
                <Link href="#">Download Program Proposal</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link href="/contact">Schedule a Presentation</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* "Not a Sightseeing Tour" callout */}
      <section className="bg-secondary py-12">
        <Container>
          <div className="max-w-3xl mx-auto text-center text-white">
            <p className="text-xs uppercase tracking-widest font-semibold mb-3 opacity-80">
              Our Philosophy
            </p>
            <h2 className="font-poppins text-2xl sm:text-3xl font-bold mb-4">
              This Is Not a Sightseeing Tour.
            </h2>
            <p className="text-white/85 text-base sm:text-lg leading-relaxed">
              Every site we visit is chosen for its learning value. Every day has a defined theme and measurable outcome. Your students return home not with photos, but with perspective — a rarer and more durable souvenir.
            </p>
          </div>
        </Container>
      </section>

      {/* Program Goals */}
      <section className="py-16 bg-background">
        <Container>
          <SectionHeading
            title="Program Goals"
            subtitle="Five pillars that shape every day of the journey"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {programGoals.map((goal) => (
              <div
                key={goal.title}
                className="bg-white rounded-2xl border border-surface p-6 shadow-sm text-center flex flex-col items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {goal.icon}
                </div>
                <h3 className="font-poppins font-bold text-primary text-base">{goal.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{goal.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Learning Outcomes Timeline */}
      <section className="py-16 bg-surface/50">
        <Container>
          <SectionHeading
            title="Learning Outcomes — Day by Day"
            subtitle="Based on the 5 Nights / 6 Days Seoul–Busan program"
          />
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20" aria-hidden="true" />
              <div className="space-y-6">
                {timelineItems.map((item, index) => (
                  <div key={item.day} className="relative flex gap-6">
                    {/* Day circle */}
                    <div
                      className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-primary flex flex-col items-center justify-center text-white shadow-md"
                      aria-label={`Day ${item.day}`}
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider opacity-70">Day</span>
                      <span className="font-poppins font-bold text-xl leading-none">{item.day}</span>
                    </div>
                    {/* Content */}
                    <div className="bg-white rounded-2xl border border-surface p-5 shadow-sm flex-1">
                      <div className="flex flex-wrap items-start gap-3 mb-2">
                        <h3 className="font-poppins font-bold text-primary text-base">{item.theme}</h3>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-success bg-success/10 px-2.5 py-0.5 rounded-full">
                          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          {item.outcome}
                        </span>
                      </div>
                      <p className="text-text-secondary text-sm">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Student Safety */}
      <section className="py-16 bg-background">
        <Container>
          <div className="max-w-3xl mx-auto">
            <SectionHeading
              title="Student Safety — Our Non-Negotiables"
              subtitle="Every measure in place before the first student boards the plane"
            />
            <div className="bg-white rounded-2xl border border-surface p-8 shadow-sm">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {safetyChecks.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-text-secondary text-sm">
                    <svg
                      className="w-5 h-5 text-success shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Cost Transparency */}
      <section className="py-16 bg-surface/50">
        <Container>
          <SectionHeading
            title="Cost Transparency"
            subtitle="No hidden costs. No surprises after the deposit."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Included */}
            <div className="bg-white rounded-2xl border border-surface p-7 shadow-sm">
              <h3 className="font-poppins font-bold text-primary text-lg mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                What&apos;s Included
              </h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                {[
                  "Accommodation (twin sharing)",
                  "Buffet breakfast + Indian cuisine meals",
                  "Full tour & transfers with admission fees",
                  "English-speaking guide (10 hrs/day)",
                  "Mineral water (1 bottle/person/day)",
                  "KTX bullet train (Seoul → Busan)",
                  "All programme entry tickets",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-success shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            {/* Excluded */}
            <div className="bg-white rounded-2xl border border-surface p-7 shadow-sm">
              <h3 className="font-poppins font-bold text-primary text-lg mb-5 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
                Not Included
              </h3>
              <ul className="space-y-3 text-sm text-text-secondary">
                {[
                  "International airfare (quoted separately)",
                  "Personal shopping & expenses",
                  "Tipping ($5/person/day — recommended)",
                  "High season surcharges (notified in advance)",
                  "Travel insurance premium (school arranges)",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-5 p-3 bg-accent/10 rounded-xl">
                <p className="text-xs text-text-secondary leading-relaxed">
                  <strong className="text-primary">Note:</strong> All costs are itemised in the Program Proposal PDF. There are no additional charges after signing — period.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Parent Information Kit */}
      <section className="py-16 bg-background">
        <Container>
          <div className="max-w-2xl mx-auto">
            <SectionHeading
              title="Parent Information Kit"
              subtitle="Everything parents need — delivered before departure"
            />
            <div className="bg-white rounded-2xl border border-primary/20 p-8 shadow-sm">
              <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                Once a school confirms, parents receive a comprehensive kit covering every concern before it arises.
              </p>
              <ul className="space-y-4">
                {[
                  {
                    icon: "💬",
                    title: "Daily WhatsApp Updates",
                    detail: "Parents receive a photo + activity update every evening from our guide.",
                  },
                  {
                    icon: "🍽️",
                    title: "Meal Plan (Veg / Halal / Jain)",
                    detail: "All three dietary needs are accommodated at every meal — no exceptions.",
                  },
                  {
                    icon: "🎒",
                    title: "Packing Checklist",
                    detail: "Season-specific list of clothing, documents, and essentials for Korea.",
                  },
                  {
                    icon: "📞",
                    title: "Emergency Contacts",
                    detail: "Direct numbers for local guide, Indian embassy, and 24/7 operations desk.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-primary text-sm">{item.title}</p>
                      <p className="text-text-secondary text-sm">{item.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Downloadable Resources */}
      <section className="py-16 bg-surface/50">
        <Container>
          <SectionHeading
            title="Downloadable Resources"
            subtitle="Everything you need to get your school's approval"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {downloadResources.map((resource) => (
              <a
                key={resource.title}
                href="#"
                className="bg-white rounded-2xl border border-surface p-6 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                aria-label={`Download ${resource.title}`}
              >
                <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors duration-300">
                  {resource.icon}
                </div>
                <div>
                  <h3 className="font-poppins font-bold text-primary text-sm mb-1">{resource.title}</h3>
                  <p className="text-text-secondary text-xs">{resource.description}</p>
                </div>
                <span className="text-xs font-semibold text-secondary flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </span>
              </a>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA: Schedule a Meeting */}
      <section className="py-20 bg-primary">
        <Container>
          <div className="text-center text-white max-w-2xl mx-auto">
            <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-3">
              Ready to Learn More?
            </p>
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold mb-4">
              Schedule a Meeting with Our Team
            </h2>
            <p className="text-white/70 text-lg mb-10">
              We come to you. Present the program to your faculty, answer every question, and leave a full proposal — at no obligation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Online Presentation</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
                asChild
              >
                <Link href="/contact">In-Person Meeting</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
