"use client";

import { useState } from "react";
import { Post } from "@/types/post";
import PostRow from "@/components/PostRow";

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
    const encodedName = encodeURIComponent(name);
    const res = await fetch(`/api/posts?tag=${encodedName}&page=${page + 1}`);

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
      <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-700 dark:border-gray-700">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={loading}
            className="text-sm font-semibold text-gray-600 transition-colors hover:text-orange-600 disabled:cursor-not-allowed disabled:opacity-60 dark:text-gray-400 dark:hover:text-orange-400"
          >
            {loading ? "로딩 중..." : "더보기"}
          </button>
        </div>
      )}
    </>
  );
};

export default PostList;
