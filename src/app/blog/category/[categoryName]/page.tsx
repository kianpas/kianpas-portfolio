type PageProps = {
  params: Promise<{ categoryName: string }>;
};

const CategoryPage = async ({ params }: PageProps) => {
  const { categoryName } = await params;
  console.log("categoryName => ", categoryName);

  return <div>{categoryName}</div>;
};

export default CategoryPage;
