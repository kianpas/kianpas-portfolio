import { getPostsByCategory } from "@/services/posts";
import PostList from "@/app/blog/components/PostList";
import { Badge } from "@/components/ui";

type PageProps = {
  params: Promise<{ categoryName: string }>;
};

const CategoryPage = async ({ params }: PageProps) => {
  const { categoryName } = await params;
  console.log("categoryName => ", categoryName);

  const decodedCategoryName = decodeURIComponent(categoryName);
  const { posts, totalPosts, totalPages } = getPostsByCategory(decodedCategoryName, 1, 10);

  return (
    <div className="min-h-screen">
      {/* 배경 장식 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <Badge variant="info" size="md">
                {decodedCategoryName}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              카테고리: {decodedCategoryName}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {totalPosts}개의 포스트를 찾았습니다
            </p>
          </div>

          {/* 포스트 목록 */}
          <PostList initialPosts={posts} name={decodedCategoryName} totalPage={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
