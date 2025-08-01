import { getPaginatedPosts, getSortedPostsData } from "@/services/posts";
import { notFound } from "next/navigation";
import Link from "next/link";

// 페이지당 보여줄 포스트 수
const POSTS_PER_PAGE = 10;

const NasaBlogMainPage = async () => {
  const pageNumber = 1; // 첫 페이지로 고정
  const { posts, totalPages, currentPage } = getPaginatedPosts(pageNumber, POSTS_PER_PAGE);
  const allPosts = getSortedPostsData();

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white font-mono">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-green-400">
            NO DATA FOUND IN DATABASE
          </div>
        </div>
      </div>
    );
  }

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
          <span className="text-green-400 text-sm">KIANPAS-BLOG-TERMINAL v3.0.1</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* ASCII Art Header */}
        <header className="mb-12">
          <pre className="text-green-400 text-xs leading-tight mb-6 overflow-x-auto">
{`
██████╗ ██╗      ██████╗  ██████╗     ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗     
██╔══██╗██║     ██╔═══██╗██╔════╝     ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║     
██████╔╝██║     ██║   ██║██║  ███╗       ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║     
██╔══██╗██║     ██║   ██║██║   ██║       ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║     
██████╔╝███████╗╚██████╔╝╚██████╔╝       ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗
╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝        ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
`}
          </pre>
          
          <div className="bg-gray-900 border border-green-500 p-4 rounded mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400">$</span>
              <span className="text-white">blog_system --initialize --page={currentPage}</span>
            </div>
            <div className="text-green-400 text-sm space-y-1">
              <div>BLOG TERMINAL: ONLINE</div>
              <div>POSTS DATABASE: CONNECTED</div>
              <div>CURRENT PAGE: {currentPage}/{totalPages}</div>
              <div>SHOWING: {posts.length} ENTRIES</div>
              <div>STATUS: READY FOR EXPLORATION</div>
            </div>
          </div>

          {/* Search Terminal */}
          <div className="bg-gray-900 border border-green-500 p-4 rounded">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-400">$</span>
              <span className="text-white">search_database --query=</span>
            </div>
            <div className="ml-6">
              <input
                type="text"
                placeholder="제목, 내용, 태그로 검색..."
                className="w-full bg-black border border-green-500 text-green-400 placeholder-green-600 
                         px-3 py-2 rounded focus:border-green-400 focus:outline-none"
              />
            </div>
          </div>
        </header>

        {/* System Statistics */}
        <section className="mb-12">
          <h2 className="text-green-400 text-lg mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            SYSTEM STATISTICS
          </h2>
          
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900 border border-green-500 p-4 rounded">
              <div className="text-green-400 text-sm mb-2">TOTAL POSTS</div>
              <div className="text-white text-xl font-bold">{allPosts.length}</div>
            </div>
            <div className="bg-gray-900 border border-green-500 p-4 rounded">
              <div className="text-green-400 text-sm mb-2">CURRENT PAGE</div>
              <div className="text-white text-xl font-bold">{currentPage}</div>
            </div>
            <div className="bg-gray-900 border border-green-500 p-4 rounded">
              <div className="text-green-400 text-sm mb-2">TOTAL PAGES</div>
              <div className="text-white text-xl font-bold">{totalPages}</div>
            </div>
            <div className="bg-gray-900 border border-green-500 p-4 rounded">
              <div className="text-green-400 text-sm mb-2">STATUS</div>
              <div className="text-white text-xl font-bold">ONLINE</div>
            </div>
          </div>
        </section>

        {/* Posts as Terminal Commands */}
        <section className="mb-12">
          <h2 className="text-green-400 text-lg mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            DATABASE ENTRIES - PAGE {currentPage}
          </h2>
          
          <div className="space-y-4">
            {posts.map((post, i) => (
              <Link key={post.id} href={`/blog/post/${post.id}`}>
                <div className="group bg-gray-900 border border-green-500 hover:border-green-400 p-4 rounded 
                              transition-all duration-300 hover:bg-gray-800">
                  <div className="flex items-start gap-4">
                    <div className="text-green-400 text-sm font-mono">
                      [{String((currentPage - 1) * POSTS_PER_PAGE + i + 1).padStart(3, '0')}]
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-green-400">$</span>
                        <span className="text-white group-hover:text-green-400 transition-colors">
                          read_post --id="{post.id}" --title="{post.title}"
                        </span>
                      </div>
                      
                      {post.summary && (
                        <div className="text-gray-400 text-sm mb-2 ml-6">
                          # {post.summary}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 ml-6 flex-wrap">
                        <span>--category={post.category}</span>
                        <span>--date={post.date}</span>
                        <span>--author={post.author}</span>
                        <span>--reading_time={post.readingTime}</span>
                        {post.tags && post.tags.length > 0 && (
                          <span>--tags=[{post.tags.join(', ')}]</span>
                        )}
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

        {/* Terminal Pagination */}
        {totalPages > 1 && (
          <section className="mb-12">
            <h2 className="text-green-400 text-lg mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              NAVIGATION COMMANDS
            </h2>
            
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {/* Previous Page */}
              {currentPage > 1 && (
                <Link href={`/blog/page/${currentPage - 1}`}>
                  <div className="group bg-gray-900 border border-green-500 hover:border-green-400 px-4 py-2 rounded 
                                transition-all duration-300 hover:bg-gray-800">
                    <span className="text-green-400">$</span>
                    <span className="text-white group-hover:text-green-400 transition-colors ml-2">
                      prev_page --target={currentPage - 1}
                    </span>
                  </div>
                </Link>
              )}

              {/* Page Numbers */}
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i;
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <Link key={pageNum} href={`/blog/page/${pageNum}`}>
                      <div className={`px-3 py-1 rounded text-sm border transition-all duration-300 ${
                        pageNum === currentPage
                          ? 'bg-green-500 border-green-500 text-black'
                          : 'bg-gray-900 border-green-500 text-green-400 hover:border-green-400 hover:bg-gray-800'
                      }`}>
                        {pageNum}
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Next Page */}
              {currentPage < totalPages && (
                <Link href={`/blog/page/${currentPage + 1}`}>
                  <div className="group bg-gray-900 border border-green-500 hover:border-green-400 px-4 py-2 rounded 
                                transition-all duration-300 hover:bg-gray-800">
                    <span className="text-green-400">$</span>
                    <span className="text-white group-hover:text-green-400 transition-colors ml-2">
                      next_page --target={currentPage + 1}
                    </span>
                  </div>
                </Link>
              )}
            </div>

            {/* Page Info */}
            <div className="text-center mt-4 text-gray-400 text-sm">
              PAGE {currentPage} OF {totalPages} | TOTAL ENTRIES: {allPosts.length}
            </div>
          </section>
        )}

        {/* Quick Navigation */}
        <section className="mb-12">
          <h2 className="text-green-400 text-lg mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            QUICK NAVIGATION
          </h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <Link href="/">
              <div className="group bg-gray-900 border border-green-500 hover:border-green-400 p-4 rounded 
                            transition-all duration-300 hover:bg-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400">$</span>
                  <span className="text-white group-hover:text-green-400 transition-colors">
                    return_to_home --safe
                  </span>
                </div>
                <div className="text-gray-400 text-sm ml-6">
                  # 메인 터미널로 복귀
                </div>
              </div>
            </Link>
            
            <Link href="/blog/page/1">
              <div className="group bg-gray-900 border border-green-500 hover:border-green-400 p-4 rounded 
                            transition-all duration-300 hover:bg-gray-800">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400">$</span>
                  <span className="text-white group-hover:text-green-400 transition-colors">
                    goto_first_page --reset
                  </span>
                </div>
                <div className="text-gray-400 text-sm ml-6">
                  # 첫 번째 페이지로 이동
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Terminal Footer */}
        <footer className="bg-gray-900 border border-green-500 p-4 rounded">
          <div className="flex items-center justify-between text-sm flex-wrap gap-4">
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

export default NasaBlogMainPage;