import Link from "next/link";
import { getSortedPostsData } from "@/services/posts";

const CassetteFuturismPage = async () => {
  const recentPosts = getSortedPostsData().slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 text-white overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 animate-pulse"></div>
        <div className="grid grid-cols-12 gap-1 h-full">
          {Array.from({ length: 144 }).map((_, i) => (
            <div
              key={i}
              className="border border-cyan-400/30 animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <header className="text-center mb-16">
          <div className="inline-block p-8 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-lg border border-cyan-400/50 backdrop-blur-sm">
            <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              RETRO.BLOG
            </h1>
            <div className="flex items-center justify-center gap-4 text-cyan-400">
              <div className="w-8 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 animate-pulse"></div>
              <span className="font-mono text-sm tracking-widest">CASSETTE FUTURISM</span>
              <div className="w-8 h-1 bg-gradient-to-r from-cyan-500 to-pink-500 animate-pulse"></div>
            </div>
          </div>
        </header>

        {/* Cassette Player UI */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-8 rounded-2xl border border-cyan-400/50 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-black rounded-full"></div>
                </div>
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 bg-black rounded-full"></div>
                </div>
              </div>
              <div className="text-cyan-400 font-mono text-sm">
                NOW PLAYING: LATEST POSTS
              </div>
            </div>
            
            {/* Control Buttons */}
            <div className="flex justify-center gap-4 mb-8">
              {['⏮', '⏸', '⏯', '⏭'].map((icon, i) => (
                <button
                  key={i}
                  className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg border border-cyan-400/30 
                           flex items-center justify-center text-cyan-400 hover:bg-gradient-to-br hover:from-cyan-500/20 hover:to-pink-500/20 
                           transition-all duration-300 hover:scale-110"
                >
                  {icon}
                </button>
              ))}
            </div>

            {/* Equalizer */}
            <div className="flex justify-center gap-1 mb-8">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="w-2 bg-gradient-to-t from-pink-500 to-cyan-400 rounded-full animate-pulse"
                  style={{
                    height: `${Math.random() * 40 + 10}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {recentPosts.map((post, i) => (
            <Link key={post.id} href={`/blog/post/${post.id}`}>
              <div className="group relative p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl 
                            border border-cyan-400/30 backdrop-blur-sm hover:border-pink-400/50 
                            transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-cyan-500/10 rounded-xl opacity-0 
                              group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono text-cyan-400 tracking-widest">
                      TRACK {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
                    {post.title}
                  </h3>
                  
                  {post.summary && (
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {post.summary}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-pink-400">
                      {post.category}
                    </span>
                    <span className="text-xs font-mono text-cyan-400">
                      {post.date}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <footer className="text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 
                        rounded-full border border-cyan-400/50 backdrop-blur-sm">
            <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
            <span className="font-mono text-sm text-cyan-400">SYSTEM ONLINE</span>
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse"></div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default CassetteFuturismPage;