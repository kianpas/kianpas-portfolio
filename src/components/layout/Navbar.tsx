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

const Navbar = () => {
  const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Project", href: "/project" },
    { label: "About", href: "/about" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return null;

  const getLinkClassName = (href: string, isMobile: boolean = false) => {
    //  pathname이 해당 href로 시작하면 활성화
    const isActive =
      href === "/" ? pathname === href : pathname.startsWith(href);

    if (isMobile) {
      return `block py-4 text-2xl text-center font-bold ${
        isActive
          ? "text-gray-900 dark:text-white"
          : "text-gray-700 dark:text-gray-300"
      }`;
    }

    return `font-bold transition-colors pb-1 ${
      isActive
        ? "text-gray-900 dark:text-gray-100"
        : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
    }`;
  };

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 shadow-sm fixed top-0 w-full z-50 h-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-semibold">
            BLOG
          </Link>
        </div>

        {/* 중간 여백 */}
        <div className="flex-1"></div>

        {/* Desktop */}
        <nav className="hidden md:flex space-x-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href === "/blog" ? "/blog/page/1" : item.href}
              className={getLinkClassName(item.href)}
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
        <div className="md:hidden flex items-center space-x-3">
          <ThemeToggle />
          <button
            aria-label="메뉴 열기"
            aria-expanded={!!isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 dark:text-gray-300 focus:outline-none p-2 z-50 relative"
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
        className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-60 overflow-y-auto transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex min-h-full flex-col items-center justify-center gap-8 px-6 pb-12 pt-24 text-center">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={getLinkClassName(item.href, true)}
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
