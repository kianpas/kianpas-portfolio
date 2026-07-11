import { Project } from "@/types/project";
import Link from "next/link";

type ProjectCardProps = {
  project: Project;
};

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  const [year, month] = dateStr.split("-");
  return `${year}.${month}`;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { slug, title, description, tags, startDate, endDate } = project;

  const dateRange = startDate
    ? `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : "진행 중"}`
    : "";

  return (
    <Link href={`/project/${slug}`} className="group block py-8">
      <article className="grid gap-4 md:grid-cols-[11rem_1fr] md:gap-12">
        <div className="font-mono text-xs leading-6 text-gray-500 dark:text-gray-400">
          {dateRange && <p>{dateRange}</p>}
        </div>
        <div>
          <h3 className="text-xl font-bold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400 sm:text-2xl">
            {title}
          </h3>
          <p className="mt-3 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">
            {description}
          </p>
          {tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-gray-500 dark:text-gray-400">
              {tags.slice(0, 6).map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
