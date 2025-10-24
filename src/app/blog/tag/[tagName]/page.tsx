import { getPostsByTag } from "@/services/posts";
import PostList from "@/app/blog/components/PostList";
import { Badge } from "@/components/ui";

type PageProps = {
  params: Promise<{ tagName: string }>;
};

const TagPage = async ({ params }: PageProps) => {
  const { tagName } = await params;
  console.log("tagName => ", tagName);

  const decodedTagName = decodeURIComponent(tagName);
  const { posts, totalPosts, totalPages } = getPostsByTag(decodedTagName, 1, 10);

  return (
    <div className="min-h-screen">
      {/* 배경 장식 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden sm:block bg-[radial-gradient(60%_60%_at_20%_20%,rgba(59,130,246,0.12)_0%,transparent_60%),radial-gradient(70%_70%_at_80%_80%,rgba(168,85,247,0.10)_0%,transparent_60%)]"
      ></div>

      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <div className="mb-6">
              <Badge variant="info" size="md">
                #{decodedTagName}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              태그: {decodedTagName}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {totalPosts}개의 포스트를 찾았습니다
            </p>
          </div>

          {/* 포스트 목록 */}
          <PostList initialPosts={posts} name={decodedTagName} totalPage={totalPages} />
        </div>
      </div>
    </div>
  );
};

export default TagPage;
