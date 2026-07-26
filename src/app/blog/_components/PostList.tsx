"use client";

import { Post } from "@/types/post";
import PostRow from "@/components/PostRow";
import LoadMoreButton from "@/components/LoadMoreButton";
import { useLoadMore } from "@/hooks/useLoadMore";

interface PostListProps {
  initialPosts: Post[];
  name: string;
  totalPage: number;
}

const PostList = ({ initialPosts, name, totalPage }: PostListProps) => {
  const { items: posts, loading, hasMore, loadMore } = useLoadMore<Post>({
    initialItems: initialPosts,
    totalPage,
    fetchPage: async (page) => {
      const encodedName = encodeURIComponent(name);
      const res = await fetch(`/api/posts?tag=${encodedName}&page=${page}`);
      if (!res.ok) throw new Error("failed to load posts");
      const data = await res.json();
      return { items: data.posts, hasMore: data.hasMore };
    },
  });

  return (
    <>
      <div className="divide-y divide-gray-200 border-y border-gray-200 dark:divide-gray-700 dark:border-gray-700">
        {posts.map((post) => (
          <PostRow key={post.slug} post={post} />
        ))}
      </div>

      {hasMore && <LoadMoreButton onClick={loadMore} loading={loading} />}
    </>
  );
};

export default PostList;
