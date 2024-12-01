export interface Post {
  id: string;
  title: string;
  body: string;
  tags: string[];
  reactions: Reactions;
  views: number;
  userId: number;
}
// Reactions 타입 정의
export interface Reactions {
  likes: number;
  dislikes: number;
}
