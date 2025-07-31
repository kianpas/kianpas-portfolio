"use client";

import { useEffect, useState } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
  isMobile?: boolean;
}

const TableOfContents = ({
  content,
  isMobile = false,
}: TableOfContentsProps) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // HTML에서 헤딩 태그 추출
    const headingRegex =
      /<h([1-6])[^>]*id="([^"]*)"[^>]*>(?:<a[^>]*>)?([^<]+)(?:<\/a>)?<\/h[1-6]>/gi;
    const headings: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      headings.push({
        id: match[2],
        text: match[3].trim(),
        level: parseInt(match[1]),
      });
    }

    setToc(headings);
  }, [content]);

  useEffect(() => {
    if (toc.length === 0 || isMobile) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 활성 헤딩 찾기
      const headingElements = toc
        .map(({ id }) => {
          const element = document.getElementById(id);
          if (element) {
            return {
              id,
              offsetTop: element.offsetTop,
            };
          }
          return null;
        })
        .filter(Boolean);

      let currentId = "";
      for (let i = headingElements.length - 1; i >= 0; i--) {
        const heading = headingElements[i];
        if (heading && scrollY >= heading.offsetTop - 150) {
          currentId = heading.id;
          break;
        }
      }

      if (!currentId && headingElements.length > 0) {
        currentId = headingElements[0]!.id;
      }

      if (currentId !== activeId) {
        setActiveId(currentId);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [toc, activeId, isMobile]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 64; // navbar 높이
      const offset = 20; // 추가 여백
      const elementPosition = element.offsetTop - navbarHeight - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  if (toc.length === 0) return null;

  // 모바일용 단순 렌더링
  if (isMobile) {
    return (
      <div className="space-y-1">
        {toc.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`w-full text-left py-2 px-3 rounded text-sm transition-colors ${
              activeId === item.id
                ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
            style={{ paddingLeft: `${12 + (item.level - 1) * 16}px` }}
          >
            {item.text}
          </button>
        ))}
      </div>
    );
  }

  // 데스크톱용 sticky 렌더링 (본문 옆에서 고정)
  return (
    <div
      className="sticky top-24"
      style={{
        // sticky 문제 해결을 위한 추가 스타일
        position: "-webkit-sticky",
        alignSelf: "flex-start",
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            목차
          </h3>
        </div>
        <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
          <div className="space-y-1">
            {toc.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToHeading(item.id)}
                className={`w-full text-left py-2 px-3 rounded text-sm transition-colors ${
                  activeId === item.id
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
                style={{ paddingLeft: `${12 + (item.level - 1) * 12}px` }}
              >
                <span className="block truncate">{item.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
