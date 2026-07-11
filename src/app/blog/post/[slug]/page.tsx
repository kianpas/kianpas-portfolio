import { notFound } from "next/navigation";
import { getPostData, getAllPostSlugs } from "@/services/posts";
import Link from "next/link";
import ReadingProgress from "@/components/ReadingProgress";
import ImageOptimizer from "@/components/ImageOptimizer";
import { formatReadingTime } from "@/utils/readingTime";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";

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
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        <ReadingProgress />
        <ImageOptimizer />

        <header className="mx-auto mb-12 max-w-4xl border-b border-gray-200 pb-10 dark:border-gray-700 sm:mb-16 sm:pb-14">
          <div className="mb-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
            {postData.category && (
              <Link
                href={`/blog/category/${postData.category}`}
                className="font-semibold text-orange-600 transition-colors hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
              >
                {postData.category}
              </Link>
            )}
            <span aria-hidden>·</span>
            <time dateTime={postData.date}>{postData.date}</time>
            <span aria-hidden>·</span>
            <span>{formatReadingTime(postData.readingTime)}</span>
          </div>

          <h1 className="max-w-4xl text-3xl font-extrabold leading-[1.18] tracking-tight text-gray-950 dark:text-white sm:text-5xl lg:text-6xl">
            {postData.title}
          </h1>

          {postData.tags && postData.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-gray-500 dark:text-gray-400">
              {postData.tags.map((tag) => (
                <Link key={tag} href={`/blog/tag/${tag}`} className="transition-colors hover:text-orange-600 dark:hover:text-orange-400">
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        <article className="max-w-4xl mx-auto fade-in">
          <div className="relative">
            <div
              className="prose prose-neutral md:prose-lg dark:prose-invert max-w-none leading-7
                        prose-headings:font-bold prose-headings:tracking-tight 
                        prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                        prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                        prose-a:text-orange-600 dark:prose-a:text-orange-400 prose-a:font-medium
                        prose-a:underline prose-a:decoration-orange-300 prose-a:underline-offset-4 hover:prose-a:decoration-orange-600
                        prose-code:text-orange-700 dark:prose-code:text-orange-300
                        prose-code:bg-orange-50 dark:prose-code:bg-orange-950/30
                        prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-normal
                        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 
                        prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:rounded-xl
                        prose-img:rounded-xl prose-img:shadow-lg dark:prose-img:shadow-dark-lg
                        prose-blockquote:border-l-4 prose-blockquote:border-orange-500
                        prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-orange-50/60
                        dark:prose-blockquote:bg-orange-950/20 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
                        prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                        prose-ul:space-y-2 prose-ol:space-y-2"
              dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
            />
          </div>

          <footer className="mt-16 border-t border-gray-200 pt-8 dark:border-gray-700">
            <div className="grid grid-cols-1 divide-y divide-gray-200 dark:divide-gray-700 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
              {prevPost ? (
                <Link
                  href={`/blog/post/${prevPost.slug}`}
                  className="group flex items-start gap-4 py-6 sm:pr-8"
                >
                  <FaChevronLeft className="mt-1 h-4 w-4 shrink-0 text-gray-400 transition-all group-hover:-translate-x-1 group-hover:text-orange-500" aria-hidden />
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      Previous Post
                    </div>
                    <div className="font-semibold leading-snug text-gray-900 transition-colors group-hover:text-orange-600 dark:text-gray-100 dark:group-hover:text-orange-400">
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
                  className="group flex items-start gap-4 py-6 text-right sm:pl-8"
                >
                  <div className="flex-1 min-w-0">
                    <div className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                      Next Post
                    </div>
                    <div className="font-semibold leading-snug text-gray-900 transition-colors group-hover:text-orange-600 dark:text-gray-100 dark:group-hover:text-orange-400">
                      {nextPost.title}
                    </div>
                  </div>
                  <FaChevronRight className="mt-1 h-4 w-4 shrink-0 text-gray-400 transition-all group-hover:translate-x-1 group-hover:text-orange-500" aria-hidden />
                </Link>
              ) : (
                <div />
              )}
            </div>

            <Link href="/blog/page/1" className="group mt-10 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition-colors hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400">
              <FaChevronLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" aria-hidden />
              전체 글로 돌아가기
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
};

export default SinglePostPage;
