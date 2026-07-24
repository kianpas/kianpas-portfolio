import { getPostsByCategory } from "@/services/posts";
import PostList from "@/app/blog/_components/PostList";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";

type PageProps = {
  params: Promise<{ categoryName: string }>;
};

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
