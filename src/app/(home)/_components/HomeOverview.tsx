import Link from "next/link";
import { FaArrowRight, FaGithub } from "react-icons/fa6";
import { Post } from "@/types/post";
import { Project } from "@/types/project";
import { siteMetadata } from "@/data/metadata";
import PostRow from "@/components/PostRow";

type Props = {
  posts: Post[];
  projects: Project[];
};

const SectionLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
  >
    {children}
    <FaArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden />
  </Link>
);

const HomeOverview = ({ posts, projects }: Props) => {
  const [latestPost, ...otherPosts] = posts;

  return (
    <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 sm:mb-12">
        <p className="text-sm leading-6 text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-white">
            {siteMetadata.author}
          </span>
          <span aria-hidden> — </span>
          개발하며 마주친 문제와 해결의 기록
        </p>
        <Link
          href={siteMetadata.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-mono text-xs text-gray-500 transition-colors hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
        >
          <FaGithub className="h-4 w-4" aria-hidden />
          github.com/kianpas
        </Link>
      </div>

      <section aria-labelledby="latest-heading">
        <div className="mb-8 flex items-end justify-between border-b border-gray-200 pb-5 dark:border-gray-700">
          <div>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
              Latest note
            </p>
            <h1 id="latest-heading" className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
              최근 기록
            </h1>
          </div>
          <SectionLink href="/blog">전체 글</SectionLink>
        </div>

        {latestPost && (
          <PostRow post={latestPost} variant="featured" className="py-6 sm:py-10" />
        )}
      </section>

      <section className="mt-16 grid gap-12 border-t border-gray-200 pt-12 dark:border-gray-700 lg:grid-cols-[1.35fr_1fr] lg:gap-20" aria-labelledby="more-heading">
        <div>
          <div className="mb-7 flex items-center justify-between">
            <h2 id="more-heading" className="text-xl font-bold text-gray-950 dark:text-white">이어 읽을 글</h2>
            <SectionLink href="/blog">Posts</SectionLink>
          </div>
          <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-700 dark:border-gray-700">
            {otherPosts.slice(0, 3).map((post) => (
              <PostRow key={post.slug} post={post} variant="compact" className="py-6" />
            ))}
          </div>
        </div>

        <div>
          <div className="mb-7 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-950 dark:text-white">프로젝트 기록</h2>
            <SectionLink href="/project">Projects</SectionLink>
          </div>
          <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-700 dark:border-gray-700">
            {projects.map((project) => (
              <Link key={project.slug} href={`/project/${project.slug}`} className="group block py-6">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  {project.type === "professional" ? "Professional" : "Personal"}
                </p>
                <h3 className="text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                  {project.title}
                </h3>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{project.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeOverview;
