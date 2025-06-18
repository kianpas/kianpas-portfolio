import { Post } from "@/types/post";

const POSTS_PER_PAGE = 10; // 페이지당 포스트 개수를 상수로 정의

export interface PostsResponse {
  posts: Post[];
  totalPages: number;
  totalPosts: number; // 전체 포스트 수도 유용할 수 있으니 추가
}

//포스트 목록
export const getPosts = async (page: number): Promise<PostsResponse | null> => {
  try {
    const skip = (page - 1) * POSTS_PER_PAGE;
    const limit = POSTS_PER_PAGE;
    const res = await fetch(
      `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`,
      {
        cache: "no-store", // 서버 렌더링에 적합한 캐싱 정책
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch posts ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    // 2. dummyjson의 반환 구조를 보고 타입 단언을 해줄 수 있습니다.
    // data는 { posts: Post[], total: number, skip: number, limit: number } 형태를 가집니다.
    const posts: Post[] = data.posts;
    const totalPosts: number = data.total;

    // 3. totalPages 계산
    const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

    // 4. 새로운 구조의 객체로 반환
    return {
      posts,
      totalPages,
      totalPosts,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return null;
  }
};

//단일 포스트
export const getSinglePost = async (id: string): Promise<Post> => {
  try {
    const res = await fetch(`https://dummyjson.com/posts/${id}`, {
      cache: "no-store", // 서버 렌더링에 적합한 캐싱 정책
    }).catch((error) => {
      throw new Error(`Network error: ${error.message}`);
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
