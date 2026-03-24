import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { TourPackage } from "@/types";

interface PackageCardProps {
  pkg: TourPackage;
}

function getStartingPrice(pkg: TourPackage): number | null {
  const pricing = pkg.pricing;
  if (Array.isArray(pricing)) {
    const prices = pricing.map((t) => t.pax20).filter(Boolean);
    if (prices.length > 0) return Math.min(...prices);
    return null;
  }
  // Object pricing (8d7n, 9d8n, 10d9n styles)
  const p = pricing as Record<string, unknown>;
  const nums: number[] = [];
  for (const key of Object.keys(p)) {
    const val = p[key];
    if (typeof val === "object" && val !== null && "pax20" in val) {
      const pax20 = (val as { pax20: number }).pax20;
      if (typeof pax20 === "number") nums.push(pax20);
    }
  }
  return nums.length > 0 ? Math.min(...nums) : null;
}

function getBadgeVariant(badge: string | null): "default" | "success" | "info" {
  if (!badge) return "default";
  if (badge === "MOST POPULAR") return "success";
  if (badge === "PREMIUM") return "info";
  return "default";
}

export default function PackageCard({ pkg }: PackageCardProps) {
  const startingPrice = getStartingPrice(pkg);

  return (
    <div className="relative flex flex-col bg-white rounded-2xl border border-surface shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      {pkg.badge && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant={getBadgeVariant(pkg.badge)}>{pkg.badge}</Badge>
        </div>
      )}

      {/* Card header */}
      <div className="bg-primary px-6 pt-6 pb-8">
        <h3 className="font-poppins text-xl font-bold text-white mb-1">
          {pkg.name ?? pkg.slug.replace(/-/g, " ").toUpperCase()}
        </h3>
        <p className="text-white/70 text-sm">{pkg.tagline}</p>
      </div>

      {/* Curved divider */}
      <div className="h-4 bg-white" style={{ marginTop: "-1rem", borderRadius: "50% 50% 0 0 / 100% 100% 0 0", background: "white" }} />

      {/* Card body */}
      <div className="flex flex-col flex-1 px-6 pb-6 -mt-4">
        <div className="flex items-center gap-4 mb-4 text-sm text-text-secondary">
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {pkg.duration}
          </span>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {pkg.cities.join(", ")}
          </span>
        </div>

        {/* Highlights */}
        <ul className="space-y-1.5 mb-5 flex-1">
          {pkg.highlights.slice(0, 5).map((h) => (
            <li key={h} className="flex items-start gap-2 text-sm text-text-secondary">
              <svg className="w-4 h-4 text-success shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
              </svg>
              {h}
            </li>
          ))}
          {pkg.highlights.length > 5 && (
            <li className="text-xs text-text-secondary pl-6">+{pkg.highlights.length - 5} more highlights</li>
          )}
        </ul>

        {/* Price & CTA */}
        <div className="border-t border-surface pt-4 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-text-secondary">Starting from</p>
            <p className="text-2xl font-bold text-primary">
              {startingPrice ? `$${startingPrice.toLocaleString()}` : "Contact us"}
            </p>
            <p className="text-xs text-text-secondary">per person (20 pax)</p>
          </div>
          <Button asChild size="md">
            <Link href={`/packages/${pkg.slug}`}>View Details</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
