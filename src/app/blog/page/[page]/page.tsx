import { getPaginatedPosts, getSortedPostsData } from "@/services/posts";
import { notFound } from "next/navigation";
import PostPagination from "@/app/blog/_components/PostPagination";
import PostFeed from "@/app/blog/_components/PostFeed";
import PageContainer from "@/components/layout/PageContainer";

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
  const pageNumber = parseInt(page, 10) || 1;

  // 페이지 번호가 숫자가 아니거나 1보다 작으면 404 페이지를 보여줍니다.
  if (isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const { posts, totalPages, currentPage } = getPaginatedPosts(
    pageNumber,
    POSTS_PER_PAGE
  );

  if (posts.length === 0 && pageNumber > 1) {
    // 성공했지만 데이터가 없음
    return (
      <PageContainer>
        <div className="py-20 text-center text-gray-500 dark:text-gray-400">
          표시할 게시물이 없습니다.
        </div>
      </PageContainer>
    );
  }

  return (
    <div className="min-h-screen">

      <div>
        <PostFeed
          post={posts}
          showSearch
          emphasizeLatest={pageNumber === 1}
        />

        {totalPages > 1 && (
          <div className="mx-auto flex max-w-5xl justify-center px-4 pb-20 sm:px-6">
              <PostPagination currentPage={currentPage} totalPages={totalPages} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
