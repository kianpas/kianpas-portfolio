import { getProjectsByType } from "@/services/projects";
import ProjectList from "@/app/project/_components/ProjectList";

const ProjectPage = () => {
  const professionalProjects = getProjectsByType("professional", 1, 6);
  const personalProjects = getProjectsByType("personal", 1, 6);

  return (
    <div className="min-h-screen">
    
      <div className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          {/* 헤더 */}
          <div className="mb-16 border-b border-gray-200 pb-6 dark:border-gray-700">
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
              Work archive
            </p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-950 dark:text-white mb-3">
              프로젝트
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl">
              실무와 개인 프로젝트를 통해 쌓아온 경험들을 소개합니다
            </p>
          </div>

          {/* 실무 프로젝트 섹션 */}
          <section className="mb-20">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  실무 프로젝트
                </h2>
            </div>
            <ProjectList
              initialProjects={professionalProjects.projects}
              totalPage={professionalProjects.totalPages}
              projectType="professional"
            />
          </section>

          {/* 개인 프로젝트 섹션 */}
          <section>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  개인 프로젝트
                </h2>
            </div>
            <ProjectList
              initialProjects={personalProjects.projects}
              totalPage={personalProjects.totalPages}
              projectType="personal"
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
