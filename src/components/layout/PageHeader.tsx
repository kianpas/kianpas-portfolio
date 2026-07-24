import { ReactNode } from "react";

type Props = {
  /** 모노 대문자 아이브로우 라벨 */
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  /** 설명 아래 추가 액션(링크 등) */
  children?: ReactNode;
  /** 래퍼 여백 오버라이드 */
  className?: string;
};

/**
 * 목록/아카이브 페이지의 표준 헤더.
 * 모노 아이브로우 + 제목 + 선택적 설명 + 하단 헤어라인.
 */
const PageHeader = ({
  eyebrow,
  title,
  description,
  children,
  className = "mb-14 sm:mb-16",
}: Props) => (
  <div className={`border-b border-gray-200 pb-5 dark:border-gray-700 ${className}`}>
    <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
      {eyebrow}
    </p>
    <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
      {title}
    </h1>
    {description && (
      <p className="mt-3 max-w-2xl text-base text-gray-600 dark:text-gray-300">
        {description}
      </p>
    )}
    {children}
  </div>
);

export default PageHeader;
