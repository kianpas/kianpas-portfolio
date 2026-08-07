import type { Metadata } from "next";

// 구세대 카드 UI 데모 페이지. 공개 배포에는 올라가지만 검색 색인 대상은 아니다.
// (유지/삭제 여부는 NOTES.md의 별도 과제)
export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

const DesignSystemLayout = ({ children }: { children: React.ReactNode }) => children;

export default DesignSystemLayout;
