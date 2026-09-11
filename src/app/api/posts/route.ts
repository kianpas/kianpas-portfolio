import { NextRequest, NextResponse } from "next/server";
import { getPostsByTag, getPostsByCategory } from "@/services/posts";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag") as string;
  const category = searchParams.get("category");

  if (!tag && !category) {
    return NextResponse.json({ error: "tag or category is required" }, { status: 400 });
  }
  const page = Number(searchParams.get("page") ?? 1);
  try {
    const { posts, totalPages } = category
      ? getPostsByCategory(category, page, 10)
      : getPostsByTag(tag, page, 10);

    return NextResponse.json({
      posts,
      hasMore: page < totalPages,
    });
  } catch (error) {
    console.error("태그 조회 중 오류", error);
    return NextResponse.json(
      { error: "태그 조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
