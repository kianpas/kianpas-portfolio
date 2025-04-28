import { Post } from "@/types/post";
import { getPosts } from "@/services/posts";
// import PostCard from "@/components/postCard/PostCardSecond";
import PostCardAlt from "@/components/postCard/PostCard";
import PostPagination from "@/components/postPagination/PostPagination";

const BlogPage = async (props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  // searchParams가 Promise일 수 있으므로, 명시적으로 await 처리
  // const resolvedSearchParams = await Promise.resolve(searchParams);
  const resolvedSearchParams = await props.searchParams;
  console.log("resolvedSearchParams == ", resolvedSearchParams);

  const currentPage = 1;
  //   resolvedSearchParams?.page &&
  //   !isNaN(parseInt(resolvedSearchParams.page, 10))
  //     ? parseInt(resolvedSearchParams.page, 10)
  //     : 1;

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
        </div>
        {/* 포스트 목록 후보1*/}
        <div>
          <ul>
            {posts.map((post: Post) => (
              <PostCardAlt key={post.id} post={post} />
            ))}
          </ul>
        </div>
        {/* 포스트 목록 후보2*/}
        {/* <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:pt-16 lg:mx-0 lg:max-w-none sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: Post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div> */}
        {/* 페이징 버튼
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <PostPagination currentPage={currentPage} />
        </div> */}

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
