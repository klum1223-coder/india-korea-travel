import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import destinationsData from "@/lib/data/destinations.json";
import type { Destination } from "@/types";

const destinations = destinationsData as Destination[];

function findDestination(city: string): Destination | undefined {
  return destinations.find((d) => d.slug === city);
}

export async function generateStaticParams() {
  return destinations.map((d) => ({ city: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city } = await params;
  const dest = findDestination(city);
  if (!dest) {
    return { title: "Destination Not Found | Discover Korea" };
  }
  return {
    title: `${dest.name} | Destinations | Discover Korea`,
    description: dest.heroTagline,
  };
}

const spotTypeBadgeColor: Record<string, string> = {
  history: "bg-amber-100 text-amber-800",
  viewpoint: "bg-sky-100 text-sky-800",
  traditional: "bg-orange-100 text-orange-800",
  culture: "bg-purple-100 text-purple-800",
  nature: "bg-green-100 text-green-800",
  shopping: "bg-pink-100 text-pink-800",
  youth: "bg-indigo-100 text-indigo-800",
  architecture: "bg-slate-100 text-slate-800",
  political: "bg-blue-100 text-blue-800",
  religious: "bg-teal-100 text-teal-800",
  temple: "bg-orange-100 text-orange-800",
  art: "bg-fuchsia-100 text-fuchsia-800",
  market: "bg-yellow-100 text-yellow-800",
  international: "bg-sky-100 text-sky-800",
  beach: "bg-cyan-100 text-cyan-800",
  science: "bg-blue-100 text-blue-800",
  education: "bg-indigo-100 text-indigo-800",
  technology: "bg-violet-100 text-violet-800",
  industry: "bg-zinc-100 text-zinc-800",
  attraction: "bg-rose-100 text-rose-800",
  traditional_culture: "bg-amber-100 text-amber-800",
  hiking: "bg-lime-100 text-lime-800",
};

function getSpotBadgeClasses(type: string): string {
  return spotTypeBadgeColor[type] ?? "bg-surface text-text-secondary";
}

const quickFactLabels: Record<keyof Destination["quickFacts"], string> = {
  population: "Population",
  language: "Language",
  currency: "Currency",
  timezone: "Timezone",
  bestSeason: "Best Season",
};

const quickFactIcons: Record<keyof Destination["quickFacts"], React.ReactNode> = {
  population: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  language: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
    </svg>
  ),
  currency: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  timezone: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  bestSeason: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
};

export default async function DestinationCityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city } = await params;
  const dest = findDestination(city);

  if (!dest) {
    notFound();
  }

  const factKeys = Object.keys(dest.quickFacts) as (keyof Destination["quickFacts"])[];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="relative bg-primary py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
        <Container className="relative z-10">
          <div className="max-w-3xl">
            <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-4">
              Destination Guide
            </p>
            <h1 className="font-poppins text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {dest.name}
            </h1>
            <p className="text-white/80 text-lg sm:text-xl">{dest.heroTagline}</p>
          </div>
        </Container>
      </section>

      {/* Quick Facts Bar */}
      <section className="bg-secondary">
        <Container>
          <div className="flex flex-wrap divide-x divide-white/20">
            {factKeys.map((key) => (
              <div key={key} className="flex-1 min-w-[140px] px-5 py-5 text-center text-white">
                <div className="flex justify-center mb-1 opacity-80">
                  {quickFactIcons[key]}
                </div>
                <p className="text-xs uppercase tracking-widest opacity-70 mb-0.5">
                  {quickFactLabels[key]}
                </p>
                <p className="font-poppins font-bold text-sm leading-tight">
                  {dest.quickFacts[key]}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Spots Grid */}
      <section className="py-16 bg-background">
        <Container>
          <SectionHeading
            title={`What to See in ${dest.name}`}
            subtitle="Key spots included in our curated school tour programs"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {dest.spots.map((spot) => (
              <div
                key={spot.name}
                className="bg-white rounded-2xl border border-surface shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 p-6 flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-poppins font-bold text-primary text-base leading-snug">
                    {spot.name}
                  </h3>
                  <span
                    className={`shrink-0 inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${getSpotBadgeClasses(spot.type)}`}
                  >
                    {spot.type}
                  </span>
                </div>
                <p className="text-text-secondary text-sm leading-relaxed">{spot.description}</p>
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
              Explore Packages Visiting {dest.name}
            </h2>
            <p className="text-white/70 text-lg mb-8">
              See which of our educational tour packages include {dest.name} on the itinerary.
            </p>
            <Button asChild size="lg">
              <Link href="/packages">View All Packages</Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
