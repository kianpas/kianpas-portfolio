"use client";

// import { useState } from "react";
import { Post } from "@/types/post";
import PostCard from "@/components/postCard/PostCard";

interface PostListProps {
  initialPosts: Post[];
  name: string;
  totalPage: number;
}

const PostList: React.FC<PostListProps> = ({
  initialPosts,
//   name,
  totalPage,
}) => {
  //   const [posts, setPosts] = useState<Post[]>(initialPosts);
  //   const [page, setPage] = useState(1);
  //   const [loading, setLoading] = useState(false);
  return (
    <>
      <ul className="divide-y divide-gray-200 dark:divide-gray-700">
        {initialPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </ul>
      {/* 마지막 페이지가 아닐 경우 '더보기' 버튼을 표시합니다. */}
      {1 < totalPage && (
        <div className="flex justify-center py-8">
          <button className="rounded-lg bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400">
            더보기
          </button>
        </div>
      )}
    </>
  );
};

export default PostList;
