type Props = {
  onClick: () => void;
  loading: boolean;
};

/** 목록 하단의 "더보기" 텍스트 버튼 (PostList / ProjectList 공통) */
const LoadMoreButton = ({ onClick, loading }: Props) => (
  <div className="mt-10 flex justify-center">
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="text-sm font-semibold text-gray-600 transition-colors hover:text-orange-700 disabled:cursor-not-allowed disabled:opacity-60 dark:text-gray-400 dark:hover:text-orange-400"
    >
      {loading ? "로딩 중..." : "더보기"}
    </button>
  </div>
);

export default LoadMoreButton;
