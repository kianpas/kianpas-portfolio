const Home = () => {
  return (
    <div className="container mx-auto -mt-16 flex h-screen flex-col content-center justify-center px-4 py-5 text-center">
      <article>
        <h1>
          <span className=" text-4xl font-extrabold tracking-tighter text-primary sm:text-6xl">
            Hello!
          </span>
        </h1>
        <h2>
          <span className=" text-4xl font-extrabold tracking-tighter text-primary sm:text-6xl">
            Im Lee Un San
          </span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-gray-500 dark:text-gray-400 md:text-xl lg:text-lg xl:text-xl">
          안녕하세요! 제 홈페이지에 오신걸 환영합니다!
        </p>
      </article>
    </div>
  );
};

export default Home;
