import { Post } from "@/types/post";

interface Props {
  params: {
    id: string; // `id`는 동적 라우팅에서 전달됨
  };
}

// API 호출 함수
const getSinglePost = async (id: string): Promise<Post | null> => {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error(`Error fetching post: ${error}`);
    return null; // 네트워크 에러 시에도 null 반환
  }
};

const SinglePostPage = async ({ params }: Props) => {
  const post = await getSinglePost(params.id);

  if (!post) {
    return <div className="text-red-500">Failed to load the post.</div>;
  }
  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      {/* 헤더 섹션 */}
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{post.title}</h1>
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
