"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { FaBars, FaXmark } from "react-icons/fa6";

// 테마 토글을 동적 로딩으로 최적화
const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
  loading: () => (
    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
  ),
});

// 로고가 홈 링크를 겸하므로 메뉴에는 Home을 두지 않는다
const NAV_ITEMS = [
  { label: "Blog", href: "/blog" },
  { label: "Project", href: "/project" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header className="fixed top-0 z-50 h-16 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
      <div className="mx-auto flex h-full max-w-5xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-semibold">
            BLOG
          </Link>
        </div>

        {/* 중간 여백 */}
        <div className="flex-1"></div>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`border-b-2 pb-1 text-sm transition-colors ${
                isActive(item.href)
                  ? "border-orange-500 font-semibold text-gray-900 dark:text-gray-100"
                  : "border-transparent font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 테마 토글 (네비게이션 바로 옆) */}
        <div className="hidden md:flex ml-8">
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden relative z-50 flex items-center space-x-3">
          <ThemeToggle />
          <button
            aria-label="메뉴 열기"
            aria-expanded={!!isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 dark:text-gray-300 focus:outline-none p-2"
          >
            <span className="sr-only">메인 메뉴 열기</span>
            {isOpen ? (
              <FaXmark className="h-6 w-6" aria-hidden />
            ) : (
              <FaBars className="h-6 w-6" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (Full-Screen Overlay) */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex min-h-full flex-col items-center justify-center gap-8 px-6 pb-12 pt-24 text-center">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            aria-current={pathname === "/" ? "page" : undefined}
            className={`block py-4 text-2xl ${
              pathname === "/"
                ? "font-bold text-gray-900 dark:text-white"
                : "font-medium text-gray-600 dark:text-gray-300"
            }`}
          >
            Home
          </Link>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`block py-4 text-2xl ${
                isActive(item.href)
                  ? "font-bold text-gray-900 dark:text-white"
                  : "font-medium text-gray-600 dark:text-gray-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
