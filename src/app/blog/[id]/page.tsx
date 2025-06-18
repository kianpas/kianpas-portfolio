import { getSinglePost } from "@/services/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

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
    notFound();
  }

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
                <dd className="text-gray-900 dark:text-gray-100">author</dd>
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
        </div>
        {/* Footer with navigation */}
        <footer className="pt-6 text-sm text-gray-700 dark:text-gray-300">
          <div className="flex justify-between">
            <div>
              <div className="text-xs uppercase text-gray-500">
                Previous Article
              </div>
              <Link
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                ← 이전 글 제목
              </Link>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase text-gray-500">
                Next Article
              </div>
              <Link
                href="#"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                다음 글 제목 →
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </section>
  );
};

export default SinglePostPage;
