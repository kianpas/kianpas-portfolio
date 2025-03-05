import { Post } from "@/types/post";
import Link from "next/link";

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const { id, title, tags, body } = post; // 필요한 데이터 구조 분해
  console.log("post => ", post)

  const truncate = (str: string, maxLength: number = 60): string =>
    str.length > maxLength ? str.slice(0, maxLength) + '...' : str;

  const truncatedBody = truncate(body);

  return (
    <article key={post.id} className="flex max-w-xl flex-col items-start justify-between">
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
            <span
            >
              {tag}
            </span>
          </a>
        ))}
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
          <Link href={`/blog/${id}`}>
            <span className="absolute inset-0" />
            {title}
          </Link>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">{truncatedBody}</p>
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
    // <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
    //   {/* 카드 헤더 - 이미지 (샘플 이미지 사용) */}
    //   {/* <img
    //     src={`https://via.placeholder.com/300?text=${title}`}
    //     alt={title}
    //     className="w-full h-48 object-cover"
    //   /> */}

    //   {/* 카드 내용 */}
    //   <div className="p-4">
    //     <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>

    //     {/* 태그 */}
    //     <div className="flex flex-wrap gap-2 mb-3">
    //       {tags.map((tag, index) => (
    //         <span
    //           key={index}
    //           className="text-xs text-blue-500  px-2 py-1 rounded"
    //         >
    //           {tag}
    //         </span>
    //       ))}
    //     </div>

    //     {/* 카드 하단 정보 */}
    //     {/* <div className="flex justify-between items-center text-sm text-gray-600">
    //       <p>
    //         Likes: {reactions.likes} | Dislikes: {reactions.dislikes}
    //       </p>
    //       <p>Views: {views}</p>
    //     </div> */}

    //     {/* 자세히 보기 버튼 */}
    //     <Link
    //       href={`/blog/${id}`}
    //       className="mt-4 inline-block text-blue-500 hover:text-blue-600 hover:underline"
    //     >
    //       Read More
    //     </Link>
    //   </div>
    // </div>
  );
};

export default PostCard;
