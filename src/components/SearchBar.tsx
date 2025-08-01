"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/types/post";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar = ({ placeholder = "검색어를 입력하세요...", className = "" }: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // 검색 실행
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const search = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${query}`);
        const data = await response.json();
        setResults(data.posts || []);
        setIsOpen(true);
      } catch (error) {
        console.error("검색 오류:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    // 300ms 지연 후 검색
    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // 결과 클릭 시 이동
  const goToPost = (postId: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/blog/post/${postId}`);
  };

  return (
    <div className={`relative ${className}`}>
      {/* 검색 입력창 */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500
                     bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                     border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
        />
        
        {/* 검색 아이콘 */}
        <div className="absolute left-3 top-2.5">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        
        {/* 로딩 스피너 */}
        {loading && (
          <div className="absolute right-3 top-2.5">
            <div className="animate-spin w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>

      {/* 검색 결과 */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            results.map((post) => (
              <button
                key={post.id}
                onClick={() => goToPost(post.id)}
                className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{post.title}</h4>
                {post.summary && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{post.summary}</p>
                )}
                <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>{post.category}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </button>
            ))
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              검색 결과가 없습니다.
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;