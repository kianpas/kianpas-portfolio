import { Post } from "@/types/post";
import { getPosts } from "@/services/posts";
import PostCard from "@/components/postCard/PostCard";
import PostPagination from "@/components/postPagination/PostPagination";

const BlogPage = async ({
  searchParams,
}: {
  searchParams?: { page?: string };
}) => {
  // searchParams가 Promise일 수 있으므로, 명시적으로 await 처리
  const resolvedSearchParams = await Promise.resolve(searchParams);
  const currentPage = resolvedSearchParams?.page
    ? parseInt(resolvedSearchParams.page, 10)
    : 1;
  const posts = await getPosts(currentPage);

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* 헤더 */}
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
            Posts
          </h1>
        </div>

        {/* 포스트 목록 */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        {/* 페이징 버튼 */}
        <div>
          <PostPagination currentPage={currentPage} />
        </div>
      </div>
    </>
  );
};

export default BlogPage;
