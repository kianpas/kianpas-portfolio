import { Project } from "@/types/project";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaCalendarAlt  } from "react-icons/fa";

type ProjectCardProps = {
  project: Project;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  const {
    id,
    title,
    description,
    imageUrl,
    projectUrl,
    tags,
    startDate,
    endDate,
  } = project;

  const imageSrc = imageUrl || "/images/projects/default-project.png"

  // 날짜 포맷팅 함수
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const [year, month] = dateStr.split("-");
    return `${year}.${month}`;
  };

  // 기간 표시 함수
  const getDateRange = () => {
    if (!startDate) return "";

    const start = formatDate(startDate);
    const end = endDate ? formatDate(endDate) : "진행 중";

    return `${start} - ${end}`;
  };

  return (
    <li className="py-5">
      <article className="group">
        <Link href={`/project/${id}`}>
          <div
            className="aspect-video relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700 
                          group-hover:border-primary-300 dark:group-hover:border-primary-600 
                          transition-colors duration-200"
          >
            <Image
              src={imageSrc}
              alt={`${title} 이미지`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        {/* 콘텐츠 섹션 */}
        <div className="space-y-3 mt-4">

           {/* 프로젝트 기간 */}
           {startDate && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <FaCalendarAlt size={14} className="text-primary-500" />
              <span>{getDateRange()}</span>
            </div>
          )}

          {/* 태그 섹션 */}
          <div className="flex flex-wrap items-center gap-x-2 gap-y-2 text-xs">
            {tags.slice(0, 4).map((tag, index) => (
              <span
                key={index}
                className="rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1.5 font-medium 
                text-gray-700 dark:text-gray-300
                group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 
                group-hover:text-primary-700 dark:group-hover:text-primary-300 
                transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <h2 className="text-2xl leading-8 font-bold tracking-tight">
              <Link href={`/project/${id}`}>
                <span className="text-gray-900 dark:text-gray-100">
                  {title}
                </span>
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
