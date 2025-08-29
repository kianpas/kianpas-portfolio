import { getAllProjectSlugs, getProjectData } from "@/services/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Badge, Button } from "@/components/ui";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectData(slug);

  if (!project) {
    notFound();
  }

  const { title, contentHtml, projectUrl, tags } = project;

  return (
    <div className="min-h-screen">
      {/* 배경 장식 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* 브레드크럼 */}
        <nav className="flex items-center gap-2 mb-12 text-sm text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
          <Link
            href="/project"
            className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Projects
          </Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-gray-100 truncate">
            {title}
          </span>
        </nav>

        {/* 헤더: 제목과 메타정보 - 전체 너비 */}
        <header className="mb-12 text-center max-w-4xl mx-auto">
          {/* 제목 */}
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tighter 
                       text-gray-900 dark:text-gray-100 mb-6 
                       bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                       dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 
                       bg-clip-text text-transparent"
          >
            {title}
          </h1>

          {/* 프로젝트 링크 */}
          {projectUrl && (
            <div className="flex flex-wrap items-center justify-center gap-4 mb-6">
              <Button variant="primary" size="lg">
                <Link
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FaGithub size={16} />
                  GitHub에서 보기
                </Link>
              </Button>
              <Button variant="secondary" size="lg">
                <Link
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FaExternalLinkAlt size={14} />
                  라이브 데모
                </Link>
              </Button>
            </div>
          )}

          {/* 태그 */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="default"
                  size="md"
                  className="hover:scale-105 transition-transform duration-200"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </header>

        {/* 메인 콘텐츠 - 중앙 배치 */}
        <article className="max-w-4xl mx-auto fade-in">
          {/* 본문 */}
          <div className="relative">
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                        prose-headings:font-bold prose-headings:tracking-tight 
                        prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                        prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                        prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:font-medium 
                        prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-2
                        prose-code:text-primary-700 dark:prose-code:text-primary-300 
                        prose-code:bg-primary-50 dark:prose-code:bg-primary-900/30 
                        prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-normal
                        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 
                        prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-xl
                        prose-img:rounded-xl prose-img:shadow-lg dark:prose-img:shadow-dark-lg
                        prose-blockquote:border-l-4 prose-blockquote:border-primary-500 
                        prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-primary-50/50 
                        dark:prose-blockquote:bg-primary-900/20 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
                        prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                        prose-ul:space-y-2 prose-ol:space-y-2"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
          </div>

          {/* 하단 네비게이션 */}
          <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
            {/* 프로젝트로 돌아가기 버튼 */}
            <div className="text-center">
              <Button variant="primary" size="lg">
                <Link href="/project" className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  모든 프로젝트 보기
                </Link>
              </Button>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const projects = getAllProjectSlugs();
  return projects.map((project) => ({
    slug: project.params.slug,
  }));
}
