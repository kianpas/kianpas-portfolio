import Link from "next/link";
import { Post } from "@/types/post";

interface RelatedPostsProps {
  currentPost: Post;
  allPosts: Post[];
  maxPosts?: number;
  className?: string;
}

const RelatedPosts = ({ 
  currentPost, 
  allPosts, 
  maxPosts = 3, 
  className = "" 
}: RelatedPostsProps) => {
  // 관련 글 찾기 로직
  const getRelatedPosts = (): Post[] => {
    const currentTags = currentPost.tags || [];
    const currentCategory = currentPost.category;
    
    // 현재 글 제외
    const otherPosts = allPosts.filter(post => post.id !== currentPost.id);
    
    // 점수 기반 관련도 계산
    const scoredPosts = otherPosts.map(post => {
      let score = 0;
      
      // 같은 카테고리면 +3점
      if (post.category === currentCategory) {
        score += 3;
      }
      
      // 공통 태그 개수만큼 +2점씩
      const commonTags = (post.tags || []).filter(tag => 
        currentTags.includes(tag)
      );
      score += commonTags.length * 2;
      
      // 최신 글일수록 +1점 (최근 30일 내)
      const daysDiff = Math.abs(
        new Date(currentPost.date).getTime() - new Date(post.date).getTime()
      ) / (1000 * 60 * 60 * 24);
      
      if (daysDiff <= 30) {
        score += 1;
      }
      
      return { post, score };
    });
    
    // 점수순으로 정렬하고 상위 N개 반환
    return scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, maxPosts)
      .map(item => item.post);
  };

  const relatedPosts = getRelatedPosts();

  if (relatedPosts.length === 0) return null;

  return (
    <section className={`${className}`}>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
        관련 글
      </h3>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 
                       hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            <Link href={`/blog/post/${post.id}`} className="block p-6 space-y-4">
              {/* 카테고리 */}
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 text-xs font-medium rounded-full 
                               bg-blue-100 dark:bg-blue-900/30 
                               text-blue-700 dark:text-blue-300">
                  {post.category}
                </span>
                <time className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(post.date).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>

              {/* 제목 */}
              <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 
                           line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 
                           transition-colors duration-200">
                {post.title}
              </h4>

              {/* 요약 */}
              {post.summary && (
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {post.summary}
                </p>
              )}

              {/* 태그 */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 
                               text-gray-600 dark:text-gray-400 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400 px-1">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RelatedPosts;