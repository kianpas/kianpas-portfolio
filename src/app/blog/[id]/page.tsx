// import { getSinglePost} from "@/services/posts";
import { notFound } from "next/navigation";
import { getPostData, getAllPostIds  } from "@/services/posts";
import Link from "next/link";

interface Props {
  params: {
    id: string; // `id`는 동적 라우팅에서 전달됨
  };
}

// 1. 빌드 시점에 미리 생성할 페이지들의 경로를 알려주는 함수
export async function generateStaticParams() {
  const paths = getAllPostIds();
  // paths는 [{ params: { slug: 'a-first-post' } }, ...] 형태가 됩니다.
  return paths.map(path => ({ id: path.params.id }));
}

const SinglePostPage = async (props: Props) => {
  //next15 방식
  const params = await props.params;

  // getPostData는 이제 이전/다음 글 정보도 함께 가져온다고 가정합니다.
  const { postData, prevPost, nextPost } = await getPostData(params.id);

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
    // <section className="bg-white dark:bg-gray-900 py-10">
    //   <main className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
    //     {/* Title and Meta */}
    //     <header className="mb-10">
    //       <div className="space-y-1">
    //         <dl>
    //           <dt className="sr-only">Published on</dt>
    //           <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
    //             {/* Date here */}
    //             <time dateTime="2023-01-01">{postData.date}</time>
    //           </dd>
    //         </dl>
    //         <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10">
    //           {postData.title}
    //         </h1>
    //       </div>
    //     </header>

    //     {/* Article Content */}
    //     <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
    //       <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
    //         <dt className="sr-only">Authors</dt>
    //         <dd>
    //           <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
    //             <li>111</li>
    //           </ul>
    //           <dl className="whitespace-nowrap text-sm font-medium leading-5">
    //             <dt className="sr-only">Name</dt>
    //             <dd className="text-gray-900 dark:text-gray-100">author</dd>
    //           </dl>
    //         </dd>
    //       </dl>
    //       <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
    //         <div className="prose dark:prose-invert max-w-none pt-10 pb-8">
    //           <h2 id="introduction" className="text-lg font-semibold">
    //             Introduction
    //           </h2>
    //           {/* <p>{body}</p> */}
    //             <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    //         </div>
    //       </div>
    //     </div>
    //     {/* Footer with navigation */}
    //     <footer className="pt-6 text-sm text-gray-700 dark:text-gray-300">
    //       <div className="flex justify-between">
    //         <div>
    //           <div className="text-xs uppercase text-gray-500">
    //             Previous Article
    //           </div>
    //           <Link
    //             href="#"
    //             className="text-blue-600 dark:text-blue-400 hover:underline"
    //           >
    //             ← 이전 글 제목
    //           </Link>
    //         </div>
    //         <div className="text-right">
    //           <div className="text-xs uppercase text-gray-500">
    //             Next Article
    //           </div>
    //           <Link
    //             href="#"
    //             className="text-blue-600 dark:text-blue-400 hover:underline"
    //           >
    //             다음 글 제목 →
    //           </Link>
    //         </div>
    //       </div>
    //     </footer>
    //   </main>
    // </section>
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
          <span>{postData.author || 'Your Name'}</span>
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
      </footer>
    </article>
  );
};

export default SinglePostPage;
