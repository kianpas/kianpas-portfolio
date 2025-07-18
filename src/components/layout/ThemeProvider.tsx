"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  useEffect(() => {
    // 초기 로딩 시 전환 효과 비활성화
    document.documentElement.classList.add("preload");

    // 짧은 시간 후 전환 효과 활성화
    const timer = setTimeout(() => {
      document.documentElement.classList.remove("preload");
      document.documentElement.classList.add("theme-transition");
    }, 100);

    return () => clearTimeout(timer);
  }, []);
  
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
