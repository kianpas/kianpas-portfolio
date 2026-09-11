import { Post } from "@/types/post";
import PostRow from "@/components/PostRow";
import SearchBar from "@/components/SearchBar";
import PageHeader from "@/components/layout/PageHeader";
import CategoryNav from "./CategoryNav";

type Props = {
  post: Post[];
  showSearch?: boolean;
};

const PostFeed = ({ post, showSearch = false }: Props) => {

  return (
    <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
      <div>
        <PageHeader eyebrow="Writing" title="전체 글" className="mb-6 sm:mb-8" />

        {showSearch && (
          <div className="mb-4 max-w-xl">
            <SearchBar placeholder="제목, 내용, 태그로 검색" />
          </div>
        )}

        <CategoryNav />

        {post.length > 0 ? (
          <div>
            <div className="divide-y divide-gray-200 border-t border-gray-200 dark:divide-gray-700 dark:border-gray-700">
              {post.map((currentPost) => (
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
