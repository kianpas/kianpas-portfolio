import { Post } from "@/types/post";
import { getPosts } from "@/services/posts";
import PostCard from "@/components/postCard/PostCard";

const BlogPage = async () => {
  const posts = await getPosts(1);

  return (
    <div className="mx-auto px-4 py-8">
      {/* 헤더 */}
      <div className="pb-8 md:pb-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
          Posts
        </h1>
      </div>
      
      {/* 포스트 목록 */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* 페이징 버튼 */}
      <div className="flex justify-between items-center mt-10">
        {/* <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-500">Page {currentPage}</span>
        <button
          onClick={handleNextPage}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Next
        </button> */}
      </div>
    </div>
  );
};

export default BlogPage;
