import React, { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ArticleCard from "./components/ArticleCard";
import { sourcesData, articlesData } from "./data";

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
  const [selectedTopic] = useState("Technology, Politics, Finance");
  const [showSourcesDropdown, setShowSourcesDropdown] = useState(false);
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sources, setSources] = useState<NewsSource[]>(sourcesData);
  const [articles] = useState<NewsArticle[]>(articlesData);

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
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <div className="flex max-w-full mx-auto">
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
        <main className="flex-1 p-6">
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
        </main>
      </div>
    </div>
  );
};

export default App;
