import Link from "next/link";

interface BlogCardProps {
  userId: string;
  id: string;
  title: string;
  body: string;
}
const PostCard = ({ userId, id, title, body }: BlogCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* 이미지 섹션 */}
      {/* <img src={image} alt={title} className="w-full h-48 object-cover" /> */}

      {/* 텍스트 섹션 */}
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {/* <p className="text-sm text-gray-600">{date}</p> */}
        {/* <p className="mt-2 text-gray-700">{excerpt}</p> */}

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
