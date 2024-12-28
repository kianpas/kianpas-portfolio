import { Post } from "@/types/post";
import { getPosts } from "@/services/posts";
import PostCard from "@/components/postCard/PostCard";

const BlogPage = async () => {
  const posts = await getPosts(1);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Posts
        </h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {posts.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {/* 페이징 버튼 */}
      <div className="flex justify-between items-center mt-8">
        {/* <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
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
