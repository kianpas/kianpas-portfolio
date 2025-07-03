import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { id, title, description, imageUrl, projectUrl, tags } = project;

  return (
    <li className="py-5">
      <article className="flex flex-col space-y-4">
        <Link href={`/project/${id}`}>
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <Image
              src={imageUrl}
              alt={`${title} 이미지`}
              fill
              className="object-cover"
            />
          </div>
        </Link>
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl leading-8 font-bold tracking-tight">
              <Link href={`/project/${id}`}>
                <span className="text-gray-900 dark:text-gray-100">{title}</span>
              </Link>
            </h2>
            {projectUrl && (
              <Link href={projectUrl} target="_blank" rel="noopener noreferrer">
                <FaGithub className="h-6 w-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100" />
              </Link>
            )}
          </div>
          <div className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            {description}
          </div>
        </div>
      </article>
    </li>
  );
};

export default ProjectCard;
