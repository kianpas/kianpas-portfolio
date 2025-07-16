"use client";

import { useState } from "react";
import { Post } from "@/types/post";
import PostCard from "@/components/postCard/PostCard";

interface PostListProps {
  initialPosts: Post[];
  name: string;
  totalPage: number;
}

const PostList = ({ initialPosts, name, totalPage }: PostListProps) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(page < totalPage);

  const handleLoadMore = async () => {
    if (loading || page >= totalPage) return;

    setLoading(true);
    const res = await fetch(`/api/posts?tag=${name}&page=${page + 1}`);

    if (!res.ok) {
      setLoading(false);
      return;
    }

    const data = await res.json();
    setPosts((prev) => [...prev, ...data.posts]);
    setPage((prev) => prev + 1);
    setHasMore(data.hasMore);
    setLoading(false);
  };

  return (
    <>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
      {/* 마지막 페이지가 아닐 경우 '더보기' 버튼을 표시합니다. */}
      {1 < totalPage && (
        <div className="flex justify-center py-8">
          {hasMore && (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? "로딩 중.." : "더보기"}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default PostList;
