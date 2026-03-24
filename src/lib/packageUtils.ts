import { TourPackage } from "@/types";

/**
 * Returns a human-readable display name for a package derived from its slug.
 * e.g. "5n6d-seoul-busan" => "5N6D Seoul & Busan"
 */
export function getPackageName(pkg: TourPackage): string {
  const parts = pkg.slug.split("-");
  const code = parts[0].toUpperCase(); // e.g. "5N6D"
  const cityParts = parts.slice(1).map((p) => p.charAt(0).toUpperCase() + p.slice(1));
  const cityStr = cityParts.join(" & ");
  return `${code} ${cityStr}`;
}

/**
 * Returns a short label for a package (just the duration code).
 */
export function getPackageShortName(pkg: TourPackage): string {
  return pkg.slug.split("-")[0].toUpperCase();
}

/**
 * Extracts the starting price for a given pax count from either pricing shape.
 */
export function getStartingPricePax20(pkg: TourPackage): number | null {
  const pricing = pkg.pricing;
  if (Array.isArray(pricing)) {
    const prices = pricing.map((t) => t.pax20).filter((p): p is number => typeof p === "number");
    return prices.length > 0 ? Math.min(...prices) : null;
  }
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

/**
 * Extracts total meals count from inclusions text.
 * Returns a string like "17 meals" or null.
 */
export function getMealsInfo(pkg: TourPackage): string | null {
  for (const inc of pkg.inclusions) {
    const match = inc.match(/(\d+)\s+breakfast\s*\+\s*(\d+)\s+lunch\s*\+\s*(\d+)\s+dinner/i);
    if (match) {
      const total = parseInt(match[1]) + parseInt(match[2]) + parseInt(match[3]);
      return `${total} meals`;
    }
    // Simpler pattern like "Buffet breakfast + 5 Indian cuisine meals"
    const simpleMatch = inc.match(/(\d+)\s+(?:Indian cuisine|meals)/i);
    if (simpleMatch) {
      return `${simpleMatch[1]} meals incl.`;
    }
  }
  return null;
}
