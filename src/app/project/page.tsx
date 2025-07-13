import { getSortedProjectsData } from "@/services/projects";
import ProjectList from "@/components/projectList/ProjectList";

const ProjectPage = () => {
  const { projects, totalPages } = getSortedProjectsData(1, 6);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">프로젝트</h1>
      <ProjectList initialProjects={projects} totalPage={totalPages} />
    </div>
  );
};

export default ProjectPage;
