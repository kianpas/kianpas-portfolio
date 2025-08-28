"use client";

import { useState } from "react";
import { Post } from "@/types/post";
import PostCard from "@/app/blog/_components/PostCard";
import { Button } from "@/components/ui";

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
      {/* 포스트 목록 - 카드 간격 추가 */}
      <div className="space-y-6 mb-16">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* 더보기 버튼 */}
      {1 < totalPage && (
        <div className="flex justify-center">
          {hasMore && (
            <Button 
              variant="primary" 
              size="lg"
              onClick={handleLoadMore}
              disabled={loading}
              loading={loading}
            >
              {loading ? "로딩 중..." : "더보기"}
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default PostList;
