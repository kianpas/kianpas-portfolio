import { NextRequest, NextResponse } from "next/server";
import { getSortedProjectsData } from "@/services/projects";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);

    const { projects, totalPages } = getSortedProjectsData(page);

    return NextResponse.json({
      projects,
      hasMore: page < totalPages,
    });
  } catch (e) {
    console.error("API error", e);
    return new NextResponse("Server Error", { status: 500 });
  }
}
