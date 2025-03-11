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
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              {/* 제목 섹션 */}
              {/* <p className="text-base/7 font-semibold text-indigo-600">Deploy faster</p> */}
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {title}
              </h1>
              {/* <p className="mt-6 text-xl/8 text-gray-700">
                Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam
                eget aliquam. Quisque id at vitae feugiat egestas.
              </p> */}
            </div>
          </div>
        </div>
        {/* 내용 섹션 */}
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-700 lg:max-w-lg">
              <p>{body}</p>
            </div>
            {/* 부가 섹션 */}
            <footer className="mt-8 border-t pt-4">
              <div className="flex justify-between text-blue-500">
                {/* 이전 포스트 링크 */}
                {Number(params.id) > 1 ? (
                  <a
                    href={`/blog/${Number(params.id) - 1}`}
                    className="hover:underline hover:text-blue-700"
                  >
                    &larr; Previous Post
                  </a>
                ) : (
                  <span className="text-gray-400 cursor-not-allowed">
                    &larr; Previous Post
                  </span>
                )}
                {/* 다음 포스트 링크 */}
                <a href={`/blog/${Number(params.id) + 1}`} className="hover:underline hover:text-blue-700">Next Post &rarr;</a>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>

    // <div className="max-w-3xl mx-auto px-4 py-6 bg-gray-50 rounded-lg">
    //   {/* 헤더 섹션 */}
    //   <header className="mb-6">
    //     <h1 className="text-4xl font-bold text-gray-800 mb-2">
    //       {post.title || "Untitled Post"}
    //     </h1>
    //     <p className="text-gray-500 text-sm">Posted on: 2024-01-01</p>
    //   </header>

    //   {/* 본문 섹션 */}
    //   <section className="prose prose-lg text-gray-700">
    //     <p>{post.body}</p>
    //   </section>

    // {/* 부가 섹션*/}
    // <footer className="mt-8 border-t pt-4">
    //   <div className="flex justify-between text-blue-500">
    //     {/* 이전 포스트 링크 */}
    //     {Number(params.id) > 1 ? (
    //       <a
    //         href={`/blog/${Number(params.id) - 1}`}
    //         className="hover:underline hover:text-blue-700"
    //       >
    //         &larr; Previous Post
    //       </a>
    //     ) : (
    //       <span className="text-gray-400 cursor-not-allowed">
    //         &larr; Previous Post
    //       </span>
    //     )} */}

    //       {/* 다음 포스트 링크 */}
    // <a href={`/blog/${Number(params.id) + 1}`} className="hover:underline hover:text-blue-700">Next Post &rarr;</a>
    //       </div >
    //     </footer >
    // </div>
  );
};

export default SinglePostPage;
