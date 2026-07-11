import Link from "next/link";
import { FaGithub } from "react-icons/fa6";

import { siteMetadata, skillsData, experienceData } from "@/data/metadata";

const skillGroups = [
  { label: "Backend", items: skillsData.backend },
  { label: "Frontend", items: skillsData.frontend },
  { label: "Tools", items: skillsData.tools },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-2 py-14 sm:px-6 sm:py-20">
        {/* 헤더 */}
        <header className="border-b border-gray-200 pb-8 dark:border-gray-700 sm:pb-10">
          <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">
            Profile
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-gray-950 dark:text-white sm:text-4xl">
            About
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300 sm:text-lg">
            Java와 Spring 기반 서비스를 만들고 운영해온 5년차 {siteMetadata.occupation}{" "}
            {siteMetadata.author}입니다.
          </p>
          <div className="mt-6">
            <Link
              href={siteMetadata.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-mono text-xs text-gray-500 transition-colors hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400"
            >
              <FaGithub className="h-4 w-4" aria-hidden />
              github.com/kianpas
            </Link>
          </div>
        </header>

        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* 소개 */}
          <section
            aria-labelledby="about-intro"
            className="grid gap-6 py-10 md:grid-cols-[11rem_1fr] md:gap-12 sm:py-14"
          >
            <h2
              id="about-intro"
              className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400"
            >
              Intro
            </h2>
            <div className="max-w-2xl space-y-5 text-base leading-7 text-gray-700 dark:text-gray-300">
              <p>
                서비스의 바탕을 다지는 일을 주로 해왔습니다. 데이터 모델 설계,
                배치 처리, 레거시 개선처럼 겉으로 드러나지 않지만 안정적인
                운영을 좌우하는 작업에 관심이 많습니다.
              </p>
              <p>
                필요하면 화면까지 직접 만듭니다. 이 블로그도 Next.js와 React로
                직접 설계하고 운영하면서, 서버와 클라이언트의 경계에서 생기는
                문제들을 다루고 있습니다.
              </p>
              <p>
                이 블로그는 실무에서 만난 문제와 해결 과정을 기록하는
                공간입니다. 기록이 다른 개발자에게도 참고가 되기를 바랍니다.
              </p>
            </div>
          </section>

          {/* 경력 */}
          <section
            aria-labelledby="about-experience"
            className="grid gap-6 py-10 md:grid-cols-[11rem_1fr] md:gap-12 sm:py-14"
          >
            <h2
              id="about-experience"
              className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400"
            >
              Experience
            </h2>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {experienceData.map((exp) => (
                <article key={`${exp.company}-${exp.period}`} className="py-6 first:pt-0 last:pb-0">
                  <p className="font-mono text-xs text-gray-500 dark:text-gray-400">
                    {exp.period}
                  </p>
                  <h3 className="mt-2 text-lg font-bold leading-snug text-gray-900 dark:text-white">
                    {exp.position}
                    <span className="font-medium text-gray-500 dark:text-gray-400">
                      {" "}
                      · {exp.company}
                    </span>
                  </h3>
                  <p className="mt-3 max-w-2xl leading-7 text-gray-600 dark:text-gray-300">
                    {exp.description}
                  </p>
                  <ul className="mt-4 max-w-2xl space-y-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    {exp.achievements.map((achievement) => (
                      <li key={achievement} className="flex gap-3">
                        <span aria-hidden className="text-gray-300 dark:text-gray-600">
                          —
                        </span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs text-gray-500 dark:text-gray-400">
                    {exp.technologies.map((tech) => (
                      <span key={tech}>#{tech}</span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* 기술 스택 */}
          <section
            aria-labelledby="about-stack"
            className="grid gap-6 py-10 md:grid-cols-[11rem_1fr] md:gap-12 sm:py-14"
          >
            <h2
              id="about-stack"
              className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400"
            >
              Stack
            </h2>
            <dl className="max-w-2xl space-y-4">
              {skillGroups.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6"
                >
                  <dt className="font-mono text-xs font-semibold uppercase tracking-widest leading-6 text-gray-500 dark:text-gray-400">
                    {group.label}
                  </dt>
                  <dd className="leading-6 text-gray-700 dark:text-gray-300">
                    {group.items.join(", ")}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
