import { Project } from "@/types/project";
import Link from "next/link";
import { FaGithub, FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";
import { Card, Badge } from "@/components/ui";

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
    <Card 
      variant="elevated" 
      className="group hover:border-blue-300/30 dark:hover:border-blue-600/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full"
    >
      <div className="space-y-4 h-full flex flex-col">
        {/* 헤더: 제목과 링크 */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 flex-1">
            <Link href={`/project/${id}`} className="block">
              {title}
            </Link>
          </h2>
          
          <div className="flex items-center gap-2 flex-shrink-0">
            {projectUrl && (
              <Link 
                href={projectUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
                title="GitHub 저장소"
              >
                <FaGithub className="h-5 w-5" />
              </Link>
            )}
            <Link 
              href={`/project/${id}`}
              className="text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              title="프로젝트 상세보기"
            >
              <FaExternalLinkAlt className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* 메타데이터 */}
        {startDate && (
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <FaCalendarAlt size={14} />
            <span>{getDateRange()}</span>
          </div>
        )}

        {/* 설명 */}
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
          {description}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          {tags.slice(0, 5).map((tag, index) => (
            <Badge key={index} variant="default" size="sm">
              {tag}
            </Badge>
          ))}
          {tags.length > 5 && (
            <span className="text-xs text-gray-400 self-center">
              +{tags.length - 5}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
