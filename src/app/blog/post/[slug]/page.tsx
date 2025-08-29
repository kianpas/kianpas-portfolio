import { notFound } from "next/navigation";
import { getPostData, getAllPostSlugs } from "@/services/posts";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";
import ImageOptimizer from "@/components/ImageOptimizer";
import { formatReadingTime } from "@/utils/readingTime";
import { Badge, Button } from "@/components/ui";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map((path) => ({ slug: path.params.slug }));
}

const SinglePostPage = async ({ params }: PageProps) => {
  const { slug } = await params;
  const { postData, prevPost, nextPost } = await getPostData(slug);

  if (!postData) {
    notFound();
  }

  return (
    <div className="min-h-screen">
  
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <ReadingProgress />
        <ImageOptimizer />

        {/* 헤더: 제목과 메타정보 - 전체 너비 */}
        <header className="mb-8 md:mb-10 text-center max-w-4xl mx-auto">
          {/* 카테고리 배지 */}
          {postData.category && (
            <div className="mb-6">
              <Link href={`/blog/category/${postData.category}`}>
                <Badge
                  variant="info"
                  size="md"
                  className="hover:scale-105 transition-transform duration-200"
                >
                  {postData.category}
                </Badge>
              </Link>
            </div>
          )}

          {/* 제목 */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tighter 
                       text-gray-900 dark:text-gray-100 mb-6 
                       bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                       dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 
                       bg-clip-text text-transparent"
          >
            {postData.title}
          </h1>

          {/* 메타 정보 */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6 
                        text-gray-600 dark:text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 
                            rounded-full flex items-center justify-center text-white text-sm font-bold"
              >
                {(postData.author || "K")[0].toUpperCase()}
              </div>
              <span className="font-medium">
                {postData.author || "Kianpas"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-primary-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              <time dateTime={postData.date} className="font-medium">
                {postData.date}
              </time>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-primary-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">
                {formatReadingTime(postData.readingTime)}
              </span>
            </div>
          </div>

          {/* 태그 */}
          {postData.tags && postData.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {postData.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag}`}
                  className="px-3 py-1.5 text-sm font-medium rounded-full 
                           bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300
                           hover:bg-primary-100 dark:hover:bg-primary-900 
                           hover:text-primary-700 dark:hover:text-primary-300 
                           transition-all duration-200 hover:scale-105"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* 메인 콘텐츠 - 중앙 배치 */}
        <article className="max-w-4xl mx-auto fade-in">
          {/* 본문 */}
          <div className="relative">
            {/* 읽기 진행률 표시 (선택적) */}
            <div className="sticky top-4 z-10 mb-8">
              <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-300"
                  style={{ width: "0%" }}
                  id="reading-progress"
                ></div>
              </div>
            </div>

            <div
              className="prose prose-lg md:prose-base prose-neutral dark:prose-invert max-w-none leading-7
                        prose-headings:font-bold prose-headings:tracking-tight 
                        prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                        prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                        prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:font-medium 
                        prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-2
                        prose-code:text-primary-700 dark:prose-code:text-primary-300 
                        prose-code:bg-primary-50 dark:prose-code:bg-primary-900/30 
                        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-normal
                        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 
                        prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:rounded-xl
                        prose-img:rounded-xl prose-img:shadow-lg dark:prose-img:shadow-dark-lg
                        prose-blockquote:border-l-4 prose-blockquote:border-primary-500 
                        prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-primary-50/50 
                        dark:prose-blockquote:bg-primary-900/20 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
                        prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                        prose-ul:space-y-2 prose-ol:space-y-2"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
          </div>

          {/* 이전/다음 글 네비게이션 */}
          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prevPost ? (
                <Link
                  href={`/blog/post/${prevPost.slug}`}
                  className="group flex items-center gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-700 
                         hover:border-primary-300 dark:hover:border-primary-600 
                         hover:bg-primary-50 dark:hover:bg-primary-900/20 
                         transition-all duration-300 hover:shadow-md dark:hover:shadow-dark-md"
                >
                  <div className="flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 
                                flex items-center justify-center group-hover:bg-primary-200 
                                dark:group-hover:bg-primary-800 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-primary-600 dark:text-primary-400 transform 
                                  group-hover:-translate-x-1 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wide mb-1">
                      Previous Post
                    </div>
                    <div className="text-gray-900 dark:text-gray-100 font-semibold truncate">
                      {prevPost.title}
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  href={`/blog/post/${nextPost.slug}`}
                  className="group flex items-center gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-700 
                         hover:border-primary-300 dark:hover:border-primary-600 
                         hover:bg-primary-50 dark:hover:bg-primary-900/20 
                         transition-all duration-300 hover:shadow-md dark:hover:shadow-dark-md text-right"
                >
                  <div className="flex-1 min-w-0">
                    <div className="text-xs uppercase text-gray-500 dark:text-gray-400 font-semibold tracking-wide mb-1">
                      Next Post
                    </div>
                    <div className="text-gray-900 dark:text-gray-100 font-semibold truncate">
                      {nextPost.title}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div
                      className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 
                                flex items-center justify-center group-hover:bg-primary-200 
                                dark:group-hover:bg-primary-800 transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-primary-600 dark:text-primary-400 transform 
                                  group-hover:translate-x-1 transition-transform"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* 블로그로 돌아가기 버튼 */}
            <div className="mt-12 text-center">
              <Button variant="primary" size="lg">
                <Link href="/blog" className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  블로그로 돌아가기
                </Link>
              </Button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default SinglePostPage;
