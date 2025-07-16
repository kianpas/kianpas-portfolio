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
            <dl>
              <dt className="sr-only">Published on</dt>
              <dd className="text-sm font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time dateTime={date}>{date}</time>
              </dd>
            </dl>
            <h2 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            {summary && (
              <div className="prose max-w-none text-gray-500 dark:text-gray-400 line-clamp-3">
                {summary}
              </div>
            )}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300"
                  >
                    {tag}
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
