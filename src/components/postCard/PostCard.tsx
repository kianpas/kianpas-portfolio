import { Post } from "@/types/post";
import Link from "next/link";

type PostCardProps = {
  post: Post;
};

const PostCard = ({ post }: PostCardProps) => {
  const { id, title, date, tags, summary } = post;

  return (
    <li className="py-6">
      <article>
        <Link
          href={`/blog/post/${id}`}
          className="group block rounded-xl p-5 -m-5 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-4 mb-3 text-sm text-gray-500 dark:text-gray-400">
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
                <time dateTime={date} className="font-medium">
                  {date}
                </time>
              </div>
            </div>

            {/* 제목 */}
            <h2 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            {summary && (
              <div className="prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-3">
                {summary}
              </div>
            )}
            {/* 태그 */}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full 
                             bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300
                             group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 
                             group-hover:text-primary-700 dark:group-hover:text-primary-300 
                             transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      </article>
    </li>
  );
};

export default PostCard;
