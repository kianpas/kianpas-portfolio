import { getProjectsByType } from "@/services/projects";
import ProjectList from "@/app/project/_components/ProjectList";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";

const ProjectPage = () => {
  const professionalProjects = getProjectsByType("professional", 1, 6);
  const personalProjects = getProjectsByType("personal", 1, 6);

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Work archive"
        title="프로젝트"
        description="실무와 개인 프로젝트를 통해 쌓아온 경험들을 소개합니다"
      />

      {/* 실무 프로젝트 섹션 */}
      <section className="mb-20">
        <h2 className="mb-7 text-xl font-bold text-gray-950 dark:text-white">
          실무 프로젝트
        </h2>
        <ProjectList
          initialProjects={professionalProjects.projects}
          totalPage={professionalProjects.totalPages}
          projectType="professional"
        />
      </section>

      {/* 개인 프로젝트 섹션 */}
      <section>
        <h2 className="mb-7 text-xl font-bold text-gray-950 dark:text-white">
          개인 프로젝트
        </h2>
        <ProjectList
          initialProjects={personalProjects.projects}
          totalPage={personalProjects.totalPages}
          projectType="personal"
        />
      </section>
    </PageContainer>
  );
};

export default ProjectPage;
