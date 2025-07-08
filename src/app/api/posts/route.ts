import { NextRequest, NextResponse } from "next/server";
import { getPostsByTag } from "@/services/posts";

export async function GET(req: NextRequest) {
  try {
    console.log("check => ", req.url);
    const { searchParams } = new URL(req.url);
    console.log("searchParams => ", searchParams);
    const tag = searchParams.get("tag") as string;
    console.log("tag => ", tag);

    const page = parseInt(searchParams.get("page") || "1", 10);
    console.log("page) => ", page);
    const { posts, totalPages } = getPostsByTag(tag, page, 10);
    console.log("posts, totalPages => ", posts[0].title, totalPages);
    return NextResponse.json({
      posts,
      hasMore: page < totalPages,
    });
  } catch (e) {
    console.error("API error", e);
    return new NextResponse("Server Error", { status: 500 });
  }
}
