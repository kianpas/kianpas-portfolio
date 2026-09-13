import Link from "next/link";

type Props = {
  tags: string[];
  /** 표시할 최대 개수 (미지정 시 전체) */
  limit?: number;
  /** 지정 시 각 태그를 링크로 렌더링 */
  href?: (tag: string) => string;
  /** 래퍼 여백/간격 오버라이드 (예: "mt-6 gap-x-4") */
  className?: string;
};

/** "#태그" 목록. 평문 또는 링크(href 제공 시)로 렌더링 */
const TagList = ({ tags, limit, href, className = "gap-x-4" }: Props) => {
  if (!tags || tags.length === 0) return null;

  const shown = limit ? tags.slice(0, limit) : tags;

  return (
    <div
      className={`flex flex-wrap gap-y-2 font-mono text-xs text-gray-500 dark:text-gray-400 ${className}`}
    >
      {shown.map((tag) =>
        href ? (
          <Link
            key={tag}
            href={href(tag)}
            className="transition-colors hover:text-orange-700 dark:hover:text-orange-400"
          >
            #{tag}
          </Link>
        ) : (
          <span key={tag}>#{tag}</span>
        )
      )}
    </div>
  );
};

export default TagList;
