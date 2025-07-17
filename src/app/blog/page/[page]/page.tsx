import { getPaginatedPosts, getSortedPostsData } from "@/services/posts";
import { notFound } from "next/navigation";
import PostCard from "@/app/blog/components/PostCard";
import PostPagination from "@/app/blog/components/PostPagination";

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
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* 헤더 */}
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
            Posts
          </h1>
        </div>
        <div className="py-16 text-center text-gray-500 dark:text-gray-400">
          표시할 게시물이 없습니다.
        </div>
        {/* 페이지네이션은 0개일 때 표시 안 함 */}
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* 헤더 */}
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
          Posts
        </h1>
      </div>
      {/* 포스트 목록*/}
      <div>
        <ul>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </ul>
      </div>
      {totalPages && (
        <div className="py-12">
          {/* 페이지네이션 위아래 여백 및 가운데 정렬 */}
          <PostPagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default BlogPage;
