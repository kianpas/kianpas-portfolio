import { Mail, GitGraph, Smile } from "lucide-react";
import { siteMetadata } from "@/data/metadata"; // 데이터 가져오기

const AboutPage = () => {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {/* 헤더 */}
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8">
            <Smile size={128} />
            {/* {avatar && (
              <Image
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )} */}
            <h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">
              {siteMetadata.author}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">
              {siteMetadata.occupation}
            </div>
            <div className="text-gray-500 dark:text-gray-400">
              {siteMetadata.company}
            </div>
            <div className="flex space-x-3 pt-6">
              <Mail />
              <GitGraph />
            </div>
          </div>
          {/* 우측: 소개 본문 */}
          <div className="prose max-w-none pt-8 pb-8 dark:prose-invert xl:col-span-2">
            <h4>
              안녕하세요! 견고하고 확장성 있는 시스템을 만드는 것을 좋아하는
              백엔드 개발자 {siteMetadata.author}입니다.
            </h4>

            <p>
              저는 주로 Java와 Spring Framework를 사용하는 일에 집중해왔습니다.
              어떻게 하면 더 효율적인 데이터 모델을 설계하고, 비즈니스 로직을
              깔끔하게 구현할 수 있을지 항상 고민합니다.
            </p>

            <p>
              최근에는 사용자와 직접 상호작용하는 프론트엔드 세계에 큰 매력을
              느끼고 있습니다. 특히 React와 Next.js가 어떻게 서버와 유기적으로
              통신하며 사용자 경험을 극대화하는지 탐구하는 과정이 즐겁습니다. 이
              블로그는 저의 주력 분야인 백엔드 기술뿐만 아니라, 풀스택 개발자로
              성장하기 위한 프론트엔드 학습 여정을 담는 공간이 될 것입니다.
            </p>

            <p>
              이곳에 기록된 저의 경험과 삽질(?)이 누군가에게는 작은 도움이
              되기를 바랍니다. 기술에 대한 이야기, 커피 한 잔과 함께 나누는 것을
              좋아합니다. 편하게 연락 주세요!
            </p>
          </div>
        </div>
      </div>
    </>
    // <div className="mx-auto px-4 py-8">
    //   <div className="pb-8 md:pb-10">
    //     <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
    //       About
    //     </h1>
    //   </div>
    //   <div className="xl:grid xl:grid-cols-3 xl:gap-x-8">
    //     {/* 좌측 정보란 */}
    //     <div className="flex flex-col items-center space-y-1 pt-8">
    //       <div className="relative">
    //         <Smile size={128} />
    //       </div>
    //       <h3 className="pb-2 text-2xl font-bold tracking-tight">이운산</h3>
    //       <p className="text-gray-500 dark:text-gray-400 leading-tight">
    //         occupation
    //       </p>
    //       <p className="text-gray-500 dark:text-gray-400 leading-tight">
    //         company
    //       </p>
    //       <div className="flex space-x-3 pt-6">
    //         <Mail />
    //         <GitGraph />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default AboutPage;
