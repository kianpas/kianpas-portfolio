import { Post } from "@/types/post";
import Link from "next/link";

const PostCardAlt: React.FC<{ post: Post }> = ({ post }) => {
  const { id, title, tags, body } = post; // 필요한 데이터 구조 분해

  //내용 60자리 이상 처리
  const truncate = (str: string, maxLength: number = 160): string =>
    str.length > maxLength ? str.slice(0, maxLength) + "..." : str;

  //60자리 처리 내용
  const truncatedBody = truncate(body);

  return (
    <li key={post.id} className="py-5">
      <article key={post.id} className="flex flex-col space-y-2 xl:space-y-0">
        <div className="flex items-center gap-x-4 text-xs">
          {/* <time dateTime={post.datetime} className="text-gray-500">
          {post.date}
        </time> */}
          {tags.map((tag, index) => (
            <a
              key={index}
              href=""
              className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
            >
              <span>{tag}</span>
            </a>
          ))}
        </div>
        <div className="space-y-3">
          {/* 포스트 제목 */}
          <h2 className="text-2xl leading-8 font-bold tracking-tight">
            <Link href={`/blog/${id}`}>
              <span className="text-gray-900 dark:text-gray-100" />
              {title}
            </Link>
          </h2>
          {/* 단축된 포스트 내용 */}
          <div className="prose max-w-none text-gray-500 dark:text-gray-400">
            {truncatedBody}
          </div>
        </div>
      </article>
    </li>
  );
};

export default PostCardAlt;
