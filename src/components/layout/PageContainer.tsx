import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** 내부 컨테이너에 덧붙일 클래스 (여백 조정 등) */
  className?: string;
};

/**
 * 모든 페이지가 공유하는 바깥 래퍼.
 * min-h-screen + 중앙 정렬 max-w-5xl 컬럼 + 표준 좌우/상하 여백.
 */
const PageContainer = ({ children, className = "" }: Props) => (
  <div className="min-h-screen">
    <div className={`mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 ${className}`}>
      {children}
    </div>
  </div>
);

export default PageContainer;
