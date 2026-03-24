import { clsx } from "@/lib/cn";
import React from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  asChild?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80 shadow-sm",
  outline:
    "border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-white",
  ghost:
    "bg-transparent text-primary hover:bg-primary/10 active:bg-primary/20",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm rounded-md",
  md: "px-5 py-2.5 text-base rounded-lg",
  lg: "px-7 py-3.5 text-lg rounded-xl",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  asChild,
  ...rest
}: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/60 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children as React.ReactElement<{ className?: string }>,
      {
        className: clsx(
          (children as React.ReactElement<{ className?: string }>).props
            .className,
          classes
        ),
      }
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
