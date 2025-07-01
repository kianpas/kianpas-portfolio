"use client";

import { useState } from "react";
import Link from "next/link";
// import { usePathname } from "next/navigation";

const Navbar = () => {
  const NAV_ITEMS = [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/blog/page/1" },
    { label: "Project", href: "/project" },
    { label: "About", href: "/about" },
  ];

  // 모바일시 햄버거 메뉴 클릭 여부
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm fixed top-0 w-full z-50 h-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-semibold">
            LOGO
          </Link>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex space-x-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <button
            aria-label="mobile-btn"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-600 dark:text-gray-300 focus:outline-none"
          >
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

      {/* Mobile Links */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-800 dark:text-gray-100 hover:text-blue-500 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
