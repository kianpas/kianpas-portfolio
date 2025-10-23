import { getSortedPostsData } from "@/services/posts";
import { Post } from "@/types/post";
import HeroSection from "@/app/components/HeroSection";
import HomePostTeaser from "@/app/components/HomePostTeaser";

const Home = () => {
  let recentPosts: Post[] = [];
  try {
    // 최근 포스트 3개 가져오기
    recentPosts = getSortedPostsData().slice(0, 3);
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    // 에러가 발생해도 페이지는 렌더링되도록 recentPosts를 빈 배열로 유지합니다.
  }

  return (
    <div className="min-h-screen">
      {/* 히어로 섹션 */}
      <HeroSection />

      {/* 최근 블로그 포스트 섹션 */}
      <HomePostTeaser post={recentPosts} />
    </div>
  );
};

export default Home;
