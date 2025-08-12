"use client";

import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
  padding?: "none" | "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", variant = "default", padding = "md", children, ...props }, ref) => {
    const baseStyles = `
      rounded-xl transition-all duration-200
    `;

    const variants = {
      default: `
        bg-white/60 dark:bg-gray-800/60 border border-[var(--ds-border-primary)]
      `,
      elevated: `
        bg-white/70 dark:bg-gray-800/70 border border-[var(--ds-border-primary)]
        shadow-sm
      `,
      outlined: `
        bg-transparent border-2 border-[var(--ds-border-primary)]
      `
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8"
    };

    const classes = [
      baseStyles,
      variants[variant],
      paddings[padding],
      className
    ].filter(Boolean).join(' ');

    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;