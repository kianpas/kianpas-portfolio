"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi";

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // 하이드레이션 이후에만 렌더링 (Next.js 15 권장 패턴)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
    );
  }

  const themes = [
    { key: "light", icon: FiSun, label: "라이트" },
    { key: "dark", icon: FiMoon, label: "다크" },
    { key: "system", icon: FiMonitor, label: "시스템" },
  ] as const;

  const currentThemeIndex = themes.findIndex((t) => t.key === theme);
  const nextTheme = themes[(currentThemeIndex + 1) % themes.length];

  // 현재 테마의 아이콘 컴포넌트를 변수에 할당
  const CurrentIcon = themes[currentThemeIndex]?.icon || FiMonitor;

  return (
    <button
      onClick={() => setTheme(nextTheme.key)}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 
                 transition-colors duration-200 border border-gray-200 dark:border-gray-700"
      title={`현재: ${themes[currentThemeIndex]?.label || "시스템"}, 클릭하여 ${
        nextTheme.label
      }로 변경`}
      aria-label={`테마를 ${nextTheme.label}로 변경`}
    >
      <CurrentIcon size={18} className="text-gray-700 dark:text-gray-300" />
    </button>
  );
};

export default ThemeToggle;
