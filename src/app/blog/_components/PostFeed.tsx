import { Post } from "@/types/post";
import PostRow from "@/components/PostRow";
import SearchBar from "@/components/SearchBar";
import PageHeader from "@/components/layout/PageHeader";

type Props = {
  post: Post[];
  showSearch?: boolean;
  emphasizeLatest?: boolean;
};

const PostFeed = ({ post, showSearch = false, emphasizeLatest = true }: Props) => {
  const latestPost = emphasizeLatest ? post[0] : undefined;
  const previousPosts = emphasizeLatest ? post.slice(1) : post;

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <div>
        <PageHeader eyebrow="Latest writing" title="최근 글" className="mb-10 sm:mb-14" />

        {showSearch && (
          <div className="mb-12 max-w-xl">
            <SearchBar placeholder="제목, 내용, 태그로 검색" />
          </div>
        )}

        {post.length > 0 ? (
          <div>
            {latestPost && (
              <PostRow
                post={latestPost}
                variant="featured"
                className="border-b border-gray-200 pb-10 dark:border-gray-700 sm:pb-12"
              />
            )}

            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {previousPosts.map((currentPost) => (
                <PostRow key={currentPost.slug} post={currentPost} />
              ))}
            </div>
          </div>
        ) : (
          <p className="py-20 text-center text-gray-500 dark:text-gray-400">
            아직 작성된 글이 없습니다.
          </p>
        )}
      </div>
    </section>
  );
};

export default PostFeed;
