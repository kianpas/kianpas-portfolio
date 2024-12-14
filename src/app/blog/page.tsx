import { Post } from "@/types/post";
import { getPosts } from "@/services/posts";
import PostCard from "@/components/postCard/PostCard";

const BlogPage = async () => {
  const posts = await getPosts(1);

  return (
    <section className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
};

export default BlogPage;
