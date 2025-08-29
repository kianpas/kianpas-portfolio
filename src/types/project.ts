export interface Project {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  tags: string[];
  type: "professional" | "personal";
  date?: string;
  startDate?: string;  // 추가
  endDate?: string;    // 추가 (진행 중이면 비워둠)
}
