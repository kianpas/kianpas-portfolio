import { Post } from "@/types/post";
import PostCard from "../components/postCard/PostCard";

const getPosts = async (): Promise<Post[]> => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error(`API call failed with status ${res.status}`);
  }

  const posts: Post[] = await res.json();

  return posts;
};

const BlogPage = async () => {
  const posts = await getPosts();
  return (
    <section>
      <h1>Blog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} {...post}></PostCard>
        ))}
      </div>
    </section>
  );
};

export default BlogPage;
