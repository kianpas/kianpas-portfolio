"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  children: React.ReactNode;
}

const baseStyles = `
      inline-flex items-center justify-center gap-2 rounded-lg font-medium
      transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

const variants = {
  primary: `
        bg-[var(--ds-btn-primary-bg)] text-[var(--ds-btn-primary-color)]
        hover:bg-[var(--ds-btn-primary-hover)] focus:ring-[var(--ds-accent-primary)]
        shadow-[rgba(0,0,0,0)_0px_8px_2px_0px,rgba(0,0,0,0.01)_0px_5px_2px_0px,rgba(0,0,0,0.04)_0px_3px_2px_0px,rgba(0,0,0,0.07)_0px_1px_1px_0px,rgba(0,0,0,0.08)_0px_0px_1px_0px]
      `,
  secondary: `
        bg-transparent text-[var(--ds-text-primary)] border border-[var(--ds-border-primary)]
        hover:bg-[var(--ds-border-secondary)] focus:ring-[var(--ds-accent-primary)]
      `,
  ghost: `
        bg-transparent text-[var(--ds-text-secondary)]
        hover:bg-[var(--ds-border-secondary)] hover:text-[var(--ds-text-primary)]
        focus:ring-[var(--ds-accent-primary)]
      `,
  danger: `
        bg-[var(--ds-error)] text-white
        hover:bg-red-600 focus:ring-red-500
      `,
};

const sizes = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      loading,
      children,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const classes = [
      baseStyles,
      variants[variant],
      sizes[size],
      loading && "cursor-wait",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        type={type}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
