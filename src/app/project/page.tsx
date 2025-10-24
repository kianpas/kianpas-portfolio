import { getProjectsByType } from "@/services/projects";
import ProjectList from "@/app/project/components/ProjectList";

const ProjectPage = () => {
  const professionalProjects = getProjectsByType("professional", 1, 6);
  const personalProjects = getProjectsByType("personal", 1, 6);

  return (
    <div className="min-h-screen">
      {/* 배경 장식 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 hidden sm:block bg-[radial-gradient(60%_60%_at_20%_20%,rgba(59,130,246,0.12)_0%,transparent_60%),radial-gradient(70%_70%_at_80%_80%,rgba(168,85,247,0.10)_0%,transparent_60%)]"
      ></div>

      <div className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              프로젝트
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              실무와 개인 프로젝트를 통해 쌓아온 경험들을 소개합니다
            </p>
          </div>

          {/* 실무 프로젝트 섹션 */}
          <section className="mb-20">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  실무 프로젝트
                </h2>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
            </div>
            <ProjectList
              initialProjects={professionalProjects.projects}
              totalPage={professionalProjects.totalPages}
              projectType="professional"
            />
          </section>

          {/* 개인 프로젝트 섹션 */}
          <section>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  개인 프로젝트
                </h2>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
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
