import { Post } from "@/types/post";
import { getPosts } from "@/services/posts";
import PostCard from "@/components/postCard/PostCard";
import PostPagination from "@/components/postPagination/PostPagination";
import Link from "next/link";

const BlogPage = async (props: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}) => {
  // searchParams가 Promise일 수 있으므로, 명시적으로 await 처리
  const resolvedSearchParams = (await props.searchParams) ?? {};
  console.log("resolvedSearchParams == ", resolvedSearchParams);

  //기본값 페이지
  let currentPage = 1;
  const pageParam = resolvedSearchParams?.page;

  //pageParam이 존재하고 문자열인 경우
  if (pageParam && typeof pageParam === "string") {
    const parsedPage = parseInt(pageParam, 10);
    // 유효한 숫자이고 0보다 큰지 확인
    if (!isNaN(parsedPage) && parsedPage > 0) {
      currentPage = parsedPage;
    } else {
      console.warn(
        `잘못된 'page' 파라미터: "${pageParam}". 기본값 1로 설정합니다.`
      );
      // 선택 사항: 잘못된 파라미터가 오면 1페이지로 리다이렉트할 수도 있음
    }
  } else if (pageParam !== undefined) {
    // pageParam이 배열이거나 다른 예상치 못한 타입인 경우 처리
    console.warn(
      `예상치 못한 'page' 파라미터 타입: ${typeof pageParam}. 기본값 1로 설정합니다.`
    );
  }

  const posts = await getPosts(currentPage);
  const totalPages = posts?.length; // 페이지네이션에 필요할 수 있음

  console.log("totalPages ==>", totalPages);

  // 반환값으로 상태 판단
  if (posts === null) {
    // getPosts 내부에서 에러 발생
    return <div>게시물을 불러오는 중 오류가 발생했습니다.</div>;
  }

  if (posts.length === 0) {
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
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* 헤더 */}
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
            Posts
          </h1>
          <Link href={"/blog/write"}>Write</Link>
        </div>
        {/* 포스트 목록 후보1*/}
        <div>
          <ul>
            {posts.map((post: Post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </ul>
        </div>
        {totalPages &&
          totalPages > 1 && ( // 전체 페이지 수가 1보다 클 때만 표시
            <div className="pt-8 pb-12 flex justify-center">
              {/* 페이지네이션 위아래 여백 및 가운데 정렬 */}
              {/* totalPages 전달 */}
              <PostPagination currentPage={currentPage} />
            </div>
          )}
      </div>
    </>
  );
};

export default BlogPage;
