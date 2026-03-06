import React from "react";
import { ChevronDown, Clock, Heart, TrendingUp } from "lucide-react";

export interface NewsCategory {
  id: string;
  name: string;
}

type SortOption = "latest" | "popular" | "relevance";

interface SidebarProps {
  categories: NewsCategory[];
  selectedCategory: string;
  setSelectedCategory: (id: string) => void;
  showTopicDropdown: boolean;
  setShowTopicDropdown: (show: boolean) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  showSortDropdown: boolean;
  setShowSortDropdown: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  showTopicDropdown,
  setShowTopicDropdown,
  sortBy,
  setSortBy,
  showSortDropdown,
  setShowSortDropdown,
}) => {
  const selectedCategoryName = categories.find((c) => c.id === selectedCategory)?.name || "All";

  return (
    <aside className="w-64 bg-slate-50/50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-700 p-6 shrink-0 overflow-y-auto transition-colors duration-200">
      <h2 className="text-slate-800 dark:text-white font-semibold mb-4 transition-colors duration-200">FILTERS & TOPICS</h2>
      
      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => setShowTopicDropdown(!showTopicDropdown)}
          className="flex items-center justify-between w-full text-slate-700 dark:text-slate-300 mb-3 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <span className="font-medium">TOPICS</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showTopicDropdown ? "rotate-180" : ""
            }`}
          />
        </button>
        {showTopicDropdown && (
          <div className="space-y-1 ml-2 max-h-60 overflow-y-auto custom-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? "bg-cyan-50 dark:bg-slate-800 text-cyan-700 dark:text-white font-medium"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Advanced Filtering */}
      <div className="mb-6 opacity-50 cursor-not-allowed" title="Coming Soon">
        <button className="flex items-center justify-between w-full text-slate-700 dark:text-slate-300 mb-3 pointer-events-none">
          <span className="font-medium">ADVANCED</span>
          <ChevronDown className="w-4 h-4" />
        </button>
        <div className="space-y-4 ml-2">
          <div>
            <label className="text-sm text-slate-500 dark:text-slate-400 mb-2 block transition-colors duration-200">
              Date Range (Last 24h)
            </label>
            <input type="range" className="w-full accent-cyan-500 pointer-events-none" />
          </div>
        </div>
      </div>
      
      {/* Sort By */}
      <div>
        <button
          onClick={() => setShowSortDropdown(!showSortDropdown)}
          className="flex items-center justify-between w-full text-slate-700 dark:text-slate-300 mb-3 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
        >
          <span className="font-medium">SORT BY</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              showSortDropdown ? "rotate-180" : ""
            }`}
          />
        </button>
        {showSortDropdown && (
          <div className="space-y-2 ml-2">
            <button
              onClick={() => setSortBy("latest")}
              className={`flex items-center space-x-2 w-full px-3 py-2 rounded text-sm transition-colors duration-200 ${
                sortBy === "latest"
                  ? "bg-cyan-50 dark:bg-slate-800 text-cyan-700 dark:text-white font-medium"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/50"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>Latest</span>
            </button>
            <button
              onClick={() => setSortBy("popular")}
              className={`flex items-center space-x-2 w-full px-3 py-2 rounded text-sm transition-colors duration-200 ${
                sortBy === "popular"
                  ? "bg-cyan-50 dark:bg-slate-800 text-cyan-700 dark:text-white font-medium"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/50"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Most Popular</span>
            </button>
            <button
              onClick={() => setSortBy("relevance")}
              className={`flex items-center space-x-2 w-full px-3 py-2 rounded text-sm transition-colors duration-200 ${
                sortBy === "relevance"
                  ? "bg-cyan-50 dark:bg-slate-800 text-cyan-700 dark:text-white font-medium"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800/50"
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Relevance</span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
