import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ArticleCard from "./components/ArticleCard";
import { categoriesData } from "./data";

interface NewsArticle {
  id: string;
  source: string;
  sourceIcon: string;
  title: string;
  description: string;
  image: string;
  category: string;
  timestamp: string;
  url: string;
}

type ViewMode = "grid" | "list";
type SortOption = "latest" | "popular" | "relevance";
type Theme = "light" | "dark";

const App: React.FC = () => {
  //State variables
  const [theme, setTheme] = useState<Theme>("dark");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [selectedCategory, setSelectedCategory] = useState("top");
  const [showTopicDropdown, setShowTopicDropdown] = useState(true);
  const [showSortDropdown, setShowSortDropdown] = useState(true);
  
  // Dynamic API state
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const fetchNews = async (pageToken?: string) => {
    if (pageToken) {
      setIsFetchingMore(true);
    } else {
      setIsLoading(true);
    }
    setError(null);
    
    try {
      const apiKey = import.meta.env.VITE_NEWSDATA_API_KEY;
      
      let queryUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&language=en`;
      
      if (searchQuery) {
        queryUrl += `&q=${encodeURIComponent(searchQuery)}`;
      } else {
        queryUrl += `&category=${selectedCategory}`;
      }

      if (pageToken) {
        queryUrl += `&page=${pageToken}`;
      }
        
      const response = await fetch(queryUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
      const data = await response.json();

      if (data.status === "error") {
          throw new Error(data.results?.message || 'Failed to fetch news');
      }

      // Track next page token
      setNextPage(data.nextPage || null);

        interface NewsDataArticle {
          article_id: string;
          creator: string[] | null;
          title: string;
          description: string | null;
          source_id: string;
          source_icon: string | null;
          image_url: string | null;
          category: string[] | null;
          pubDate: string;
          link: string;
        }
        
      const newArticles: NewsArticle[] = (data.results || [])
        .filter((hit: NewsDataArticle) => hit.title && hit.link) // Only show hits with title and URL
        .map((hit: NewsDataArticle) => ({
          id: hit.article_id,
          source: hit.creator?.[0] || hit.source_id || "Global News Feed",
          sourceIcon: hit.source_icon ? "Globe" : "Newspaper", // Generic mapping
          title: hit.title,
          description: hit.description ? hit.description.substring(0, 150) + '...' : 'No description available.',
          image: hit.image_url || "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1170",
          category: hit.category?.[0]?.toUpperCase() || selectedCategory.toUpperCase(),
          timestamp: new Date(hit.pubDate).toLocaleDateString(),
          url: hit.link
        }));
        
      if (pageToken) {
        setArticles(prev => [...prev, ...newArticles]);
      } else {
        setArticles(newArticles);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred fetching the news.');
      }
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    // Re-fetch from page 1 when searchQuery or category changes
    fetchNews();
  }, [searchQuery, selectedCategory]);

  const loadMore = () => {
    if (nextPage && !isFetchingMore) {
      fetchNews(nextPage);
    }
  };

  return (
    <div className={theme}>
      <div className="h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-200 dark:bg-slate-900 dark:text-slate-100 overflow-hidden">
        <Header
          viewMode={viewMode}
          setViewMode={setViewMode}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          theme={theme}
          setTheme={setTheme}
        />

        <div className="flex flex-1 overflow-hidden w-full max-w-full mx-auto">
          <Sidebar
            categories={categoriesData}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            showTopicDropdown={showTopicDropdown}
            setShowTopicDropdown={setShowTopicDropdown}
            sortBy={sortBy}
            setSortBy={setSortBy}
            showSortDropdown={showSortDropdown}
            setShowSortDropdown={setShowSortDropdown}
          />

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-y-auto custom-scrollbar">
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center h-64 text-red-500">
                <p>{error}</p>
              </div>
            ) : articles.length === 0 ? (
                          <div className="flex justify-center items-center h-64 text-slate-500 dark:text-slate-400">
                <p>No articles found.</p>
              </div>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }
              >
                {articles.map((article: NewsArticle) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            )}
            
            {/* Load More Button */}
            {!isLoading && !error && articles.length > 0 && nextPage && (
              <div className="mt-8 mb-4 flex justify-center">
                <button 
                  onClick={loadMore}
                  disabled={isFetchingMore}
                  className="bg-cyan-500 hover:bg-cyan-600 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white px-8 py-3 rounded-full font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg"
                >
                  {isFetchingMore ? (
                    <>
                       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                       Loading...
                    </>
                  ) : (
                    "Load More Articles"
                  )}
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
