import { getAllProjectSlugs, getProjectData } from "@/services/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaGithub, FaArrowUpRightFromSquare, FaChevronLeft  } from "react-icons/fa6";

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
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
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
            <div
              className="prose prose-lg md:prose-base prose-neutral dark:prose-invert max-w-none leading-7
                        prose-headings:font-bold prose-headings:tracking-tight 
                        prose-headings:text-gray-900 dark:prose-headings:text-gray-100
                        prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4
                        prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                        prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                        prose-a:text-orange-600 dark:prose-a:text-orange-400 prose-a:font-medium
                        prose-a:underline prose-a:decoration-orange-300 prose-a:underline-offset-4
                        prose-code:text-orange-700 dark:prose-code:text-orange-300
                        prose-code:bg-orange-50 dark:prose-code:bg-orange-950/30
                        prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-normal
                        prose-pre:bg-gray-900 dark:prose-pre:bg-gray-950 
                        prose-pre:border prose-pre:border-gray-700 prose-pre:rounded-xl
                        prose-img:rounded-xl prose-img:shadow-lg dark:prose-img:shadow-dark-lg
                        prose-blockquote:border-l-4 prose-blockquote:border-orange-500
                        prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-orange-50/60
                        dark:prose-blockquote:bg-orange-950/20 prose-blockquote:py-2 prose-blockquote:rounded-r-lg
                        prose-strong:font-bold prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                        prose-ul:space-y-2 prose-ol:space-y-2"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
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
      </div>
    </div>
  );
}
