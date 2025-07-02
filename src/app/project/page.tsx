import { getSortedProjectsData } from "@/services/projects";
import ProjectCard from "@/components/projectCard/ProjectCard";

const ProjectPage = () => {
  const projects = getSortedProjectsData();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">프로젝트</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </ul>
    </div>
  );
};

export default ProjectPage;
