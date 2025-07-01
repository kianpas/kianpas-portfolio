// import { getSinglePost} from "@/services/posts";
import { notFound } from "next/navigation";
import { getPostData, getAllPostIds } from "@/services/posts";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};
// 1. 빌드 시점에 미리 생성할 페이지들의 경로를 알려주는 함수
export async function generateStaticParams() {
  const paths = getAllPostIds();
  // paths는 [{ params: { slug: 'a-first-post' } }, ...] 형태가 됩니다.
  return paths.map((path) => ({ id: path.params.id }));
}

const SinglePostPage = async ({ params }: PageProps) => {
  //next15 방식
  const { id } = await params;

  // getPostData는 이제 이전/다음 글 정보도 함께 가져온다고 가정합니다.
  const { postData, prevPost, nextPost } = await getPostData(id);

  if (!postData) {
    notFound();
  }

  // const { title, body } = post;

  if (!postData) {
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
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
      {/* 1. 헤더: 제목과 메타정보 */}
      <header className="mb-8 text-center">
        {/* 태그 (선택 사항이지만 추천) */}
        <div className="mb-4">
          {/* {postData.tags?.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mr-2"
            >
              #{tag}
            </Link>
          ))} */}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight tracking-tighter text-gray-900 dark:text-gray-100 mb-4">
          {postData.title}
        </h1>
        <div className="flex items-center justify-center space-x-4 text-base text-gray-500 dark:text-gray-400">
          {/* 작성자 정보 (동적으로 변경) */}
          <span>{postData.author || "Your Name"}</span>
          <span className="select-none">·</span>
          <time dateTime={postData.date}>{postData.date}</time>
          <span className="select-none">·</span>
          {/* 읽는 시간 (추가하면 UX가 좋아짐) */}
          <span>{postData.readingTime} min read</span>
        </div>
      </header>

      {/* 2. 본문: tailwindcss/typography 플러그인 활용 */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />

      {/* 3. 푸터: 이전/다음 글 네비게이션 */}
      <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between gap-8">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.id}`}
              className="block p-4 border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors w-full"
            >
              <div className="text-xs uppercase text-gray-500">Previous</div>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                &larr; {prevPost.title}
              </span>
            </Link>
          ) : (
            <div /> // 레이아웃 유지를 위한 빈 div
          )}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.id}`}
              className="block p-4 border rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800 transition-colors w-full text-right"
            >
              <div className="text-xs uppercase text-gray-500">Next</div>
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                {nextPost.title} &rarr;
              </span>
            </Link>
          ) : (
            <div /> // 레이아웃 유지를 위한 빈 div
          )}
        </div>
        <div className="pt-8 text-center">
          <Link
            href="/blog"
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            &larr; Back to all posts
          </Link>
        </div>
      </footer>
      {/* <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {prevPost ? (
            <Link href={`/blog/${prevPost.id}`} className="block text-left">
              <div className="text-xs uppercase text-gray-500">Previous</div>
              <span className="text-blue-600 dark:text-blue-400 hover:underline">
                ← {prevPost.title}
              </span>
            </Link>
          ) : (
            <div /> // 이전 글이 없을 때 공간 차지
          )}
          {nextPost ? (
            <Link href={`/blog/${nextPost.id}`} className="block text-right">
              <div className="text-xs uppercase text-gray-500">Next</div>
              <span className="text-blue-600 dark:text-blue-400 hover:underline">
                {nextPost.title} →
              </span>
            </Link>
          ) : (
            <div /> // 다음 글이 없을 때 공간 차지
          )}
        </div>
      </footer> */}
    </article>
  );
};

export default SinglePostPage;
