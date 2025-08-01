import Link from "next/link";
import { getSortedPostsData } from "@/services/posts";

const NasaPunkPage = async () => {
  const recentPosts = getSortedPostsData().slice(0, 6);

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Terminal Header */}
      <div className="bg-gray-900 border-b border-green-500 p-4">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-green-400 text-sm">NASA-BLOG-TERMINAL v2.1.0</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* ASCII Art Header */}
        <header className="mb-12">
          <pre className="text-green-400 text-xs leading-tight mb-6 overflow-x-auto">
{`
███╗   ██╗ █████╗ ███████╗ █████╗     ██████╗ ██╗      ██████╗  ██████╗ 
████╗  ██║██╔══██╗██╔════╝██╔══██╗    ██╔══██╗██║     ██╔═══██╗██╔════╝ 
██╔██╗ ██║███████║███████╗███████║    ██████╔╝██║     ██║   ██║██║  ███╗
██║╚██╗██║██╔══██║╚════██║██╔══██║    ██╔══██╗██║     ██║   ██║██║   ██║
██║ ╚████║██║  ██║███████║██║  ██║    ██████╔╝███████╗╚██████╔╝╚██████╔╝
╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝ 
`}
          </pre>
          
          <div className="bg-gray-900 border border-green-500 p-4 rounded">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400">$</span>
              <span className="text-white">system_status --verbose</span>
            </div>
            <div className="text-green-400 text-sm space-y-1">
              <div>MISSION CONTROL: ONLINE</div>
              <div>BLOG SYSTEMS: OPERATIONAL</div>
              <div>POSTS LOADED: {recentPosts.length}</div>
              <div>STATUS: READY FOR EXPLORATION</div>
            </div>
          </div>
        </header>

        {/* Mission Control Panel */}
        <section className="mb-12">
          <h2 className="text-green-400 text-lg mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            MISSION CONTROL PANEL
          </h2>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900 border border-green-500 p-4 rounded">
              <div className="text-green-400 text-sm mb-2">SYSTEM UPTIME</div>
              <div className="text-white text-xl font-bold">99.9%</div>
            </div>
            <div className="bg-gray-900 border border-green-500 p-4 rounded">
              <div className="text-green-400 text-sm mb-2">ACTIVE READERS</div>
              <div className="text-white text-xl font-bold">1,337</div>
            </div>
            <div className="bg-gray-900 border border-green-500 p-4 rounded">
              <div className="text-green-400 text-sm mb-2">DATA PACKETS</div>
              <div className="text-white text-xl font-bold">∞</div>
            </div>
          </div>
        </section>

        {/* Posts as Terminal Commands */}
        <section className="mb-12">
          <h2 className="text-green-400 text-lg mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            AVAILABLE MISSIONS
          </h2>
          
          <div className="space-y-4">
            {recentPosts.map((post, i) => (
              <Link key={post.id} href={`/blog/post/${post.id}`}>
                <div className="group bg-gray-900 border border-green-500 hover:border-green-400 p-4 rounded 
                              transition-all duration-300 hover:bg-gray-800">
                  <div className="flex items-start gap-4">
                    <div className="text-green-400 text-sm font-mono">
                      [{String(i + 1).padStart(2, '0')}]
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400">$</span>
                        <span className="text-white group-hover:text-green-400 transition-colors">
                          execute_mission --title="{post.title}"
                        </span>
                      </div>
                      
                      {post.summary && (
                        <div className="text-gray-400 text-sm mb-2 ml-6">
                          # {post.summary}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 ml-6">
                        <span>--category={post.category}</span>
                        <span>--date={post.date}</span>
                        <span>--status=READY</span>
                      </div>
                    </div>
                    
                    <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Terminal Footer */}
        <footer className="bg-gray-900 border border-green-500 p-4 rounded">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <span className="text-green-400">HOUSTON, WE HAVE A BLOG</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-400">CONNECTED</span>
              </div>
            </div>
            <div className="text-gray-400">
              {new Date().toISOString().split('T')[0]} | MISSION: ONGOING
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default NasaPunkPage;