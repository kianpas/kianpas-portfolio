import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // 다크 모드
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Menlo", "Monaco", "monospace"],
      },
      // 다크모드 전환 애니메이션
      transitionProperty: {
        theme: "background-color, border-color, color, fill, stroke",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
} satisfies Config;
