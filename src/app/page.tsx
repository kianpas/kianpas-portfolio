import Link from "next/link";
import { getSortedPostsData } from "@/services/posts";

const Home = async () => {
  // 최근 포스트 3개 가져오기
  const recentPosts = getSortedPostsData().slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span
                className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                               dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 
                               bg-clip-text text-transparent"
              >
                안녕하세요
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300">
              개발자{" "}
              <span className="text-blue-600 dark:text-blue-400 font-bold">
                이운산
              </span>
              입니다
            </h2>
          </div>

          <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            웹 개발과 새로운 기술에 관심이 많은 개발자입니다.
          </p>
        </div>
      </section>

      {/* 최근 블로그 포스트 섹션 */}
      <section className="px-6 py-16 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          {/* 섹션 헤더 개선 */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              최근 글
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              개발과 기술에 대한 생각들을 정리하고 공유합니다
            </p>
          </div>

          <div className="space-y-8">
            {recentPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm 
                           hover:shadow-md transition-shadow duration-200 border border-gray-200 dark:border-gray-700"
              >
                <div className="space-y-4">
                  {/* 메타데이터 개선 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm">
                      <span
                        className="px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 
                                     dark:from-blue-900/40 dark:to-blue-800/20 
                                     text-blue-700 dark:text-blue-300 rounded-full font-medium
                                     border border-blue-200/50 dark:border-blue-700/50"
                      >
                        {post.category}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        •
                      </span>
                      <time
                        dateTime={post.date}
                        className="text-gray-500 dark:text-gray-400"
                      >
                        {new Date(post.date).toLocaleDateString("ko-KR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>

                    {/* 읽기 시간 추가 (예상) */}
                    <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      3분 읽기
                    </div>
                  </div>

                  {/* 제목 */}
                  <h3
                    className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 
                                 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    <Link href={`/blog/post/${post.id}`} className="block">
                      {post.title}
                    </Link>
                  </h3>

                  {/* 요약 개선 */}
                  {post.summary && (
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
                      {post.summary}
                    </p>
                  )}

                  {/* 하단 영역 개선 */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    {/* 태그 */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Link
                            key={tag}
                            href={`/blog/tag/${encodeURIComponent(tag)}`}
                            className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 
                                     text-gray-700 dark:text-gray-300 rounded-md 
                                     hover:bg-blue-100 dark:hover:bg-blue-900/30 
                                     hover:text-blue-700 dark:hover:text-blue-300
                                     transition-colors duration-200 font-medium"
                          >
                            #{tag}
                          </Link>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                            +{post.tags.length - 3}개 더
                          </span>
                        )}
                      </div>
                    )}

                    {/* 읽기 버튼 */}
                    <Link
                      href={`/blog/post/${post.id}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 
                               font-medium text-sm flex items-center gap-1 transition-colors duration-200"
                    >
                      읽어보기
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA 버튼 개선 */}
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 
                         bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg
                         transition-colors duration-200"
            >
              더 많은 글 보기
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
