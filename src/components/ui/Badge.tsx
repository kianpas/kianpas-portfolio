"use client";

import { HTMLAttributes, forwardRef } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  children: React.ReactNode;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = "", variant = "default", size = "md", children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center rounded-full font-medium
      transition-all duration-200
    `;

    const variants = {
      default: `
        bg-[var(--ds-border-primary)] text-[var(--ds-text-primary)]
      `,
      success: `
        bg-[var(--ds-success)] text-white
      `,
      warning: `
        bg-[var(--ds-warning)] text-white
      `,
      error: `
        bg-[var(--ds-error)] text-white
      `,
      info: `
        bg-[var(--ds-info)] text-white
      `
    };

    const sizes = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1.5 text-sm"
    };

    const classes = [
      baseStyles,
      variants[variant],
      sizes[size],
      className
    ].filter(Boolean).join(' ');

    return (
      <span
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;