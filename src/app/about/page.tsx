import { Mail, GitGraph, Smile } from "lucide-react";

const AboutPage = () => {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
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
              name
            </h3>
            <div className="text-gray-500 dark:text-gray-400">occupation</div>
            <div className="text-gray-500 dark:text-gray-400">company</div>
            <div className="flex space-x-3 pt-6">
              <Mail />
              <GitGraph />
            </div>
          </div>
          {/* 본문 내용 */}
          <div className="prose dark:prose-invert max-w-none pt-8 pb-8 xl:col-span-2">
            <h2 className="text-3xl font-bold">Hi</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci
              esse odit suscipit consequatur iste amet voluptatum nostrum, alias
              officiis fugit illo eius eveniet. Quia repellat blanditiis commodi
              cupiditate ex reiciendis.
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
