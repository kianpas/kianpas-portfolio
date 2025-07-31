export interface Post {
  id: string;
  title: string;
  date: string;
  tags?: string[];
  summary?: string;
  category: string;
  content?: string;
  readingTime: number;
  author?: string;
}

