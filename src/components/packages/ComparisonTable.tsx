"use client";

import { useState } from "react";
import { TourPackage } from "@/types";
import { clsx } from "@/lib/cn";

interface ComparisonTableProps {
  packages: TourPackage[];
}

type RowKey =
  | "price20"
  | "duration"
  | "cities"
  | "universityVisits"
  | "industryVisits"
  | "kCulture"
  | "ktx"
  | "dmz"
  | "themePark";

interface RowDef {
  key: RowKey;
  label: string;
}

const ROWS: RowDef[] = [
  { key: "price20", label: "Price (20 pax)" },
  { key: "duration", label: "Duration" },
  { key: "cities", label: "Cities" },
  { key: "universityVisits", label: "University Visits" },
  { key: "industryVisits", label: "Industry Visits" },
  { key: "kCulture", label: "K-Culture Activity" },
  { key: "ktx", label: "KTX Bullet Train" },
  { key: "dmz", label: "DMZ Tour" },
  { key: "themePark", label: "Theme Park" },
];

function hasHighlight(highlights: string[], ...terms: string[]): boolean {
  return terms.some((term) =>
    highlights.some((h) => h.toLowerCase().includes(term.toLowerCase()))
  );
}

function getStartingPrice20(pkg: TourPackage): string {
  const pricing = pkg.pricing;
  if (Array.isArray(pricing)) {
    const prices = pricing.map((t) => t.pax20).filter(Boolean) as number[];
    if (prices.length > 0) return `$${Math.min(...prices).toLocaleString()}`;
  } else {
    const p = pricing as Record<string, unknown>;
    const nums: number[] = [];
    for (const key of Object.keys(p)) {
      const val = p[key];
      if (typeof val === "object" && val !== null && "pax20" in val) {
        nums.push((val as { pax20: number }).pax20);
      }
    }
    if (nums.length > 0) return `$${Math.min(...nums).toLocaleString()}`;
  }
  return "—";
}

function getCellValue(pkg: TourPackage, key: RowKey): string | boolean {
  const itinerary = pkg.itinerary ?? [];
  const allActivities = itinerary.flatMap((d) => d.activities ?? []);
  const highlights = pkg.highlights ?? [];
  const allText = [...allActivities, ...highlights];

  switch (key) {
    case "price20":
      return getStartingPrice20(pkg);
    case "duration":
      return pkg.duration;
    case "cities":
      return pkg.cities.join(", ");
    case "universityVisits":
      return hasHighlight(allText, "university", "KAIST", "Yonsei", "Seoul National");
    case "industryVisits":
      return hasHighlight(allText, "Hyundai", "Samsung", "KARI", "Robot", "Nuclear", "Heavy Industries");
    case "kCulture":
      return hasHighlight(allText, "K-pop", "Taekwondo", "Kimchi", "Hanbok", "Nanta", "Painters");
    case "ktx":
      return hasHighlight(allText, "KTX");
    case "dmz":
      return hasHighlight(allText, "DMZ");
    case "themePark":
      return hasHighlight(allText, "Everland", "theme park", "Theme Park");
    default:
      return "—";
  }
}

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-success mx-auto" fill="currentColor" viewBox="0 0 20 20" aria-label="Included">
      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-5 h-5 text-text-secondary/40 mx-auto" fill="currentColor" viewBox="0 0 20 20" aria-label="Not included">
      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

function getPackageLabel(pkg: TourPackage): string {
  return pkg.name ?? pkg.slug.replace(/-/g, " ").toUpperCase();
}

export default function ComparisonTable({ packages }: ComparisonTableProps) {
  const [activeCol, setActiveCol] = useState<string | null>(null);

  return (
    <div className="overflow-x-auto rounded-2xl border border-surface shadow-sm">
      <table className="w-full text-sm border-collapse min-w-[640px]">
        <thead>
          <tr>
            <th className="bg-surface px-5 py-4 text-left font-semibold text-primary w-40 sticky left-0 z-10">
              Feature
            </th>
            {packages.map((pkg) => {
              const isPopular = pkg.badge === "MOST POPULAR";
              const isActive = activeCol === pkg.slug;
              return (
                <th
                  key={pkg.slug}
                  className={clsx(
                    "px-4 py-4 text-center font-semibold transition-colors duration-200 cursor-pointer",
                    isPopular
                      ? "bg-secondary text-white"
                      : isActive
                      ? "bg-primary/10 text-primary"
                      : "bg-surface text-primary"
                  )}
                  onClick={() => setActiveCol(isActive ? null : pkg.slug)}
                >
                  <div className="flex flex-col items-center gap-1">
                    {pkg.badge && (
                      <span
                        className={clsx(
                          "inline-block px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide",
                          isPopular ? "bg-white text-secondary" : "bg-accent text-white"
                        )}
                      >
                        {pkg.badge}
                      </span>
                    )}
                    <span className="text-xs font-normal opacity-80">{pkg.duration}</span>
                    <span className="font-bold text-sm leading-tight">{getPackageLabel(pkg)}</span>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row, rowIdx) => (
            <tr
              key={row.key}
              className={clsx(
                "border-t border-surface transition-colors",
                rowIdx % 2 === 0 ? "bg-white" : "bg-background"
              )}
            >
              <td className="px-5 py-3.5 font-medium text-text-primary sticky left-0 bg-inherit">
                {row.label}
              </td>
              {packages.map((pkg) => {
                const isPopular = pkg.badge === "MOST POPULAR";
                const val = getCellValue(pkg, row.key);
                return (
                  <td
                    key={pkg.slug}
                    className={clsx(
                      "px-4 py-3.5 text-center",
                      isPopular && "bg-secondary/5"
                    )}
                  >
                    {typeof val === "boolean" ? (
                      val ? <CheckIcon /> : <XIcon />
                    ) : (
                      <span className={clsx("text-text-secondary", isPopular && "font-semibold text-primary")}>
                        {val}
                      </span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
