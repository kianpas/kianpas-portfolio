import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const { title, description, imageUrl, projectUrl, tags } = project;

  return (
    <li className="py-5">
      <article className="flex flex-col space-y-4">
        <Link href={projectUrl} target="_blank" rel="noopener noreferrer">
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
          <div className="flex items-center gap-x-4 text-xs">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600"
              >
                {tag}
              </span>
            ))}
          </div>
          <h2 className="text-2xl leading-8 font-bold tracking-tight">
            <Link href={projectUrl} target="_blank" rel="noopener noreferrer">
              <span className="text-gray-900 dark:text-gray-100">{title}</span>
            </Link>
          </h2>
          <div className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
            {description}
          </div>
        </div>
      </article>
    </li>
  );
};

export default ProjectCard;
