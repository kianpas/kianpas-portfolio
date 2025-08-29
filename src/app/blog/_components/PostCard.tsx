import { Post } from "@/types/post";
import Link from "next/link";
import { formatReadingTime } from "@/utils/readingTime";
import { Card, Badge } from "@/components/ui";

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const { slug, title, date, tags, summary, readingTime, category } = post;

  return (
    <Card
      variant="elevated"
      className="group hover:border-blue-300/30 dark:hover:border-blue-600/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
    >
      <Link href={`/blog/post/${slug}`} className="block">
        <div className="space-y-4">
          {/* 메타데이터 */}
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
              {category && (
                <Badge variant="info" size="sm">
                  {category}
                </Badge>
              )}
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clipRule="evenodd"
                  />
                </svg>
                <time dateTime={date} className="font-medium">
                  {new Date(date).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              </div>
            </div>

            {/* 읽기 시간 */}
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
              <span>{formatReadingTime(readingTime)}</span>
            </div>
          </div>

          {/* 제목 */}
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
            {title}
          </h2>

          {/* 요약 */}
          {summary && (
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3">
              {summary}
            </p>
          )}

          {/* 태그와 읽기 버튼 */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            {/* 태그 */}
            {tags && tags.length > 0 && (
              <div className="flex gap-2">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
                {tags.length > 3 && (
                  <span className="text-xs text-gray-400">
                    +{tags.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* 읽기 버튼 */}
            <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm group-hover:gap-3 transition-all duration-200">
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
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default PostCard;
