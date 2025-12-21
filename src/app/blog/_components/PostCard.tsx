import { Post } from "@/types/post";
import Link from "next/link";
import { formatReadingTime } from "@/utils/readingTime";
import { Card, Badge } from "@/components/ui";
import { FaCalendar, FaClock, FaChevronRight } from "react-icons/fa6";

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
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {category && (
                <Badge variant="info" size="sm">
                  {category}
                </Badge>
              )}
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 whitespace-nowrap shrink-0">
                <FaCalendar className="w-4 h-4 max-[375px]:w-3 max-[375px]:h-3" aria-hidden />
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
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 whitespace-nowrap shrink-0">
              <FaClock className="w-4 h-4 max-[375px]:w-3 max-[375px]:h-3" aria-hidden />
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
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
            {/* 태그 */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 w-full md:w-auto">
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
            <div className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm group-hover:gap-3 transition-all duration-200 shrink-0 self-end md:self-auto">
              읽어보기
              <FaChevronRight className="w-4 h-4" aria-hidden />
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default PostCard;
