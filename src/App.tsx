import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ArticleCard from "./components/ArticleCard";
import { sourcesData } from "./data";

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

interface NewsSource {
  id: string;
  name: string;
  enabled: boolean;
}

type ViewMode = "grid" | "list";
type SortOption = "latest" | "popular" | "relevance";

const App: React.FC = () => {
  //State variables
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [selectedTopic] = useState("Technology");
  const [showSourcesDropdown, setShowSourcesDropdown] = useState(false);
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sources, setSources] = useState<NewsSource[]>(sourcesData);
  
  // Dynamic API state
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const queryUrl = searchQuery 
          ? `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(searchQuery)}`
          : `https://hn.algolia.com/api/v1/search?tags=front_page`;
          
        const response = await fetch(queryUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        
        const data = await response.json();

        interface HackerNewsHit {
          objectID: string;
          author: string;
          title: string;
          story_text: string | null;
          points: number;
          num_comments: number;
          created_at: string;
          url: string;
        }
        
        const fetchedArticles: NewsArticle[] = data.hits
          .filter((hit: HackerNewsHit) => hit.title && hit.url) // Only show hits with title and URL
          .map((hit: HackerNewsHit) => ({
            id: hit.objectID,
            source: hit.author || "Global News Feed",
            sourceIcon: "Globe", // Default icon
            title: hit.title,
            description: (hit.story_text ? hit.story_text.substring(0, 100) + '...' : `Points: ${hit.points} | Comments: ${hit.num_comments}`),
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1170",
            category: "TECH",
            timestamp: new Date(hit.created_at).toLocaleDateString(),
            url: hit.url
          }));
          
        setArticles(fetchedArticles);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred fetching the news.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [searchQuery]); // Re-fetch when searchQuery changes

  const toggleSource = (sourceId: string) => {
    setSources(
      sources.map((source: NewsSource) =>
        source.id === sourceId
          ? { ...source, enabled: !source.enabled }
          : source
      )
    );
  };

  const filteredArticles = articles.filter(
    (article: NewsArticle) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex flex-1 overflow-hidden w-full max-w-full mx-auto">
        <Sidebar
          sources={sources}
          toggleSource={toggleSource}
          showSourcesDropdown={showSourcesDropdown}
          setShowSourcesDropdown={setShowSourcesDropdown}
          selectedTopic={selectedTopic}
          showTopicDropdown={showTopicDropdown}
          setShowTopicDropdown={setShowTopicDropdown}
          sortBy={sortBy}
          setSortBy={setSortBy}
          showSortDropdown={showSortDropdown}
          setShowSortDropdown={setShowSortDropdown}
        />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64 text-red-500">
              <p>{error}</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="flex justify-center items-center h-64 text-slate-400">
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
              {filteredArticles.map((article: NewsArticle) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
