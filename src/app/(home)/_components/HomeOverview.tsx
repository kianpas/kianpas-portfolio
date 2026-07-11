import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { Post } from "@/types/post";
import { Project } from "@/types/project";

type Props = {
  posts: Post[];
  projects: Project[];
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

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
    <div className="mx-auto max-w-5xl px-2 py-14 sm:px-6 sm:py-20">
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
          <SectionLink href="/blog/page/1">전체 글</SectionLink>
        </div>

        {latestPost && (
          <Link href={`/blog/post/${latestPost.slug}`} className="group block py-6 sm:py-10">
            <article className="grid gap-5 md:grid-cols-[10rem_1fr] md:gap-12">
              <div className="font-mono text-xs leading-6 text-gray-500 dark:text-gray-400">
                <p className="font-semibold uppercase tracking-widest text-orange-600 dark:text-orange-400">
                  {latestPost.category}
                </p>
                <time dateTime={latestPost.date} className="mt-2 block">{formatDate(latestPost.date)}</time>
              </div>
              <div>
                <h2 className="max-w-3xl text-2xl font-bold leading-tight tracking-tight text-gray-950 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400 sm:text-4xl">
                  {latestPost.title}
                </h2>
                {latestPost.summary && (
                  <p className="mt-5 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
                    {latestPost.summary}
                  </p>
                )}
              </div>
            </article>
          </Link>
        )}
      </section>

      <section className="mt-16 grid gap-12 border-t border-gray-200 pt-12 dark:border-gray-700 lg:grid-cols-[1.35fr_1fr] lg:gap-20" aria-labelledby="more-heading">
        <div>
          <div className="mb-7 flex items-center justify-between">
            <h2 id="more-heading" className="text-xl font-bold text-gray-950 dark:text-white">이어 읽을 글</h2>
            <SectionLink href="/blog/page/1">Posts</SectionLink>
          </div>
          <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-700 dark:border-gray-700">
            {otherPosts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/blog/post/${post.slug}`} className="group block py-6">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-orange-600 dark:text-orange-400">{post.category}</p>
                <h3 className="text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400 sm:text-xl">
                  {post.title}
                </h3>
                <time dateTime={post.date} className="mt-3 block font-mono text-xs text-gray-500 dark:text-gray-400">{formatDate(post.date)}</time>
              </Link>
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
