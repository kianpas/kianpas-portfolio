import { Project } from "@/types/project";
import Link from "next/link";
import TagList from "@/components/TagList";
import { formatProjectPeriod } from "@/utils/date";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { slug, title, description, tags, startDate, endDate } = project;

  const dateRange = formatProjectPeriod(startDate, endDate);

  return (
    <Link href={`/project/${slug}`} className="group block py-8">
      <article className="grid gap-4 md:grid-cols-[11rem_1fr] md:gap-12">
        <div className="font-mono text-xs leading-6 text-gray-500 dark:text-gray-400">
          {dateRange && <p>{dateRange}</p>}
        </div>
        <div>
          <h3 className="text-xl font-bold leading-snug tracking-tight text-gray-900 transition-colors group-hover:text-orange-700 dark:text-white dark:group-hover:text-orange-400 sm:text-2xl">
            {title}
          </h3>
          <p className="mt-3 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">
            {description}
          </p>
          <TagList tags={tags} limit={6} className="mt-4 gap-x-4" />
        </div>
      </article>
    </Link>
  );
};

export default ProjectCard;
