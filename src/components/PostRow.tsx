import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { Post } from "@/types/post";
import { formatReadingTime } from "@/utils/readingTime";

type PostRowVariant = "featured" | "row" | "compact";

type Props = {
  post: Post;
  /**
   * featured: 목록 상단의 대형 노출 (카테고리·날짜 메타 컬럼 + 큰 제목 + 요약 + 태그)
   * row: 기본 목록 행 (날짜 메타 컬럼 + 카테고리 + 제목 + 요약 + 화살표)
   * compact: 좁은 컬럼용 축약 행 (카테고리 + 제목 + 날짜)
   */
  variant?: PostRowVariant;
  className?: string;
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

const PostRow = ({ post, variant = "row", className = "" }: Props) => {
  const href = `/blog/post/${post.slug}`;

  if (variant === "featured") {
    return (
      <Link href={href} className={`group block ${className}`}>
        <article className="grid gap-6 md:grid-cols-[11rem_1fr] md:gap-12">
          <div className="font-mono text-xs leading-6 text-gray-500 dark:text-gray-400">
            <p className="font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">
              {post.category}
            </p>
            <time dateTime={post.date} className="mt-2 block">
              {formatDate(post.date)}
            </time>
            <p>{formatReadingTime(post.readingTime)}</p>
          </div>
          <div>
            <h2 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-gray-950 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400 sm:text-4xl">
              {post.title}
            </h2>
            {post.summary && (
              <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
                {post.summary}
              </p>
            )}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-gray-500 dark:text-gray-400">
                {post.tags.slice(0, 4).map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>
            )}
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={href} className={`group block ${className}`}>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-orange-600 dark:text-orange-400">
          {post.category}
        </p>
        <h3 className="text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400 sm:text-xl">
          {post.title}
        </h3>
        <time
          dateTime={post.date}
          className="mt-3 block font-mono text-xs text-gray-500 dark:text-gray-400"
        >
          {formatDate(post.date)}
        </time>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group grid gap-4 py-8 md:grid-cols-[11rem_1fr_auto] md:items-start md:gap-12 ${className}`}
    >
      <div className="flex gap-3 font-mono text-xs text-gray-500 dark:text-gray-400 md:block">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <p className="md:mt-1">{formatReadingTime(post.readingTime)}</p>
      </div>
      <article>
        <p className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">
          {post.category}
        </p>
        <h2 className="text-xl font-bold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400 sm:text-2xl">
          {post.title}
        </h2>
        {post.summary && (
          <p className="mt-3 line-clamp-2 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">
            {post.summary}
          </p>
        )}
      </article>
      <FaArrowRight
        className="mt-2 hidden h-4 w-4 text-gray-300 transition-all group-hover:translate-x-1 group-hover:text-orange-500 dark:text-gray-600 md:block"
        aria-hidden
      />
    </Link>
  );
};

export default PostRow;
