import { Button, Badge } from "@/components/ui";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative px-6 py-20 md:py-32 overflow-hidden">
      {/* 배경 장식 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-8">
          {/* 메인 제목 */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block text-gray-900 dark:text-white mb-2">
                안녕하세요,
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                이운산입니다
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              웹 개발과 새로운 기술에 관심이 많은 개발자입니다.
              <br />
              <span className="text-lg text-gray-500 dark:text-gray-400">
                사용자 경험을 중시하며, 깔끔하고 효율적인 코드를 작성합니다.
              </span>
            </p>
          </div>

          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button variant="primary" size="lg" className="min-w-[160px]">
              <Link href="/blog" className="flex items-center gap-2">
                블로그 보기
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
            </Button>

            <Button variant="secondary" size="lg" className="min-w-[160px]">
              <Link href="/project" className="flex items-center gap-2">
                프로젝트 보기
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </Button>
          </div>

          {/* 기술 스택 */}
          <div className="pt-12">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              주로 사용하는 기술
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Java", "React", "Next.js", "TypeScript", "TailwindCSS"].map(
                (tech) => (
                  <Badge key={tech} variant="default" size="md">
                    {tech}
                  </Badge>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
