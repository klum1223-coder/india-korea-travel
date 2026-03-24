import { TourPackage, PricingTier } from "@/types";

interface PricingTableProps {
  pkg: TourPackage;
}

// Normalise the two shapes of pricing data into a renderable list of rows.
function normalisePricing(
  pricing: TourPackage["pricing"]
): Array<{ label: string; pax15?: number; pax20?: number; pax25?: number; pax30?: number; sglSupplement?: number }> {
  if (Array.isArray(pricing)) {
    // Shape used by 5n6d: PricingTier[]
    const tiers = pricing as PricingTier[];
    return tiers.map((t) => ({
      label: t.hotelClass,
      pax15: t.pax15,
      pax20: t.pax20,
      pax25: t.pax25,
      pax30: t.pax30,
      sglSupplement: t.sglSupplement,
    }));
  }

  // Shape used by 8d7n, 9d8n, 10d9n: an object with tier keys
  const p = pricing as Record<string, unknown>;
  const rows: Array<{ label: string; pax15?: number; pax20?: number; pax25?: number; pax30?: number; sglSupplement?: number }> = [];
  let sharedSgl: number | undefined;

  for (const key of Object.keys(p)) {
    if (key === "sglSupplement") {
      sharedSgl = p[key] as number;
      continue;
    }
    const val = p[key] as { pax15?: number; pax20?: number; pax25?: number; pax30?: number };
    const label = key
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (s) => s.toUpperCase())
      .trim();
    rows.push({
      label,
      pax15: val.pax15,
      pax20: val.pax20,
      pax25: val.pax25,
      pax30: val.pax30,
    });
  }

  // Attach sglSupplement to every row when it's a shared field
  if (sharedSgl !== undefined) {
    rows.forEach((r) => (r.sglSupplement = sharedSgl));
  }

  return rows;
}

export default function PricingTable({ pkg }: PricingTableProps) {
  const rows = normalisePricing(pkg.pricing);
  const hasPax25 = rows.some((r) => r.pax25 !== undefined);

  return (
    <div className="overflow-x-auto rounded-2xl border border-surface shadow-sm">
      <table className="w-full text-sm border-collapse min-w-[560px]">
        <thead>
          <tr className="bg-primary text-white">
            <th className="px-5 py-4 text-left font-semibold rounded-tl-2xl">Package / Hotel</th>
            <th className="px-4 py-4 text-center font-semibold">15 Pax</th>
            <th className="px-4 py-4 text-center font-semibold">20 Pax</th>
            {hasPax25 && <th className="px-4 py-4 text-center font-semibold">25 Pax</th>}
            <th className="px-4 py-4 text-center font-semibold">30 Pax</th>
            <th className="px-4 py-4 text-center font-semibold rounded-tr-2xl">Sgl. Supplement</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={row.label}
              className={idx % 2 === 0 ? "bg-white" : "bg-background"}
            >
              <td className="px-5 py-3.5 font-semibold text-primary">{row.label}</td>
              <td className="px-4 py-3.5 text-center text-text-secondary">
                {row.pax15 ? `$${row.pax15.toLocaleString()}` : "—"}
              </td>
              <td className="px-4 py-3.5 text-center font-semibold text-secondary">
                {row.pax20 ? `$${row.pax20.toLocaleString()}` : "—"}
              </td>
              {hasPax25 && (
                <td className="px-4 py-3.5 text-center text-text-secondary">
                  {row.pax25 ? `$${row.pax25.toLocaleString()}` : "—"}
                </td>
              )}
              <td className="px-4 py-3.5 text-center text-text-secondary">
                {row.pax30 ? `$${row.pax30.toLocaleString()}` : "—"}
              </td>
              <td className="px-4 py-3.5 text-center text-text-secondary">
                {row.sglSupplement ? `+$${row.sglSupplement.toLocaleString()}` : "—"}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-surface border-t border-surface">
            <td colSpan={hasPax25 ? 6 : 5} className="px-5 py-3 text-xs text-text-secondary rounded-b-2xl">
              * All prices in USD per person. Twin-sharing basis. Subject to availability and season surcharges.
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
