import Link from "next/link";
import { getSortedPostsData } from "@/services/posts";
import { formatReadingTime } from "@/utils/readingTime";
import { Button, Badge } from "@/components/ui";
import { Post } from "@/types/post";
import HeroSection from "@/app/_components/HeroSection";
import { FaClock, FaChevronRight } from "react-icons/fa6";

const Home = async () => {
  let recentPosts: Post[] = [];
  try {
    // 최근 포스트 3개 가져오기
    recentPosts = getSortedPostsData().slice(0, 3);
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    // 에러가 발생해도 페이지는 렌더링되도록 recentPosts를 빈 배열로 유지합니다.
  }

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 최근 블로그 포스트 섹션 */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* 섹션 헤더 */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              최근 글
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              개발과 기술에 대한 생각들을 정리하고 공유합니다
            </p>
          </div>

          {/* 포스트 그리드 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {recentPosts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/30 dark:hover:border-blue-600/30 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="space-y-4">
                  {/* 메타데이터 */}
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="info" size="sm">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <FaClock className="w-4 h-4" aria-hidden />
                      {formatReadingTime(post.readingTime)}
                    </div>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                    <Link href={`/blog/post/${post.slug}`} className="block">
                      {post.title}
                    </Link>
                  </h3>

                  {/* 요약 */}
                  {post.summary && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  )}

                  {/* 날짜와 태그 */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                    <time className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(post.date).toLocaleDateString("ko-KR", {
                        month: "short",
                        day: "numeric",
                      })}
                    </time>

                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-1">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
                          >
                            #{tag}
                          </span>
                        ))}
                        {post.tags.length > 2 && (
                          <span className="text-xs text-gray-400">
                            +{post.tags.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* 읽기 버튼 */}
                  <Link
                    href={`/blog/post/${post.slug}`}
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm group-hover:gap-3 transition-all duration-200"
                  >
                    읽어보기
                    <FaChevronRight className="w-4 h-4" aria-hidden />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div className="text-center">
            <Button variant="primary" size="lg">
              <Link href="/blog" className="flex items-center gap-2">
                더 많은 글 보기
                <FaChevronRight className="w-4 h-4" aria-hidden />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
