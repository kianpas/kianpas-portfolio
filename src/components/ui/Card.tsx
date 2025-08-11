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
      rounded-xl backdrop-blur-sm transition-all duration-200
    `;

    const variants = {
      default: `
        bg-[rgba(255,255,255,0.02)] border border-[var(--ds-border-primary)]
      `,
      elevated: `
        bg-[rgba(255,255,255,0.05)] border border-[var(--ds-border-primary)]
        shadow-[rgba(0,0,0,0.1)_0px_10px_15px_-3px,rgba(0,0,0,0.05)_0px_4px_6px_-2px]
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