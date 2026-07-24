import { getAllProjectSlugs, getProjectData } from "@/services/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaGithub, FaArrowUpRightFromSquare, FaChevronLeft  } from "react-icons/fa6";
import ArticleBody from "@/components/ArticleBody";
import PageContainer from "@/components/layout/PageContainer";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const projects = getAllProjectSlugs();
  return projects.map((project) => ({
    slug: project.params.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectData(slug);

  if (!project) {
    notFound();
  }

  const { title, contentHtml, projectUrl, tags } = project;

  return (
    <PageContainer>
        {/* 헤더: 제목과 메타정보 - 전체 너비 */}
        <header className="mb-12 border-b border-gray-200 pb-10 dark:border-gray-700 sm:mb-16 sm:pb-14 max-w-4xl mx-auto">
          {/* 제목 */}
          <h1
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-950 dark:text-white mb-8"
          >
            {title}
          </h1>

          {/* 프로젝트 링크 */}
          {projectUrl && (
            <div className="flex flex-wrap items-center gap-5 mb-7">
                <Link
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
                >
                  <FaGithub size={16} />
                  GitHub에서 보기
                </Link>
                <Link
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
                >
                  <FaArrowUpRightFromSquare  size={14} />
                  라이브 데모
                </Link>
            </div>
          )}

          {/* 태그 */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-gray-500 dark:text-gray-400">
              {tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          )}
        </header>

        {/* 메인 콘텐츠 - 중앙 배치 */}
        <article className="max-w-4xl mx-auto fade-in">
          {/* 본문 */}
          <div className="relative">
            <ArticleBody html={contentHtml} />
          </div>

          {/* 하단 네비게이션 */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            {/* 프로젝트로 돌아가기 버튼 */}
            <div>
                <Link href="/project" className="group inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400">
                 <FaChevronLeft className="w-4 h-4" aria-hidden />
                  모든 프로젝트 보기
                </Link>
            </div>
          </footer>
        </article>
    </PageContainer>
  );
}
