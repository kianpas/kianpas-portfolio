export const getPosts = async (page: number) => {
  const res = await fetch(
    `https://dummyjson.com/posts?limit=10&skip=${(page - 1) * 10}`,
    {
      cache: "no-store", // 서버 렌더링에 적합한 캐싱 정책
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const data = await res.json();
  return data.posts;
};

// API 호출 함수
export const getSinglePost = async (id: string) => {
  const res = await fetch(`https://dummyjson.com/posts/${id}`, {
    cache: "no-store", // 서버 렌더링에 적합한 캐싱 정책
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const data = await res.json();
  
  return data;
};
