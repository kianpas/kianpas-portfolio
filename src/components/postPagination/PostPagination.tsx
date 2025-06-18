"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const ArrowIcon = ({ direction }: { direction: "left" | "right" }) => (
  <svg
    className="size-5"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    {direction === "left" ? (
      <path
        fillRule="evenodd"
        d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
        clipRule="evenodd"
      />
    ) : (
      <path
        fillRule="evenodd"
        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
        clipRule="evenodd"
      />
    )}
  </svg>
);

const PostPagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // 페이지네이션 숫자 배열 생성 로직
  const generatePagination = (current: number, total: number) => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current < 5) {
      return [1, 2, 3, 4, 5, "...", total];
    }

    if (current > total - 4) {
      return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
    }

    return [1, "...", current - 1, current, current + 1, "...", total];
  };

  const allPages = generatePagination(currentPage, totalPages);

  // 버튼 비활성화 시 적용될 공통 클래스
  const disabledClass = "pointer-events-none text-gray-400 dark:text-gray-600";

  return (
    <nav aria-label="Pagination">
      <div className="flex justify-between gap-1">
        {/* Previous Button */}
        <Link
          href={createPageURL(currentPage - 1)}
          className={`relative inline-flex items-center rounded-md px-2 py-2 text-gray-700 dark:text-gray-200 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 ${
            currentPage <= 1 ? disabledClass : ""
          }`}
          aria-disabled={currentPage <= 1}
          tabIndex={currentPage <= 1 ? -1 : undefined}
        >
          <span className="sr-only">Previous</span>
          <ArrowIcon direction="left" />
        </Link>

        {/* Page Numbers */}
        <div className="hidden sm:flex sm:gap-1">
          {allPages.map((page, index) => {
            const isActive = page === currentPage;

            // page가 '...' (Ellipsis)인 경우
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  ...
                </span>
              );
            }

            // page가 숫자인 경우
            return (
              <Link
                key={page}
                href={createPageURL(page)}
                className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold ${
                  isActive
                    ? "z-10 bg-indigo-600 text-white" // 활성 상태 스타일
                    : "text-gray-900 dark:text-gray-100 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800" // 기본 상태 스타일
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {page}
              </Link>
            );
          })}
        </div>

        {/* Next Button */}
        <Link
          href={createPageURL(currentPage + 1)}
          className={`relative inline-flex items-center rounded-md px-2 py-2 text-gray-700 dark:text-gray-200 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 ${
            currentPage >= totalPages ? disabledClass : ""
          }`}
          aria-disabled={currentPage >= totalPages}
          tabIndex={currentPage >= totalPages ? -1 : undefined}
        >
          <span className="sr-only">Next</span>
          <ArrowIcon direction="right" />
        </Link>
      </div>
    </nav>
  );
};

export default PostPagination;
