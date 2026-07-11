import Link from "next/link";
import { Post } from "@/types/post";
import { formatReadingTime } from "@/utils/readingTime";
import { FaArrowRight } from "react-icons/fa6";
import SearchBar from "@/components/SearchBar";

type Props = {
  post: Post[];
  showSearch?: boolean;
  emphasizeLatest?: boolean;
};

const PostFeed = ({ post, showSearch = false, emphasizeLatest = true }: Props) => {
  const latestPost = emphasizeLatest ? post[0] : undefined;
  const previousPosts = emphasizeLatest ? post.slice(1) : post;

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 border-b border-gray-200 pb-5 dark:border-gray-700 sm:mb-14">
          <div>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
              Latest writing
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
              최근 글
            </h1>
          </div>
        </div>

        {showSearch && (
          <div className="mb-12 max-w-xl">
            <SearchBar placeholder="제목, 내용, 태그로 검색" />
          </div>
        )}

        {latestPost ? (
          <div>
            <Link
              href={`/blog/post/${latestPost.slug}`}
              className="group block border-b border-gray-200 pb-10 dark:border-gray-700 sm:pb-12"
            >
              <article className="grid gap-6 md:grid-cols-[11rem_1fr] md:gap-12">
                <div className="font-mono text-xs leading-6 text-gray-500 dark:text-gray-400">
                  <p className="font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">
                    {latestPost.category}
                  </p>
                  <time dateTime={latestPost.date} className="mt-2 block">
                    {new Date(latestPost.date).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </time>
                  <p>{formatReadingTime(latestPost.readingTime)}</p>
                </div>
                <div>
                  <h2 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-gray-950 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400 sm:text-4xl">
                    {latestPost.title}
                  </h2>
                  {latestPost.summary && (
                    <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
                      {latestPost.summary}
                    </p>
                  )}
                  {latestPost.tags && latestPost.tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-gray-500 dark:text-gray-400">
                      {latestPost.tags.slice(0, 4).map((tag) => (
                        <span key={tag}>#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Link>

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {previousPosts.map((currentPost) => (
                <Link
                  key={currentPost.slug}
                  href={`/blog/post/${currentPost.slug}`}
                  className="group grid gap-4 py-8 md:grid-cols-[11rem_1fr_auto] md:items-start md:gap-12"
                >
                  <div className="flex gap-3 font-mono text-xs text-gray-500 dark:text-gray-400 md:block">
                    <time dateTime={currentPost.date}>
                      {new Date(currentPost.date).toLocaleDateString("ko-KR", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </time>
                    <p className="md:mt-1">{formatReadingTime(currentPost.readingTime)}</p>
                  </div>
                  <article>
                    <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">
                      {currentPost.category}
                    </p>
                    <h2 className="text-xl font-bold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400 sm:text-2xl">
                      {currentPost.title}
                    </h2>
                    {currentPost.summary && (
                      <p className="mt-3 line-clamp-2 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">
                        {currentPost.summary}
                      </p>
                    )}
                  </article>
                  <FaArrowRight className="mt-2 hidden h-4 w-4 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-orange-500 dark:text-gray-600 md:block" aria-hidden />
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <p className="py-20 text-center text-gray-500 dark:text-gray-400">
            아직 작성된 글이 없습니다.
          </p>
        )}

      </div>
    </section>
  );
};

export default PostFeed;
