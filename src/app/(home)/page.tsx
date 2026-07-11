import { getSortedPostsData } from "@/services/posts";
import { Post } from "@/types/post";
import { Project } from "@/types/project";
import { getSortedProjectsData } from "@/services/projects";
import HomeOverview from "@/app/(home)/_components/HomeOverview";

const Home = () => {
  let recentPosts: Post[] = [];
  let recentProjects: Project[] = [];
  try {
    recentPosts = getSortedPostsData().slice(0, 4);
    recentProjects = getSortedProjectsData(1, 2).projects;
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    // 에러가 발생해도 페이지는 렌더링되도록 recentPosts를 빈 배열로 유지합니다.
  }

  return (
    <div className="min-h-screen">
      <HomeOverview posts={recentPosts} projects={recentProjects} />
    </div>
  );
};

export default Home;
