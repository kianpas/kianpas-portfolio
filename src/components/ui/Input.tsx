"use client";

import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, helperText, ...props }, ref) => {
    const inputClasses = [
      `
      w-full px-3 py-2 rounded-lg border transition-colors duration-200
      bg-[rgba(255,255,255,0.05)] border-[var(--ds-border-primary)]
      text-[var(--ds-text-primary)] placeholder-[var(--ds-text-tertiary)]
      focus:outline-none focus:ring-2 focus:ring-[var(--ds-accent-primary)] focus:border-transparent
      disabled:opacity-50 disabled:cursor-not-allowed
      `,
      error && "border-[var(--ds-error)] focus:ring-[var(--ds-error)]",
      className
    ].filter(Boolean).join(' ');

    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-[var(--ds-text-primary)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={inputClasses}
          {...props}
        />
        {error && (
          <p className="text-sm text-[var(--ds-error)]">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-[var(--ds-text-tertiary)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;