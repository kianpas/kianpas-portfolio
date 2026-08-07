import type { Metadata } from "next";
import { getPostsByTag } from "@/services/posts";
import PostList from "@/app/blog/_components/PostList";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";

type PageProps = {
  params: Promise<{ tagName: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { tagName } = await params;
  const decodedTagName = decodeURIComponent(tagName);
  const { totalPosts } = getPostsByTag(decodedTagName, 1, 10);

  const title = `#${decodedTagName}`;
  const description = `${decodedTagName} 태그가 붙은 글 ${totalPosts}개.`;

  return {
    title,
    description,
    alternates: { canonical: `/blog/tag/${encodeURIComponent(decodedTagName)}` },
    openGraph: { title, description },
  };
}

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
