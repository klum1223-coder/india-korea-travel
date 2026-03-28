import { clsx } from "@/lib/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  /** Optional id placed on the <h2> — use with aria-labelledby on the parent <section> */
  id?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "mb-10",
        align === "center" ? "text-center" : "text-left"
      )}
    >
      {/* Decorative accent line */}
      <div
        className={clsx(
          "mb-3",
          align === "center" ? "flex justify-center" : "flex justify-start"
        )}
        aria-hidden="true"
      >
        <span className="inline-block h-1.5 w-14 rounded-full" style={{ backgroundImage: 'linear-gradient(90deg, #E8732A, #D4A843)' }} />
        <span className="inline-block h-1.5 w-4 rounded-full bg-secondary ml-1.5" />
      </div>

      <h2
        id={id}
        className="font-poppins text-3xl sm:text-4xl font-bold leading-tight gradient-text"
        style={{ backgroundImage: 'linear-gradient(135deg, #1B3A5C, #2D5F8A)' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-text-secondary text-base sm:text-lg max-w-2xl leading-relaxed mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
