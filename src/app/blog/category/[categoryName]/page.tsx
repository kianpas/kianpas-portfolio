import { getPostsByCategory } from "@/services/posts";
import PostList from "@/app/blog/_components/PostList";

type PageProps = {
  params: Promise<{ categoryName: string }>;
};

const CategoryPage = async ({ params }: PageProps) => {
  const { categoryName } = await params;

  const decodedCategoryName = decodeURIComponent(categoryName);
  const { posts, totalPosts, totalPages } = getPostsByCategory(decodedCategoryName, 1, 10);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
        {/* 헤더 */}
        <div className="mb-14 border-b border-gray-200 pb-5 dark:border-gray-700 sm:mb-16">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
            Category
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
            {decodedCategoryName}
          </h1>
          <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
            {totalPosts}개의 글
          </p>
        </div>

        {/* 포스트 목록 */}
        <PostList initialPosts={posts} name={decodedCategoryName} totalPage={totalPages} />
      </div>
    </div>
  );
};

export default CategoryPage;
