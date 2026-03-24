import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Gallery | Discover Korea",
  description:
    "See Korea through the eyes of our students — photos from educational tours across Seoul, Busan, Daejeon, and beyond.",
};

const placeholderItems = [
  { label: "Seoul", bg: "bg-blue-100", textColor: "text-blue-700" },
  { label: "Busan", bg: "bg-cyan-100", textColor: "text-cyan-700" },
  { label: "K-Culture", bg: "bg-purple-100", textColor: "text-purple-700" },
  { label: "DMZ", bg: "bg-zinc-100", textColor: "text-zinc-700" },
  { label: "University", bg: "bg-indigo-100", textColor: "text-indigo-700" },
  { label: "Hanbok", bg: "bg-rose-100", textColor: "text-rose-700" },
  { label: "K-Pop", bg: "bg-pink-100", textColor: "text-pink-700" },
  { label: "Seoul", bg: "bg-sky-100", textColor: "text-sky-700" },
  { label: "Busan Temple", bg: "bg-amber-100", textColor: "text-amber-700" },
  { label: "Industrial", bg: "bg-slate-100", textColor: "text-slate-700" },
  { label: "Jeju", bg: "bg-green-100", textColor: "text-green-700" },
  { label: "K-Food", bg: "bg-orange-100", textColor: "text-orange-700" },
];

export default function GalleryPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-primary py-16 sm:py-20">
        <Container>
          <div className="text-center text-white">
            <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-3">
              Student Memories
            </p>
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold leading-tight mb-4">
              Gallery
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              See Korea through the eyes of our students
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-background">
        <Container>
          <SectionHeading
            title="Photos from the Field"
            subtitle="Real moments from our student groups exploring Korea — photos coming soon"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {placeholderItems.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className={`aspect-video rounded-2xl ${item.bg} flex flex-col items-center justify-center gap-3 border border-surface shadow-sm`}
              >
                <svg
                  className={`w-10 h-10 opacity-40 ${item.textColor}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <div className="text-center">
                  <p className={`text-xs font-semibold uppercase tracking-widest ${item.textColor} opacity-70 mb-1`}>
                    {item.label}
                  </p>
                  <p className={`text-sm font-medium ${item.textColor}`}>
                    Photo Coming Soon
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery note */}
          <div className="mt-10 text-center">
            <p className="text-text-secondary text-sm max-w-lg mx-auto">
              We are curating photos from our recent tours. Check back soon — or{" "}
              <Link href="/contact" className="text-secondary underline font-medium hover:text-secondary/80 transition-colors">
                contact us
              </Link>{" "}
              to see samples from past trips.
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary">
        <Container>
          <div className="text-center text-white max-w-2xl mx-auto">
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold mb-4">
              Join the Next Group and Create Your Own Memories
            </h2>
            <p className="text-white/70 text-lg mb-8">
              Your school trip to Korea is waiting. Every photo tells a story — yours starts here.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
