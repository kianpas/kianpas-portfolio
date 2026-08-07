import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";
import ArrowLink from "@/components/ArrowLink";

const NotFound = () => (
  <PageContainer>
    <PageHeader
      eyebrow="404"
      title="페이지를 찾을 수 없습니다"
      description="주소가 바뀌었거나 삭제된 글일 수 있습니다."
    />
    <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
      <ArrowLink href="/">홈으로</ArrowLink>
      <ArrowLink href="/blog">전체 글 보기</ArrowLink>
    </div>
  </PageContainer>
);

export default NotFound;
