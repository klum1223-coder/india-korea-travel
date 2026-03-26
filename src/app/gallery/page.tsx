import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Gallery | Discover Korea",
  description:
    "See Korea through the eyes of our students — photos from educational tours across Seoul, Busan, Daejeon, and beyond.",
};

const galleryItems = [
  {
    src: "/images/hero/seoul-skyline.jpg",
    alt: "Seoul skyline at night with glittering city lights",
    label: "Seoul",
    category: "Sightseeing",
  },
  {
    src: "/images/experiences/gyeongbok-palace.jpg",
    alt: "Gyeongbokgung Palace traditional architecture",
    label: "Cultural",
    category: "Cultural",
  },
  {
    src: "/images/blog/cherry-blossoms-seoul.jpg",
    alt: "Cherry blossoms blooming along a Seoul street",
    label: "Seasonal",
    category: "Seasonal",
  },
  {
    src: "/images/experiences/hanbok-experience.jpg",
    alt: "Woman wearing traditional Korean hanbok",
    label: "Hanbok",
    category: "Cultural",
  },
  {
    src: "/images/experiences/busan-gamcheon.jpg",
    alt: "Gamcheon Culture Village colourful hillside houses in Busan",
    label: "Busan",
    category: "Sightseeing",
  },
  {
    src: "/images/blog/korean-education.jpg",
    alt: "Students exploring Gyeongbokgung Palace on an educational tour",
    label: "Education",
    category: "Education",
  },
  {
    src: "/images/blog/hongdae-night.jpg",
    alt: "Hongdae neon-lit street scene at night",
    label: "K-Culture",
    category: "K-Culture",
  },
  {
    src: "/images/experiences/hanbok-group.jpg",
    alt: "Group of students in traditional hanbok",
    label: "Hanbok",
    category: "Cultural",
  },
  {
    src: "/images/experiences/seoul-night.jpg",
    alt: "Seoul city skyline at sunset",
    label: "Seoul",
    category: "Sightseeing",
  },
  {
    src: "/images/experiences/cherry-night.jpg",
    alt: "Cherry blossoms illuminated at night",
    label: "Seasonal",
    category: "Seasonal",
  },
  {
    src: "/images/experiences/ddp-seoul.jpg",
    alt: "DDP (Dongdaemun Design Plaza) futuristic architecture in Seoul",
    label: "Architecture",
    category: "Sightseeing",
  },
  {
    src: "/images/experiences/jeju-aerial.jpg",
    alt: "Jeju Island aerial view with coastal landscape",
    label: "Jeju",
    category: "Sightseeing",
  },
  {
    src: "/images/experiences/seoul-namsan.jpg",
    alt: "Namsan Tower and Seoul night cityscape",
    label: "Seoul",
    category: "Sightseeing",
  },
  {
    src: "/images/blog/korea-university.jpg",
    alt: "University campus building in Korea",
    label: "University",
    category: "Education",
  },
  {
    src: "/images/experiences/hanbok-women.jpg",
    alt: "Women in colourful traditional hanbok attire",
    label: "K-Culture",
    category: "Cultural",
  },
  {
    src: "/images/experiences/ddp-interior.jpg",
    alt: "DDP interior with sweeping modern design",
    label: "Architecture",
    category: "Sightseeing",
  },
  {
    src: "/images/blog/vegetarian-korea.jpg",
    alt: "Korean market stalls with fresh produce",
    label: "K-Food",
    category: "K-Culture",
  },
];

const categoryColors: Record<string, string> = {
  Cultural: "bg-rose-100 text-rose-700",
  Education: "bg-indigo-100 text-indigo-700",
  Sightseeing: "bg-blue-100 text-blue-700",
  "K-Culture": "bg-purple-100 text-purple-700",
  Seasonal: "bg-green-100 text-green-700",
};

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
            subtitle="Real moments and iconic Korean destinations from our educational tours"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {galleryItems.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                className="relative aspect-video rounded-2xl overflow-hidden border border-surface shadow-sm group"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Category badge overlay */}
                <div className="absolute bottom-3 left-3">
                  <span
                    className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${
                      categoryColors[item.category] ?? "bg-zinc-100 text-zinc-700"
                    } opacity-90`}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
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
