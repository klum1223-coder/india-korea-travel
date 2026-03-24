"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Tag from "@/components/ui/Tag";
import experiencesData from "@/lib/data/experiences.json";
import type { Experience, ExperienceCategory } from "@/types";

const experiences = experiencesData as Experience[];

type FilterCategory = "all" | ExperienceCategory;

const categoryFilters: { label: string; value: FilterCategory }[] = [
  { label: "All", value: "all" },
  { label: "Educational", value: "educational" },
  { label: "Industrial", value: "industrial" },
  { label: "Cultural", value: "cultural" },
  { label: "K-Wave", value: "kwave" },
  { label: "Sightseeing", value: "sightseeing" },
];

const categoryBadgeVariant: Record<ExperienceCategory, "default" | "success" | "info"> = {
  educational: "info",
  industrial: "default",
  cultural: "success",
  kwave: "default",
  sightseeing: "info",
};

const categoryLabel: Record<ExperienceCategory, string> = {
  educational: "Educational",
  industrial: "Industrial",
  cultural: "Cultural",
  kwave: "K-Wave",
  sightseeing: "Sightseeing",
};

function getAllCities(list: Experience[]): string[] {
  const cities = Array.from(new Set(list.map((e) => e.city))).sort();
  return cities;
}

function getDurationIcon(duration: string) {
  return (
    <svg className="w-4 h-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

export default function ExperiencesPage() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");
  const [activeCity, setActiveCity] = useState<string>("all");

  const allCities = getAllCities(experiences);

  const filtered = experiences.filter((exp) => {
    const categoryMatch = activeCategory === "all" || exp.category === activeCategory;
    const cityMatch = activeCity === "all" || exp.city === activeCity;
    return categoryMatch && cityMatch;
  });

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="bg-primary py-16 sm:py-20">
        <Container>
          <div className="text-center text-white">
            <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-3">
              Korea Study Tours
            </p>
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold leading-tight mb-4">
              Experiences
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Discover what makes Korea unforgettable
            </p>
          </div>
        </Container>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-surface shadow-sm py-4">
        <Container>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Category tags */}
            <div className="flex flex-wrap gap-2 flex-1">
              {categoryFilters.map((filter) => (
                <Tag
                  key={filter.value}
                  label={filter.label}
                  active={activeCategory === filter.value}
                  onClick={() => setActiveCategory(filter.value)}
                />
              ))}
            </div>
            {/* City dropdown */}
            <div className="shrink-0">
              <label htmlFor="city-filter" className="sr-only">Filter by city</label>
              <select
                id="city-filter"
                value={activeCity}
                onChange={(e) => setActiveCity(e.target.value)}
                className="border border-surface rounded-full px-4 py-1.5 text-sm font-medium text-text-primary bg-white hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer transition-colors"
              >
                <option value="all">All Cities</option>
                {allCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </Container>
      </section>

      {/* Results count */}
      <section className="py-8">
        <Container>
          <div className="mb-2">
            <SectionHeading
              title={`${filtered.length} Experience${filtered.length !== 1 ? "s" : ""}`}
              subtitle={
                activeCategory === "all" && activeCity === "all"
                  ? "Browse all experiences included in our Korea programs"
                  : "Filtered results — adjust the filters above to explore more"
              }
              align="left"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-text-secondary">
              <svg className="w-12 h-12 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
              <p className="text-lg font-medium">No experiences match the current filters.</p>
              <button
                className="mt-4 text-sm text-secondary underline cursor-pointer"
                onClick={() => { setActiveCategory("all"); setActiveCity("all"); }}
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((exp) => (
                <div
                  key={exp.id}
                  className="bg-white rounded-2xl border border-surface shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Card header */}
                  <div className="p-6 flex-1 flex flex-col gap-3">
                    {/* Badges row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant={categoryBadgeVariant[exp.category]}>
                        {categoryLabel[exp.category]}
                      </Badge>
                      <span className="inline-flex items-center gap-1 text-xs text-text-secondary bg-surface px-2.5 py-0.5 rounded-full">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {exp.city}
                      </span>
                    </div>

                    {/* Name */}
                    <h2 className="font-poppins font-bold text-primary text-lg leading-snug">
                      {exp.name}
                    </h2>

                    {/* Description */}
                    <p className="text-text-secondary text-sm leading-relaxed flex-1">
                      {exp.description}
                    </p>

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      {getDurationIcon(exp.duration)}
                      <span>{exp.duration}</span>
                    </div>
                  </div>

                  {/* Included packages footer */}
                  {exp.includedInPackages.length > 0 && (
                    <div className="border-t border-surface px-6 py-4 bg-surface/40">
                      <p className="text-xs font-semibold text-text-secondary uppercase tracking-wide mb-2">
                        Included in
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.includedInPackages.map((pkg) => (
                          <span
                            key={pkg}
                            className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-0.5 rounded-full"
                          >
                            {pkg}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
