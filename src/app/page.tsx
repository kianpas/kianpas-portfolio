import Link from "next/link";
import { getSortedPostsData } from "@/services/posts";
import { formatReadingTime } from "@/utils/readingTime";
import { Button, Badge } from "@/components/ui";

const Home = async () => {
  // 최근 포스트 3개 가져오기
  const recentPosts = getSortedPostsData().slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-8">
            {/* 메인 제목 */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="block text-gray-900 dark:text-white mb-2">
                  안녕하세요,
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                  이운산입니다
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                웹 개발과 새로운 기술에 관심이 많은 개발자입니다.
                <br />
                <span className="text-lg text-gray-500 dark:text-gray-400">
                  사용자 경험을 중시하며, 깔끔하고 효율적인 코드를 작성합니다.
                </span>
              </p>
            </div>

            {/* CTA 버튼들 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button variant="primary" size="lg" className="min-w-[160px]">
                <Link href="/blog" className="flex items-center gap-2">
                  블로그 보기
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
              </Button>

              <Button variant="secondary" size="lg" className="min-w-[160px]">
                <Link href="/project" className="flex items-center gap-2">
                  프로젝트 보기
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
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Link>
              </Button>
            </div>

            {/* 기술 스택 */}
            <div className="pt-12">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                주로 사용하는 기술
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Java", "React", "Next.js", "TypeScript", "TailwindCSS"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-white/90 dark:hover:bg-gray-800/90 transition-colors"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

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
                key={post.id}
                className="group bg-white/90 dark:bg-gray-800/90 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300/30 dark:hover:border-blue-600/30 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="space-y-4">
                  {/* 메타데이터 */}
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="info" size="sm">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
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
                      {formatReadingTime(post.readingTime)}
                    </div>
                  </div>

                  {/* 제목 */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                    <Link href={`/blog/post/${post.id}`} className="block">
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
                    href={`/blog/post/${post.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm group-hover:gap-3 transition-all duration-200"
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
              </article>
            ))}
          </div>

          {/* CTA 버튼 */}
          <div className="text-center">
            <Button variant="primary" size="lg">
              <Link href="/blog" className="flex items-center gap-2">
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
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
