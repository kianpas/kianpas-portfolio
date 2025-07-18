import {
  FaEnvelope,
  FaGithub,
  FaQq,
  FaCalendar,
  FaCode,
  FaServer,
} from "react-icons/fa6";

import { siteMetadata, skillsData } from "@/data/metadata";
import Link from "next/link";

const AboutPage = async () => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {/* 헤더 */}
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
          About
        </h1>
      </div>

      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        {/* 좌측: 프로필 정보 */}
        <div className="flex flex-col items-center pt-8 space-y-6">
          {/* 프로필 이미지 */}
          <div className="relative">
            <FaQq size={128} className="text-gray-400 dark:text-gray-600" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>

          {/* 기본 정보 */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl leading-8 font-bold tracking-tight">
              {siteMetadata.author}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">
              {siteMetadata.occupation}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {siteMetadata.company}
            </div>
          </div>

          {/* 연락처 */}
          <div className="flex space-x-4">
            <Link
              href={`mailto:${siteMetadata.email}`}
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              <FaEnvelope size={24} />
            </Link>
            <Link
              href={siteMetadata.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors"
            >
              <FaGithub size={24} />
            </Link>
          </div>

          {/* 간단한 통계 */}
          <div className="w-full max-w-xs space-y-3 pt-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <FaCalendar className="text-primary-500" size={16} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  경력
                </span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                3+ 년
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <FaServer className="text-primary-500" size={16} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  주력
                </span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Backend
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2">
                <FaCode className="text-primary-500" size={16} />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  학습 중
                </span>
              </div>
              <span className="font-semibold text-gray-900 dark:text-gray-100">
                Frontend
              </span>
            </div>
          </div>
        </div>

        {/* 우측: 소개 본문 */}
        <div className="prose max-w-none pt-8 pb-8 dark:prose-invert xl:col-span-2">
          <h4>
            견고하고 확장성 있는 시스템을 만드는 것을 좋아하는 백엔드 개발자{" "}
            {siteMetadata.author}입니다.
          </h4>

          <p>
            주로 Java와 Spring Framework를 사용하여 서버 개발에 집중해왔습니다.
            효율적인 데이터 모델 설계와 깔끔한 비즈니스 로직 구현을 통해
            안정적인 서비스를 만드는 것에 관심이 많습니다.
          </p>

          <p>
            최근에는 사용자와 직접 상호작용하는 프론트엔드 영역에 큰 매력을
            느끼고 있습니다. React와 Next.js를 통해 서버와 클라이언트가 어떻게
            유기적으로 소통하며 사용자 경험을 극대화하는지 탐구하고 있습니다.
          </p>

          <p>
            이 블로그는 백엔드 기술 경험과 풀스택 개발자로 성장하기 위한
            프론트엔드 학습 과정을 기록하는 공간입니다.
          </p>

          {/* 기술 스택 */}
          <div className="not-prose mt-8">
            <h5 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
              주요 기술 스택
            </h5>

            <div className="space-y-4">
              <div>
                <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Backend
                </h6>
                <div className="flex flex-wrap gap-2">
                  {skillsData.backend.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 
                                               text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Frontend (학습 중)
                </h6>
                <div className="flex flex-wrap gap-2">
                  {skillsData.frontend.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 
                                               text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h6 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tools & Others
                </h6>
                <div className="flex flex-wrap gap-2">
                  {skillsData.tools.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 
                                               text-gray-700 dark:text-gray-300 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* GitHub 활동 */}
          <div className="not-prose mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div className="flex items-center justify-between">
              <h5 className="text-lg font-semibold">GitHub 프로필</h5>
              <Link
                href={siteMetadata.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 dark:text-primary-400 hover:underline flex items-center gap-1"
              >
                <span>프로필 방문하기</span>
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
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-8">
            이곳에 기록된 경험이 다른 개발자들에게 도움이 되기를 바랍니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
