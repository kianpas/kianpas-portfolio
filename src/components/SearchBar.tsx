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

  useEffect(() => {
    const searchPosts = async () => {
      if (query.length < 2) {
        setResults([]);
        setIsOpen(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        setResults(data.posts || []);
        setIsOpen(true);
      } catch (error) {
        console.error("검색 중 오류:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchPosts, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleResultClick = (postId: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/blog/post/${postId}`);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 dark:text-gray-100 
                     bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 
                     rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent
                     placeholder-gray-500 dark:placeholder-gray-400"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        {loading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>

      {/* 검색 결과 드롭다운 */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 
                        border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <ul className="py-2">
              {results.map((post) => (
                <li key={post.id}>
                  <button
                    onClick={() => handleResultClick(post.id)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 
                               transition-colors duration-150"
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                        {post.title}
                      </h4>
                      {post.summary && (
                        <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                          {post.summary}
                        </p>
                      )}
                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                        <span>{post.category}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : query.length >= 2 ? (
            <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
              검색 결과가 없습니다.
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBar;