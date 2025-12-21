import { NextRequest, NextResponse } from "next/server";
import { getPostsByTag } from "@/services/posts";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag") as string;

  if (!tag) {
    return NextResponse.json({ error: "tag is required" }, { status: 400 });
  }
  const page = Number(searchParams.get("page") ?? 1);
  try {
    const decodedTag = decodeURIComponent(tag);
    const { posts, totalPages } = getPostsByTag(decodedTag, page, 10);

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
