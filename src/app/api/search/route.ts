import { NextRequest, NextResponse } from "next/server";
import { getSortedPostsData } from "@/services/posts";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ posts: [] });
  }

  try {
    const allPosts = getSortedPostsData();
    const searchQuery = query.toLowerCase();

    const filteredPosts = allPosts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(searchQuery);
      const summaryMatch = post.summary?.toLowerCase().includes(searchQuery);
      const contentMatch = post.content?.toLowerCase().includes(searchQuery);
      const tagMatch = post.tags?.some(tag =>
        tag.toLowerCase().includes(searchQuery)
      );
      const categoryMatch = post.category?.toLowerCase().includes(searchQuery);

      return titleMatch || summaryMatch || contentMatch || tagMatch || categoryMatch;
    });

    // 검색 결과를 최대 10개로 제한
    const limitedResults = filteredPosts.slice(0, 10);

    return NextResponse.json({
      posts: limitedResults,
      total: filteredPosts.length
    });
  } catch (error) {
    console.error("검색 중 오류:", error);
    return NextResponse.json(
      { error: "검색 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}