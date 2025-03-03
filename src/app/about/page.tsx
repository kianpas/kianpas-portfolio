const AboutPage = async () => {
  return (
    <div className="mx-auto px-4 py-8">
      <div className="pb-8 md:pb-10">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-6xl">
          About
        </h1>
      </div>
      <div className="xl:grid xl:grid-cols-3 xl:gap-x-8">
        {/* 좌측 정보란 */}
        <div className="flex flex-col items-center space-y-1 pt-8">
          <h3 className="pb-2 text-2xl font-bold tracking-tight">이운산</h3>
          <p className="text-gray-500 dark:text-gray-400 leading-tight">occupation</p>
          <p className="text-gray-500 dark:text-gray-400 leading-tight">company</p>
        </div>
        {/* 본문 내용 */}
        <div className="prose max-w-none dark:prose-invert xl:col-span-2">
          <h2>Hi</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
            sequi ratione similique, corporis totam soluta. Autem at dicta omnis
            veniam, blanditiis, iure impedit, soluta dolorum cupiditate vero
            quas ut fugiat!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
