import Link from "next/link";
import { ReactNode } from "react";
import { FaArrowRight, FaChevronLeft } from "react-icons/fa6";

type Props = {
  href: string;
  children: ReactNode;
  /** forward: 뒤에 → / back: 앞에 ← */
  direction?: "forward" | "back";
  /** 색·굵기 등 오버라이드 (기본: text-gray-500 font-medium) */
  className?: string;
};

/** 화살표가 달린 텍스트 링크. hover 시 화살표가 방향으로 밀린다 */
const ArrowLink = ({
  href,
  children,
  direction = "forward",
  className = "font-medium text-gray-500 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400",
}: Props) => (
  <Link
    href={href}
    className={`group inline-flex items-center gap-2 text-sm transition-colors ${className}`}
  >
    {direction === "back" && (
      <FaChevronLeft
        className="h-3 w-3 transition-transform group-hover:-translate-x-1"
        aria-hidden
      />
    )}
    {children}
    {direction === "forward" && (
      <FaArrowRight
        className="h-3 w-3 transition-transform group-hover:translate-x-1"
        aria-hidden
      />
    )}
  </Link>
);

export default ArrowLink;
