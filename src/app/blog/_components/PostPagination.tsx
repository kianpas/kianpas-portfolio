import Link from "next/link";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

const ArrowIcon = ({ direction }: { direction: "left" | "right" }) =>
  direction === "left" ? (
    <FaChevronLeft className="size-5" aria-hidden />
  ) : (
    <FaChevronRight className="size-5" aria-hidden />
  );

const PostPagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const hasPrevPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  // 페이지 번호와 생략 부호를 생성하는 로직
  // [1, "...", 4, 5, 6, "...", 10]
  // [1, 2, 3, "...", 10]
  const getPagination = () => {
    const pages = [];
    const sideWidth = 1; // 현재 페이지 양쪽에 보여줄 페이지 수
    const ellipsis = "...";
    if (totalPages <= 5) {
      // 전체 페이지가 5개 이하일 경우 모두 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1); //첫 페이지 무조건 표시

      if (currentPage > sideWidth + 2) {
        pages.push(ellipsis);
      }

      const startPage = Math.max(2, currentPage - sideWidth);
      const endPage = Math.min(totalPages - 1, currentPage + sideWidth);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - sideWidth - 1) {
        pages.push(ellipsis);
      }

      pages.push(totalPages); //마지막 페이지 무조건 표시
    }
    return pages;
  };

  const pageNumbers = getPagination();

  return (
    <nav aria-label="Pagination">
      <div className="flex justify-center items-center mt-10 gap-x-4">
        {hasPrevPage ? (
          <Link
            href={`/blog/page/${currentPage - 1}`}
            aria-disabled={!hasPrevPage}
            className="relative inline-flex items-center rounded-md px-2 py-2 text-gray-700 dark:text-gray-200 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowIcon direction="left" />
          </Link>
        ) : (
          <span className="pointer-events-none text-gray-400 dark:text-gray-600">
            <ArrowIcon direction="left" />
          </span>
        )}
        <div className="hidden sm:flex sm:gap-1">
          {/* 페이지 번호 버튼 */}
          {pageNumbers.map((pageNum, index) =>
            pageNum === "..." ? (
              <span
                key={`ellipsis-${index}`}
                className="px-3 py-1 text-gray-500"
              >
                ...
              </span>
            ) : (
              <Link
                key={pageNum}
                href={`/blog/page/${pageNum}`}
                aria-current={pageNum === currentPage ? "page" : undefined}
                className={`px-3 py-1 rounded-md border ${
                  pageNum === currentPage
                    ? "bg-gray-200 dark:bg-gray-700 font-bold"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                {pageNum}
              </Link>
            )
          )}
        </div>

        {hasNextPage ? (
          <Link
            href={`/blog/page/${currentPage + 1}`}
            aria-disabled={!hasNextPage}
            className="relative inline-flex items-center rounded-md px-2 py-2 text-gray-700 dark:text-gray-200 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowIcon direction="right" />
          </Link>
        ) : (
          <span className="pointer-events-none text-gray-400 dark:text-gray-600">
            <ArrowIcon direction="right" />
          </span>
        )}
      </div>
    </nav>
  );
};

export default PostPagination;
