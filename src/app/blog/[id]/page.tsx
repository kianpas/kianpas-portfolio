import { getPosts, getSinglePost } from "@/services/posts";

interface Props {
  params: {
    id: string; // `id`는 동적 라우팅에서 전달됨
  };
}

// ✅ 1. 정적 export용 ID 목록 제공
export async function generateStaticParams() {
  const posts = await getPosts(1); 
  return posts.map((post) => ({
    id: post.id,
  }));
}

const SinglePostPage = async (props: Props) => {
  //next15 방식
  const params = await props.params;

  const post = await getSinglePost(params.id);

  const { title, body } = post;

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
    // <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
    //   <div className="absolute inset-0 -z-10 overflow-hidden">
    //     <svg
    //       aria-hidden="true"
    //       className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
    //     ></svg>
    //   </div>
    //   <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
    //     <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
    //       <div className="lg:pr-4">
    //         <div className="lg:max-w-lg">
    //           {/* 제목 섹션 */}
    //           {/* <p className="text-base/7 font-semibold text-indigo-600">Deploy faster</p> */}
    //           <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
    //             {title}
    //           </h1>
    //           {/* <p className="mt-6 text-xl/8 text-gray-700">
    //             Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam
    //             eget aliquam. Quisque id at vitae feugiat egestas.
    //           </p> */}
    //         </div>
    //       </div>
    //     </div>
    //     {/* 내용 섹션 */}
    //     <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
    //       <div className="lg:pr-4">
    //         <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
    //           <p>{body}</p>
    //         </div>
    //         {/* 부가 섹션 */}
    //         <footer className="mt-8 border-t pt-4">
    //           <div className="flex justify-between text-blue-500">
    //             {/* 이전 포스트 링크 */}
    //             {Number(params.id) > 1 ? (
    //               <a
    //                 href={`/blog/${Number(params.id) - 1}`}
    //                 className="hover:underline hover:text-blue-700"
    //               >
    //                 &larr; Previous Post
    //               </a>
    //             ) : (
    //               <span className="text-gray-400 cursor-not-allowed">
    //                 &larr; Previous Post
    //               </span>
    //             )}
    //             {/* 다음 포스트 링크 */}
    //             <a
    //               href={`/blog/${Number(params.id) + 1}`}
    //               className="hover:underline hover:text-blue-700"
    //             >
    //               Next Post &rarr;
    //             </a>
    //           </div>
    //         </footer>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    // <article>
    //   <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
    //     <header className="pt-6 xl:pb-6"></header>
    //     <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
    //       <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
    //         <dt className="sr-only">Authors</dt>
    //       </dl>
    //     </div>
    //   </div>
    // </article>
    <section className="bg-white dark:bg-gray-900 py-10">
      <main className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        {/* Title and Meta */}
        <header className="mb-10">
          <div className="space-y-1">
            <dl>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                {/* Date here */}
                <time dateTime="2023-01-01">January 1, 2023</time>
              </dd>
            </dl>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10">
              {title}
            </h1>
          </div>
        </header>

        {/* Article Content */}
        <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0 dark:divide-gray-700">
          <dl className="pt-6 pb-10 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
            <dt className="sr-only">Authors</dt>
            <dd>
              <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                <li>111</li>
              </ul>
              <dl className="whitespace-nowrap text-sm font-medium leading-5">
                <dt className="sr-only">Name</dt>
                <dd className="text-gray-900 dark:text-gray-100">
                  author
                </dd>
              </dl>
            </dd>
          </dl>
          <div className="divide-y divide-gray-200 xl:col-span-3 xl:row-span-2 xl:pb-0 dark:divide-gray-700">
            <div className="prose dark:prose-invert max-w-none pt-10 pb-8">
              <h2 id="introduction" className="text-lg font-semibold">
                Introduction
              </h2>
              <p>{body}</p>
            </div>
          </div>
          {/* Markdown/MDX rendered content
          <h2 id="introduction" className="content-header">
            Introduction
          </h2>
          <p>Intro paragraph...</p>
          <h2 id="features">Features</h2>
          <ul>
            <li>Tailwind CSS 기반 디자인</li>
            <li>다크 모드 지원</li>
            <li>MDX 지원</li>
          </ul> */}

          {/* Footer with navigation */}
          <footer className="pt-6 text-sm text-gray-700 dark:text-gray-300">
            <div className="flex justify-between">
              <div>
                <div className="text-xs uppercase text-gray-500">
                  Previous Article
                </div>
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  ← 이전 글 제목
                </a>
              </div>
              <div className="text-right">
                <div className="text-xs uppercase text-gray-500">
                  Next Article
                </div>
                <a
                  href="#"
                  className="text-blue-600 dark:text-blue-400 hover:underline"
                >
                  다음 글 제목 →
                </a>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </section>
  );
};

export default SinglePostPage;
