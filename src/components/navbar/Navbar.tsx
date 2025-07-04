"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog" },
    { label: "Project", href: "/project" },
    { label: "About", href: "/about" },
  ];

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

        {/* Desktop */}
        <div className="hidden md:flex space-x-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href === "/blog" ? "/blog/page/1" : item.href}
              className={getLinkClassName(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            aria-label="메뉴 열기"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 dark:text-gray-300 focus:outline-none p-2 z-50 relative"
          >
            <span className="sr-only">메인 메뉴 열기</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Full-Screen Overlay) */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 bg-white dark:bg-gray-900 z-40 transform transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="px-4 pb-4 space-y-6">
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
