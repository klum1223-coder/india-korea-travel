import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ComparisonTable from "@/components/packages/ComparisonTable";
import PackageCard from "@/components/packages/PackageCard";
import packagesData from "@/lib/data/packages.json";
import type { TourPackage } from "@/types";

export const metadata: Metadata = {
  title: "Tour Packages | Discover Korea",
  description:
    "Choose from our range of educational Korea travel packages designed for Indian students — from 6-day cultural tours to 10-day comprehensive journeys.",
};

const packages = packagesData as unknown as TourPackage[];

export default function PackagesPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Hero section */}
      <section className="bg-primary py-16 sm:py-20">
        <Container>
          <div className="text-center text-white">
            <p className="text-secondary font-semibold uppercase tracking-widest text-sm mb-3">
              Educational Travel
            </p>
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold leading-tight mb-4">
              Tour Packages
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Choose the perfect educational journey for your students
            </p>
          </div>
        </Container>
      </section>

      {/* Comparison Table */}
      <section className="py-16">
        <Container>
          <SectionHeading
            title="Package Comparison"
            subtitle="Compare all packages side by side to find the best fit for your group"
          />
          <ComparisonTable packages={packages} />
        </Container>
      </section>

      {/* Package Cards */}
      <section className="pb-10">
        <Container>
          <SectionHeading
            title="All Packages"
            subtitle="Explore our curated educational journeys in detail"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packages.map((pkg) => (
              <PackageCard key={pkg.slug} pkg={pkg} />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
