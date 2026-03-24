import { clsx } from "@/lib/cn";

type BadgeVariant = "default" | "success" | "info";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-accent text-white",
  success: "bg-success text-white",
  info: "bg-blue-500 text-white",
};

export default function Badge({ variant = "default", children }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide",
        variantClasses[variant]
      )}
    >
      {children}
    </span>
  );
}
