import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ItineraryAccordion from "@/components/packages/ItineraryAccordion";
import PricingTable from "@/components/packages/PricingTable";
import packagesData from "@/lib/data/packages.json";
import { getPackageName, getStartingPricePax20, getMealsInfo } from "@/lib/packageUtils";
import type { TourPackage } from "@/types";

const packages = packagesData as unknown as TourPackage[];

function findPackage(slug: string): TourPackage | undefined {
  return packages.find((p) => p.slug === slug);
}

export async function generateStaticParams() {
  return packages.map((pkg) => ({ slug: pkg.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pkg = findPackage(slug);
  if (!pkg) {
    return { title: "Package Not Found | Discover Korea" };
  }
  return {
    title: `${getPackageName(pkg)} | Tour Packages | Discover Korea`,
    description: pkg.tagline,
  };
}

function getBadgeVariant(badge: string | null): "default" | "success" | "info" {
  if (badge === "MOST POPULAR") return "success";
  if (badge === "PREMIUM") return "info";
  return "default";
}

export default async function PackageDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pkg = findPackage(slug);

  if (!pkg) {
    notFound();
  }

  const packageName = getPackageName(pkg);
  const startingPrice = getStartingPricePax20(pkg);
  const mealsInfo = getMealsInfo(pkg);

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Banner */}
      <section className="bg-primary py-16 sm:py-24">
        <Container>
          <div className="max-w-3xl">
            {pkg.badge && (
              <div className="mb-4">
                <Badge variant={getBadgeVariant(pkg.badge)}>{pkg.badge}</Badge>
              </div>
            )}
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              {packageName}
            </h1>
            <p className="text-white/80 text-lg sm:text-xl mb-8">{pkg.tagline}</p>
            <div className="flex flex-wrap gap-4 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {pkg.duration}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {pkg.cities.join(" · ")}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Facts Bar */}
      <section className="bg-secondary">
        <Container>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-white/20">
            <div className="px-6 py-5 text-center text-white">
              <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Duration</p>
              <p className="font-bold text-lg font-poppins">{pkg.duration}</p>
            </div>
            <div className="px-6 py-5 text-center text-white">
              <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Cities</p>
              <p className="font-bold text-lg font-poppins">{pkg.cities.length} Cities</p>
            </div>
            <div className="px-6 py-5 text-center text-white">
              <p className="text-xs uppercase tracking-widest opacity-80 mb-1">Meals</p>
              <p className="font-bold text-lg font-poppins">{mealsInfo ?? "Included"}</p>
            </div>
            <div className="px-6 py-5 text-center text-white">
              <p className="text-xs uppercase tracking-widest opacity-80 mb-1">From (20 pax)</p>
              <p className="font-bold text-lg font-poppins">
                {startingPrice ? `$${startingPrice.toLocaleString()}` : "Request Quote"}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Highlights */}
      <section className="py-14">
        <Container>
          <SectionHeading title="Package Highlights" align="left" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {pkg.highlights.map((h) => (
              <div key={h} className="flex items-start gap-3 bg-white rounded-xl border border-surface px-4 py-3 shadow-sm">
                <svg className="w-5 h-5 text-secondary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-text-primary">{h}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Day-by-Day Itinerary */}
      <section className="py-14 bg-surface/50">
        <Container>
          <SectionHeading
            title="Day-by-Day Itinerary"
            subtitle="A carefully crafted schedule balancing education, culture, and fun"
            align="left"
          />
          <ItineraryAccordion itinerary={pkg.itinerary} />
        </Container>
      </section>

      {/* Pricing */}
      <section className="py-14">
        <Container>
          <SectionHeading
            title="Pricing"
            subtitle="Transparent group pricing — choose the tier that fits your budget"
            align="left"
          />
          <PricingTable pkg={pkg} />
        </Container>
      </section>

      {/* Inclusions & Exclusions */}
      <section className="py-14 bg-surface/50">
        <Container>
          <SectionHeading title="What's Included" align="left" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inclusions */}
            <div className="bg-white rounded-2xl border border-surface p-6 shadow-sm">
              <h3 className="font-poppins font-bold text-primary text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-success" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                Inclusions
              </h3>
              <ul className="space-y-2.5">
                {pkg.inclusions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-success shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-white rounded-2xl border border-surface p-6 shadow-sm">
              <h3 className="font-poppins font-bold text-primary text-lg mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                </svg>
                Exclusions
              </h3>
              <ul className="space-y-2.5">
                {pkg.exclusions.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-red-400 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Optional Programs */}
      {pkg.optionalPrograms && pkg.optionalPrograms.length > 0 && (
        <section className="py-14">
          <Container>
            <SectionHeading title="Optional Programs" subtitle="Enhance your trip with these add-on experiences" align="left" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {pkg.optionalPrograms.map((prog) => (
                <div key={prog} className="flex items-start gap-3 bg-white rounded-xl border border-surface px-4 py-3 shadow-sm">
                  <svg className="w-5 h-5 text-accent shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 2a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L10 14.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L2.82 8.124a.75.75 0 01.416-1.28l4.21-.611L9.327 2.418A.75.75 0 0110 2z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-text-primary">{prog}</span>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Hotel Information */}
      {pkg.hotels && Object.keys(pkg.hotels).length > 0 && (
        <section className={`py-14 ${(!pkg.optionalPrograms || pkg.optionalPrograms.length === 0) ? '' : 'bg-surface/50'}`}>
          <Container>
            <SectionHeading title="Hotel Information" align="left" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
              {Object.entries(pkg.hotels).map(([key, value]) => {
                const label = key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (s) => s.toUpperCase())
                  .replace(/^Three/, "3-")
                  .replace(/^Four/, "4-")
                  .replace(/Star/, "Star")
                  .trim();
                return (
                  <div key={key} className="bg-white rounded-xl border border-surface p-5 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wide text-secondary mb-1">{label}</p>
                    <p className="text-sm text-text-primary">{value}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <Container>
          <div className="text-center text-white">
            <h2 className="font-poppins text-3xl sm:text-4xl font-bold mb-4">
              Ready to Book?
            </h2>
            <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
              Contact our team to customise this package for your school group and get a tailored quote.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <Link href="/contact">Request a Quote</Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link href="/contact">Request Itinerary</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
