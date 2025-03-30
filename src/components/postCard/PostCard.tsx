import { Post } from "@/types/post";
import Link from "next/link";

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const { id, title, tags, body } = post; // 필요한 데이터 구조 분해

  //내용 60자리 이상 처리
  const truncate = (str: string, maxLength: number = 60): string =>
    str.length > maxLength ? str.slice(0, maxLength) + "..." : str;

  //60자리 처리 내용
  const truncatedBody = truncate(body);

  return (
    <article
      key={post.id}
      className="flex max-w-xl flex-col items-start justify-between bg-white rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105"
    >
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
      <div className="group relative">
        {/* 포스트 제목 */}
        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
          <Link href={`/blog/${id}`}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>
        {/* 단축된 포스트 내용 */}
        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-700">
          {truncatedBody}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <div className="text-sm/6">
          <p className="font-semibold text-gray-900">
            <span className="absolute inset-0" />
            Lorem, ipsum.
          </p>
          <p className="text-gray-600">Lorem, ipsum dolor.</p>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
