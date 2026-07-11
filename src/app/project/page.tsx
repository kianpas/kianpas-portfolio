import { getProjectsByType } from "@/services/projects";
import ProjectList from "@/app/project/_components/ProjectList";

const ProjectPage = () => {
  const professionalProjects = getProjectsByType("professional", 1, 6);
  const personalProjects = getProjectsByType("personal", 1, 6);

  return (
    <div className="min-h-screen">
    
      <div className="mx-auto max-w-5xl px-2 py-14 sm:px-6 sm:py-20">
        {/* 헤더 */}
        <div className="mb-14 border-b border-gray-200 pb-5 dark:border-gray-700 sm:mb-16">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
            Work archive
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
            프로젝트
          </h1>
          <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-300">
            실무와 개인 프로젝트를 통해 쌓아온 경험들을 소개합니다
          </p>
        </div>

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
      </div>
    </div>
  );
};

export default ProjectPage;
