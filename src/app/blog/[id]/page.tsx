
import { getSinglePost } from "@/services/posts";

interface Props {
  params: {
    id: string; // `id`는 동적 라우팅에서 전달됨
  };
}

const SinglePostPage = async (props: Props) => {
  //next15 방식
  const params = await props.params;

  const post = await getSinglePost(params.id);

  if (!post) {
    return (
      <div className="text-red-500 max-w-3xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p>
          The post you are looking for does not exist or could not be loaded.
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* 헤더 섹션 */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {post.title || "Untitled Post"}
        </h1>
        <p className="text-gray-500 text-sm">Posted on: 2024-01-01</p>
      </header>

      {/* 본문 섹션 */}
      <section className="prose prose-lg text-gray-700">
        <p>{post.body}</p>
      </section>

      {/* 부가 섹션 */}
      <footer className="mt-8 border-t pt-4">
        <div className="flex justify-between text-blue-500">
          {/* 이전 포스트 링크 */}
          {Number(params.id) > 1 ? (
            <a href={`/blog/${Number(params.id) - 1}`}>&larr; Previous Post</a>
          ) : (
            <span className="text-gray-400 cursor-not-allowed">
              &larr; Previous Post
            </span>
          )}

          {/* 다음 포스트 링크 */}
          <a href={`/blog/${Number(params.id) + 1}`}>Next Post &rarr;</a>
        </div>
      </footer>
    </div>
  );
};

export default SinglePostPage;
