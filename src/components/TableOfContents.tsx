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

const TableOfContents = ({ content, isMobile = false }: TableOfContentsProps) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // HTML에서 헤딩 추출
  useEffect(() => {
    const regex = /<h([1-6])[^>]*id="([^"]*)"[^>]*>(?:<a[^>]*>)?([^<]+)(?:<\/a>)?<\/h[1-6]>/gi;
    const headings: TocItem[] = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      headings.push({
        id: match[2],
        text: match[3].trim(),
        level: parseInt(match[1]),
      });
    }
    setToc(headings);
  }, [content]);

  // 스크롤 시 활성 헤딩 찾기
  useEffect(() => {
    if (toc.length === 0 || isMobile) return;

    const findActiveHeading = () => {
      const scrollY = window.scrollY;
      
      // 현재 화면에 보이는 헤딩 찾기
      for (let i = toc.length - 1; i >= 0; i--) {
        const element = document.getElementById(toc[i].id);
        if (element && scrollY >= element.offsetTop - 150) {
          setActiveId(toc[i].id);
          return;
        }
      }
      
      // 첫 번째 헤딩을 기본값으로
      if (toc.length > 0) {
        setActiveId(toc[0].id);
      }
    };

    findActiveHeading();
    window.addEventListener('scroll', findActiveHeading);
    return () => window.removeEventListener('scroll', findActiveHeading);
  }, [toc, isMobile]);

  // 헤딩으로 스크롤
  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // navbar + 여백
        behavior: "smooth",
      });
    }
  };

  if (toc.length === 0) return null;

  // 모바일용
  if (isMobile) {
    return (
      <div className="space-y-1">
        {toc.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`w-full text-left py-2 px-3 rounded text-sm ${
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

  // 데스크톱용 (sticky)
  return (
    <div className="sticky top-24">
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">목차</h3>
        </div>
        <div className="p-4 max-h-[70vh] overflow-y-auto">
          {toc.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToHeading(item.id)}
              className={`block w-full text-left py-2 px-3 rounded text-sm mb-1 ${
                activeId === item.id
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              style={{ paddingLeft: `${12 + (item.level - 1) * 12}px` }}
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;