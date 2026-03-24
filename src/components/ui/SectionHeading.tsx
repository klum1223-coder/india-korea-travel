import { clsx } from "@/lib/cn";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "center" | "left";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        "mb-10",
        align === "center" ? "text-center" : "text-left"
      )}
    >
      <h2 className="font-poppins text-3xl sm:text-4xl font-bold text-primary leading-tight">
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
