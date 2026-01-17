"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Post } from "@/types/post";
import { FaMagnifyingGlass } from "react-icons/fa6";

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

const SearchBar = ({
  placeholder = "글 제목, 내용, 태그로 검색...",
  className = "",
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);

  // 검색 실행
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const search = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/search?q=${query}`);

        if (!response.ok) {
          const msg =
            response.status === 404
              ? "검색 결과가 없습니다."
              : `검색 실패: ${response.status}`;
          setResults([]);
          setIsOpen(true);
          setError(msg);
          return;
        }

        const data = await response.json();
        setResults(data.posts || []);
        setIsOpen(true);

      } catch (error) {
        console.error("검색 오류:", error);
        setError("검색 오류")
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    // 300ms 지연 후 검색
    const timer = setTimeout(search, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {                                                                                                                            
    if (!isOpen) return;                                                                                                                       
                                                                                                                                               
    const handlePointerDown = (event: PointerEvent) => {                                                                                       
      if (!containerRef.current) return;                                                                                                       
      if (!containerRef.current.contains(event.target as Node)) {                                                                              
        setIsOpen(false);                                                                                                                      
      }                                                                                                                                        
    };                                                                                                                                         
                                                                                                                                               
    const handleKeyDown = (event: KeyboardEvent) => {                                                                                          
      if (event.key === "Escape") {                                                                                                            
        setIsOpen(false);                                                                                                                      
      }                                                                                                                                        
    };     
                                                                                                                                             
    document.addEventListener("pointerdown", handlePointerDown);                                                                               
    document.addEventListener("keydown", handleKeyDown);                                                                                       
                                                                                                                                               
    return () => {                                                                                                                             
      document.removeEventListener("pointerdown", handlePointerDown);                                                                          
      document.removeEventListener("keydown", handleKeyDown);                                                                                  
    };                                                                                                                                         
  }, [isOpen]);  

  // 결과 클릭 시 이동
  const goToPost = (slug: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/blog/post/${slug}`);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
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
          <FaMagnifyingGlass
            className="w-5 h-5 text-gray-400 dark:text-gray-400"
            aria-hidden="true"
          />
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
          {error ? (
            <div className="p-4 text-sm text-red-600 dark:text-red-400">
              {error}
            </div>) :
            results.length > 0 ? (
              results.map((post) => (
                <button
                  key={post.slug}
                  onClick={() => goToPost(post.slug)}
                  className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                >
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">
                    {post.title}
                  </h4>
                  {post.summary && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {post.summary}
                    </p>
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
