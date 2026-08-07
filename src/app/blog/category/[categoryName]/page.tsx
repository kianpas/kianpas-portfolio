import type { Metadata } from "next";
import { getPostsByCategory } from "@/services/posts";
import PostList from "@/app/blog/_components/PostList";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";

type PageProps = {
  params: Promise<{ categoryName: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { categoryName } = await params;
  const decodedCategoryName = decodeURIComponent(categoryName);
  const { totalPosts } = getPostsByCategory(decodedCategoryName, 1, 10);

  const title = `${decodedCategoryName} 카테고리`;
  const description = `${decodedCategoryName} 카테고리의 글 ${totalPosts}개.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/blog/category/${encodeURIComponent(decodedCategoryName)}`,
    },
    openGraph: { title, description },
  };
}

const CategoryPage = async ({ params }: PageProps) => {
  const { categoryName } = await params;

  const decodedCategoryName = decodeURIComponent(categoryName);
  const { posts, totalPosts, totalPages } = getPostsByCategory(decodedCategoryName, 1, 10);

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Category"
        title={decodedCategoryName}
        description={`${totalPosts}개의 글`}
      />
      <PostList initialPosts={posts} name={decodedCategoryName} totalPage={totalPages} />
    </PageContainer>
  );
};

export default CategoryPage;
