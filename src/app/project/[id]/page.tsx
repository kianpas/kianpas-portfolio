import { getAllProjectIds, getProjectData } from "@/services/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

type ProjectPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProjectData(id);

  if (!project) {
    notFound();
  }

  const { title, contentHtml, projectUrl, tags } = project;

  return (
    <div className="min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* 브레드크럼 */}
        <nav className="flex items-center gap-2 mb-14 text-sm text-[var(--ds-text-tertiary)]">
          <Link
            href="/project"
            className="hover:text-[var(--ds-text-primary)] transition-colors"
          >
            Projects
          </Link>
          <span>/</span>
          <span className="text-[var(--ds-text-primary)] truncate">
            {title}
          </span>
        </nav>

        {/* 프로젝트 헤더 */}
        <article className="fade-in">
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-[var(--ds-text-primary)] mb-14 max-w-4xl">
            {title}
          </h1>

          {/* 프로젝트 링크와 태그 */}
          <div className="flex flex-wrap items-center gap-6 mb-14">
            {projectUrl && (
              <>
                <Link
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ds-btn-primary-bg)] text-[var(--ds-btn-primary-color)] font-medium rounded-lg hover:bg-[var(--ds-btn-primary-hover)] transition-colors"
                >
                  <FaGithub size={16} />
                  GitHub에서 보기
                </Link>
                <Link
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--ds-border-primary)] text-[var(--ds-text-primary)] font-medium rounded-lg hover:bg-[var(--ds-border-secondary)] transition-colors"
                >
                  <FaExternalLinkAlt size={14} />
                  라이브 데모
                </Link>
              </>
            )}
          </div>

          {/* 태그 */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-14">
              {tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm bg-[var(--ds-border-primary)] text-[var(--ds-text-primary)] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* 프로젝트 이미지 */}
          {/* <div className="aspect-video relative overflow-hidden rounded-xl mb-12 shadow-lg">
            <Image
              src={imageSrc}
              alt={`${title} 프로젝트 이미지`}
              fill
              className="object-cover"
            />
          </div> */}

          {/* 프로젝트 설명 */}
          <div
            className="prose prose-xl dark:prose-invert max-w-none
                      prose-headings:font-semibold prose-headings:tracking-tight 
                      prose-headings:text-[var(--ds-text-primary)]
                      prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:scroll-mt-20
                      prose-h3:text-xl prose-h3:mt-12 prose-h3:mb-4 prose-h3:scroll-mt-20
                      prose-h4:text-lg prose-h4:mt-10 prose-h4:mb-3 prose-h4:scroll-mt-20
                      prose-p:text-2xl prose-p:leading-8 prose-p:text-[var(--ds-text-primary)] prose-p:mb-8
                      prose-a:text-[var(--ds-accent-primary)] prose-a:font-medium 
                      prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-2
                      prose-code:text-[var(--ds-accent-primary)] 
                      prose-code:bg-[var(--ds-border-secondary)] 
                      prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-normal prose-code:text-base
                      prose-pre:bg-gray-950 prose-pre:border prose-pre:border-[var(--ds-border-primary)] prose-pre:rounded-xl prose-pre:text-base
                      prose-img:rounded-xl prose-img:shadow-lg prose-img:my-12
                      prose-blockquote:border-l-4 prose-blockquote:border-[var(--ds-accent-primary)] 
                      prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-[var(--ds-border-secondary)] 
                      prose-blockquote:py-6 prose-blockquote:rounded-r-lg prose-blockquote:text-[var(--ds-text-primary)] prose-blockquote:text-xl prose-blockquote:my-8
                      prose-strong:font-semibold prose-strong:text-[var(--ds-text-primary)]
                      prose-ul:space-y-3 prose-ol:space-y-3 prose-li:text-[var(--ds-text-primary)] prose-li:text-xl prose-li:leading-8"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        {/* 하단 네비게이션 */}
        <nav className="mt-20 pt-12 border-t border-[var(--ds-border-primary)]">
          <div className="text-center">
            <Link
              href="/project"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--ds-btn-primary-bg)] text-[var(--ds-btn-primary-color)] font-medium rounded-lg hover:bg-[var(--ds-btn-primary-hover)] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              모든 프로젝트 보기
            </Link>
          </div>
        </nav>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const projects = getAllProjectIds();
  return projects.map((project) => ({
    id: project.params.id,
  }));
}
