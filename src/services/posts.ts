import { Post } from "@/types/post";

//포스트 목록
export const getPosts = async (page: number): Promise<Post[]> => {
  try {
    const res = await fetch(
      `https://dummyjson.com/posts?limit=10&skip=${(page - 1) * 10}`,
      {
        cache: "no-store", // 서버 렌더링에 적합한 캐싱 정책
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch posts ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data.posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};

//단일 포스트
export const getSinglePost = async (id: string): Promise<Post> => {
  try {
    const res = await fetch(`https://dummyjson.com/posts/${id}`, {
      cache: "no-store", // 서버 렌더링에 적합한 캐싱 정책
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
