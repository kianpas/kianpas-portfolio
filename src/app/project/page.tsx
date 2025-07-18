import { getProjectsByType } from "@/services/projects";
import ProjectList from "@/app/project/components/ProjectList";

const ProjectPage = () => {
  const professionalProjects = getProjectsByType("professional", 1, 6);
  const personalProjects = getProjectsByType("personal", 1, 6);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">프로젝트</h1>
      {/* 실무 프로젝트 섹션 */}
      <div className="mb-16">
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-semibold">실무 프로젝트</h2>
        </div>
        <ProjectList
          initialProjects={professionalProjects.projects}
          totalPage={professionalProjects.totalPages}
          projectType="professional"
        />
      </div>

      {/* 개인 프로젝트 섹션 */}
      <div>
        <div className="flex items-center mb-6">
          <h2 className="text-2xl font-semibold">개인 프로젝트</h2>
        </div>
        <ProjectList
          initialProjects={personalProjects.projects}
          totalPage={personalProjects.totalPages}
          projectType="personal"
        />
      </div>
    </div>
  );
};

export default ProjectPage;
