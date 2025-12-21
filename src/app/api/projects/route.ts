import { NextRequest, NextResponse } from "next/server";
import { getSortedProjectsData } from "@/services/projects";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  // const page = parseInt(searchParams.get("page") || "1", 10);
  const page = Number(searchParams.get("page") ?? 1);
  try {

    const { projects, totalPages } = getSortedProjectsData(page);

    return NextResponse.json({
      projects,
      hasMore: page < totalPages,
    });
  } catch (error) {
    console.error("조회 중 오류:", error);
    return NextResponse.json(
      { error: "조회 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
