const Home = () => {
  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 text-center -mt-16">
      <article className="space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-neon-blue sm:text-7xl">
          Hello!
        </h1>
        <h2>
          <span className=" text-4xl font-extrabold tracking-tighter text-primary sm:text-6xl">
            Im Lee Un San
          </span>
        </h2>
        <p className="mx-auto max-w-lg text-lg text-gray-400 sm:text-xl">
          안녕하세요! 제 홈페이지에 오신 걸 환영합니다!
        </p>
      </article>
    </div>
    
    //컨셉1
    // 선택사항: 미묘한 배경 그라데이션 또는 패턴 추가
    // <div className="flex min-h-screen flex-col items-center justify-center px-6 text-center -mt-16 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    //   {/* 콘텐츠 영역 최대 너비 증가 */}
    //   <article className="max-w-2xl space-y-6">
    //     {/* 텍스트 크기를 약간 조절하여 균형감 개선 */}
    //     <h1 className="text-4xl font-bold tracking-tight text-gray-800 dark:text-gray-100 sm:text-6xl">
    //       안녕하세요! 저는
    //       {/* 이름을 강조하기 위해 별도 색상과 블록 요소 사용 */}
    //       <span className="block text-5xl font-extrabold text-blue-600 dark:text-blue-400 sm:text-7xl mt-1">
    //          이운산
    //       </span>
    //       입니다.
    //     </h1>

    //     <p className="mx-auto text-lg text-gray-600 dark:text-gray-400 sm:text-xl leading-relaxed">
    //       {/* 좀 더 매력적인 소개 문구 */}
    //       웹 기술의 세계를 탐험하는 열정적인 개발자입니다. 저의 디지털 공간에 오신 것을 환영합니다!
    //     </p>

    //     {/* 행동 유도 버튼 (CTA) */}
    //     <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
    //       {/* <Link href="/portfolio" legacyBehavior>
    //         <a className="inline-block rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-md transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
    //           포트폴리오 보기
    //         </a>
    //       </Link>
    //       <Link href="/blog" legacyBehavior>
    //         <a className="inline-block rounded-md border border-gray-300 dark:border-gray-600 px-6 py-3 text-base font-medium text-gray-700 dark:text-gray-300 shadow-sm transition hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
    //           블로그 읽기
    //         </a>
    //       </Link> */}
    //     </div>
    //   </article>
    // </div>


  //   //컨셉3
  //   <div className="flex min-h-screen items-center justify-center px-6 -mt-16 overflow-hidden">
  //   {/* 겹침 효과 등을 위해 relative 포지셔닝 사용 */}
  //   <div className="relative max-w-4xl mx-auto text-center">

  //     {/* 크고 굵은 텍스트 사용, 약간 겹치거나 자간을 좁힐 수 있음 */}
  //     {/* 주의: absolute 포지셔닝은 세심한 조정이 필요 */}
  //     <h1
  //       className="text-6xl sm:text-8xl lg:text-9xl font-extrabold tracking-tighter text-gray-200 dark:text-gray-700 leading-none -mb-4 sm:-mb-6 lg:-mb-8 z-0"
  //       aria-hidden="true" // 배경 장식용 텍스트
  //     >
  //       DEVELOPER
  //     </h1>

  //     <div className="relative z-10 space-y-4"> {/* 콘텐츠가 배경 텍스트 위에 위치 */}
  //         <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
  //             안녕하세요! 이운산입니다.
  //         </h2>

  //         <p className="text-lg text-gray-600 dark:text-gray-400 sm:text-xl max-w-xl mx-auto">
  //             사용자 경험과 깔끔한 코드를 중시하며 디지털 프로덕트를 만듭니다. 환영합니다!
  //         </p>

  //         {/* 간단한 CTA 링크 또는 버튼 */}
  //          <div className="pt-6">
  //             {/* <Link href="/portfolio" legacyBehavior>
  //                 <a className="text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline">
  //                     프로젝트 보러가기 →
  //                 </a>
  //             </Link> */}
  //          </div>
  //     </div>

  //   </div>
  // </div>
  );
};

export default Home;
