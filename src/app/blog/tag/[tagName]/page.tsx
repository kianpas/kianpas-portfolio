import { getPostsByTag } from "@/services/posts";
import PostList from "@/app/blog/_components/PostList";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";

type PageProps = {
  params: Promise<{ tagName: string }>;
};

const TagPage = async ({ params }: PageProps) => {
  const { tagName } = await params;

  const decodedTagName = decodeURIComponent(tagName);
  const { posts, totalPosts, totalPages } = getPostsByTag(decodedTagName, 1, 10);

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Tag"
        title={`#${decodedTagName}`}
        description={`${totalPosts}개의 글`}
      />
      <PostList initialPosts={posts} name={decodedTagName} totalPage={totalPages} />
    </PageContainer>
  );
};

export default TagPage;
