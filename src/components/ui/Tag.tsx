"use client";

import { clsx } from "@/lib/cn";

interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function Tag({ label, active = false, onClick }: TagProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "inline-flex items-center px-3.5 py-1.5 rounded-full text-sm font-medium border transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        active
          ? "bg-gradient-to-r from-primary to-[#2D5F8A] text-white border-primary shadow-sm"
          : "bg-white text-text-secondary border-surface hover:border-primary hover:text-primary"
      )}
    >
      {label}
    </button>
  );
}
