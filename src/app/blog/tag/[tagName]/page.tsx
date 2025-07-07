import { getPostsByTag } from "@/services/posts";
import PostList from "@/components/postList/PostList";

type PageProps = {
  params: Promise<{ tagName: string }>;
};

const TagPage = async ({ params }: PageProps) => {
  const { tagName } = await params;
  console.log("tagName => ", tagName);

  const { posts, totalPosts, totalPages } = getPostsByTag(tagName, 1, 10);

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Tag: <span className="text-blue-500">{tagName}</span>
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          {totalPosts}개의 포스트를 찾았습니다.
        </p>
      </div>
      {/* 클라이언트 컴포넌트에 초기 데이터와 페이징 정보를 전달합니다. */}
      <PostList initialPosts={posts} name={tagName} totalPage={totalPages} />
    </div>
  );
};

export default TagPage;
