const AboutPage = async () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          About
        </h1>
      </div>
      <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
        <div className="flex flex-col items-center space-x-2 pt-8">
          <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
            이운산
          </h3>
          <div className="text-gray-500 dark:text-gray-400">occupation</div>
          <div className="text-gray-500 dark:text-gray-400">company</div>
          <div className="flex space-x-3 pt-6"></div>
        </div>
        <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
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
