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
  );
};

export default Home;
