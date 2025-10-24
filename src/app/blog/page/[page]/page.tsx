import { getPaginatedPosts, getSortedPostsData } from "@/services/posts";
import { notFound } from "next/navigation";
import PostCard from "@/app/blog/components/PostCard";
import PostPagination from "@/app/blog/components/PostPagination";
import SearchBar from "@/components/SearchBar";
import { Card } from "@/components/ui";

// 페이지당 보여줄 포스트 수
const POSTS_PER_PAGE = 10;

// 1. 빌드 시점에 미리 생성할 페이지 경로들을 생성합니다. (e.g., /blog/1, /blog/2)
export async function generateStaticParams() {
  const allPosts = getSortedPostsData();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  // [{ page: '1' }, { page: '2' }, ...] 형태의 배열 생성
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }));

  return paths;
}

type PageProps = {
  params: Promise<{ page: string }>;
};

const BlogPage = async ({ params }: PageProps) => {
  // URL의 동적 세그먼트([page])로부터 페이지 번호를 가져옵니다.
  const { page } = await params;
  console.log("page => ", page);
  const pageNumber = parseInt(page, 10) || 1;

  // 페이지 번호가 숫자가 아니거나 1보다 작으면 404 페이지를 보여줍니다.
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const { posts, totalPages, currentPage } = getPaginatedPosts(
    pageNumber,
    POSTS_PER_PAGE
  );

  console.log("totalPages, currentPage => ", totalPages, currentPage);

  if (posts.length === 0 && pageNumber > 1) {
    // 성공했지만 데이터가 없음
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
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Posts
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                개발과 기술에 대한 생각들을 정리하고 공유합니다
              </p>
            </div>

            <Card variant="elevated" className="text-center py-16">
              <p className="text-gray-500 dark:text-gray-400">
                표시할 게시물이 없습니다.
              </p>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Posts
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              개발과 기술에 대한 생각들을 정리하고 공유합니다
            </p>

            {/* 검색바 */}
            <div className="max-w-md mx-auto">
              <SearchBar placeholder="글 제목, 내용, 태그로 검색..." />
            </div>
          </div>

          {/* 포스트 목록 */}
          <div className="space-y-6 mb-16">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>

          {/* 페이지네이션 */}
          {totalPages && (
            <div className="flex justify-center">
              <PostPagination currentPage={currentPage} totalPages={totalPages} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
