import { clsx } from "@/lib/cn";
import React from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "outline-white" | "gradient";
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
    "bg-secondary text-white hover:bg-secondary/90 active:bg-secondary/80 shadow-md hover:shadow-lg hover:scale-[1.03] focus-visible:ring-secondary/70",
  outline:
    "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus-visible:ring-primary/50",
  "outline-white":
    "border-2 border-white text-white bg-transparent hover:bg-white hover:text-primary focus-visible:ring-white/60",
  ghost:
    "bg-transparent text-primary hover:bg-primary/10 active:bg-primary/20 focus-visible:ring-primary/40",
  gradient:
    "text-white shadow-md hover:shadow-lg hover:scale-[1.04] focus-visible:ring-secondary/70 [background-image:linear-gradient(135deg,#E8732A,#D4A843)] [background-size:200%_200%] [background-position:0%_0%] hover:[background-position:100%_100%] transition-all duration-300",
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
    "inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
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
