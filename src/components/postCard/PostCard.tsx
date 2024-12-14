import { Post } from "@/types/post";
import Link from "next/link";

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const { id, title, tags } = post; // 필요한 데이터 구조 분해
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* 카드 헤더 - 이미지 (샘플 이미지 사용) */}
      {/* <img
        src={`https://via.placeholder.com/300?text=${title}`}
        alt={title}
        className="w-full h-48 object-cover"
      /> */}

      {/* 카드 내용 */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs text-blue-500 bg-blue-100 px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 카드 하단 정보 */}
        {/* <div className="flex justify-between items-center text-sm text-gray-600">
          <p>
            Likes: {reactions.likes} | Dislikes: {reactions.dislikes}
          </p>
          <p>Views: {views}</p>
        </div> */}

        {/* 자세히 보기 버튼 */}
        <Link
          href={`/blog/${id}`}
          className="mt-4 inline-block text-blue-500 hover:text-blue-600 hover:underline"
        >
          Read More →
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
