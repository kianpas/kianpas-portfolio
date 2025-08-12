import {
  FaEnvelope,
  FaGithub,
  FaCalendar,
  FaServer,
  FaBriefcase,
} from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

import { siteMetadata, skillsData, experienceData } from "@/data/metadata";
import Link from "next/link";
import { Card, Badge, Button } from "@/components/ui";

const AboutPage = async () => {
  return (
    <div className="min-h-screen">
      {/* 배경 장식 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="text-center mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Me
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              백엔드에서 풀스택으로 성장하는 개발자의 이야기
            </p>
          </div>

          <div className="space-y-12">
            {/* 프로필 카드 */}
            <Card variant="elevated">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* 프로필 이미지 */}
                <div className="text-center flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {siteMetadata.author[0]}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {siteMetadata.author}
                  </h2>
                  <Badge variant="info" size="md" className="mb-2">
                    {siteMetadata.occupation}
                  </Badge>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {siteMetadata.company}
                  </p>
                </div>

                {/* 통계 정보 */}
                <div className="flex flex-col items-center justify-center space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center">
                    정보
                  </h3>
                  <div className="space-y-3 w-full max-w-xs">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FaCalendar className="text-blue-500" size={16} />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          경력
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        3+ 년
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FaServer className="text-blue-500" size={16} />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          관심사
                        </span>
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100">
                        풀스택
                      </span>
                    </div>
                  </div>
                </div>

                {/* 연락처 및 링크 */}
                <div className="flex flex-col items-center justify-center text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    연락처
                  </h3>
                  <div className="space-y-3">
                    <Link
                      href={`mailto:${siteMetadata.email}`}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FaEnvelope size={16} />
                      <span className="text-sm">이메일</span>
                    </Link>
                    <Link
                      href={siteMetadata.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FaGithub size={16} />
                      <span className="text-sm">GitHub</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
            {/* 소개 */}
            <Card variant="elevated">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  안녕하세요! 👋
                </h3>

                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p>
                    견고하고 확장성 있는 시스템을 만드는 것을 좋아하는 백엔드
                    개발자 {siteMetadata.author}입니다.
                  </p>

                  <p>
                    주로 Java와 Spring Framework를 사용하여 서버 개발에
                    집중해왔습니다. 효율적인 데이터 모델 설계와 깔끔한 비즈니스
                    로직 구현을 통해 안정적인 서비스를 만드는 것에 관심이
                    많습니다.
                  </p>

                  <p>
                    최근에는 사용자와 직접 상호작용하는 프론트엔드 영역에 큰
                    매력을 느끼고 있습니다. React와 Next.js를 통해 서버와
                    클라이언트가 어떻게 유기적으로 소통하며 사용자 경험을
                    극대화하는지 탐구하고 있습니다.
                  </p>

                  <p>
                    이 블로그는 백엔드 기술 경험과 풀스택 개발자로 성장하기 위한
                    프론트엔드 학습 과정을 기록하는 공간입니다.
                  </p>
                </div>
              </div>
            </Card>

            {/* 경력 */}
            <Card variant="elevated">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-blue-500" size={20} />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    경력(테스트용 임시)
                  </h3>
                </div>

                <div className="space-y-6">
                  {experienceData.map((exp, index) => (
                    <div key={index} className="relative">
                      {/* 타임라인 라인 (마지막 항목 제외) */}
                      {index < experienceData.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-full bg-gray-200 dark:bg-gray-700"></div>
                      )}

                      <div className="flex gap-4">
                        {/* 타임라인 점 */}
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mt-1">
                          <FaBriefcase
                            className="text-blue-600 dark:text-blue-400"
                            size={16}
                          />
                        </div>

                        {/* 경력 내용 */}
                        <div className="flex-1 space-y-3">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              {exp.position}
                            </h4>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                              <span className="font-medium">{exp.company}</span>
                              <span>•</span>
                              <span className="text-sm">{exp.period}</span>
                            </div>
                          </div>

                          <p className="text-gray-600 dark:text-gray-300">
                            {exp.description}
                          </p>

                          {/* 주요 성과 */}
                          <div className="space-y-2">
                            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              주요 성과
                            </h5>
                            <ul className="space-y-1">
                              {exp.achievements.map((achievement, achIndex) => (
                                <li
                                  key={achIndex}
                                  className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                                >
                                  <FaCheckCircle
                                    className="text-green-500 mt-0.5 flex-shrink-0"
                                    size={12}
                                  />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* 사용 기술 */}
                          <div className="flex flex-wrap gap-1">
                            {exp.technologies.map((tech) => (
                              <Badge key={tech} variant="default" size="sm">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            {/* 기술 스택과 GitHub을 나란히 배치 */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* 기술 스택 */}
              <Card variant="elevated">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    기술 스택
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="success" size="sm">
                          Backend
                        </Badge>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          주력 기술
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skillsData.backend.map((tech) => (
                          <Badge key={tech} variant="default" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="warning" size="sm">
                          Frontend
                        </Badge>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          학습 중
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skillsData.frontend.map((tech) => (
                          <Badge key={tech} variant="default" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="info" size="sm">
                          Tools
                        </Badge>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          도구 및 기타
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {skillsData.tools.map((tech) => (
                          <Badge key={tech} variant="default" size="sm">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* GitHub 섹션 */}
              <Card variant="elevated" className="flex flex-col justify-center">
                <div className="text-center space-y-6">
                  <div>
                    <FaGithub
                      className="mx-auto text-gray-400 dark:text-gray-600 mb-4"
                      size={48}
                    />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      GitHub
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      프로젝트와 코드를 확인해보세요
                    </p>
                  </div>
                  <Button variant="primary" size="lg">
                    <Link
                      href={siteMetadata.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <FaGithub size={16} />
                      방문하기
                    </Link>
                  </Button>
                </div>
              </Card>
            </div>

            {/* 마무리 메시지 */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                이곳에 기록된 경험이 다른 개발자들에게 도움이 되기를 바랍니다.
                🚀
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
