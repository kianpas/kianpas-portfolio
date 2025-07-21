import Link from "next/link";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* 메인 히어로 섹션 */}
      <section className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* 인사말 */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              <span
                className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                               dark:from-gray-100 dark:via-gray-200 dark:to-gray-100 
                               bg-clip-text text-transparent"
              >
                안녕하세요
              </span>
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-700 dark:text-gray-300">
              개발자{" "}
              <span className="text-primary-600 dark:text-primary-400">
                이운산
              </span>
              입니다
            </h2>
          </div>

          {/* 소개 텍스트 */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            웹 개발과 새로운 기술에 관심이 많은 개발자입니다.
          </p>

          {/* 주요 CTA - 하나만 강조 */}
          <div className="pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-8 py-4 
              text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300
              font-semibold rounded-full 
              hover:bg-blue-50 dark:hover:bg-blue-900/20
              transition-all duration-200 hover:scale-105"
            >
              <span>최근 글 보기</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
