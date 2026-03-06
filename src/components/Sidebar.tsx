import React from "react";
import { ChevronDown, Clock, Heart, TrendingUp } from "lucide-react";

interface NewsSource {
  id: string;
  name: string;
  enabled: boolean;
}

type SortOption = "latest" | "popular" | "relevance";

interface SidebarProps {
  sources: NewsSource[];
  toggleSource: (id: string) => void;
  showSourcesDropdown: boolean;
  setShowSourcesDropdown: (show: boolean) => void;
  selectedTopic: string;
  showTopicDropdown: boolean;
  setShowTopicDropdown: (show: boolean) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  showSortDropdown: boolean;
  setShowSortDropdown: (show: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  sources,
  toggleSource,
  showSourcesDropdown,
  setShowSourcesDropdown,
  selectedTopic,
  showTopicDropdown,
  setShowTopicDropdown,
  sortBy,
  setSortBy,
  showSortDropdown,
  setShowSortDropdown,
}) => (
  <aside className="w-64 bg-slate-50/50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-700 p-6 shrink-0 overflow-y-auto transition-colors duration-200">
    <h2 className="text-slate-800 dark:text-white font-semibold mb-4 transition-colors duration-200">FILTERS & SOURCES</h2>
    {/* News APIs */}
    <div className="mb-6">
      <button
        onClick={() => setShowSourcesDropdown(!showSourcesDropdown)}
        className="flex items-center justify-between w-full text-slate-700 dark:text-slate-300 mb-3 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors"
      >
        <span className="font-medium">NEWS APIs</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            showSourcesDropdown ? "rotate-180" : ""
          }`}
        />
      </button>
      {showSourcesDropdown && (
        <div className="space-y-2 ml-2">
          {sources.map((source) => (
            <label
              key={source.id}
              className="flex items-center space-x-2 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={source.enabled}
                onChange={() => toggleSource(source.id)}
                className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-cyan-500 focus:ring-cyan-500 transition-colors duration-200"
              />
              <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-200">{source.name}</span>
              <span
                className={`ml-auto w-2 h-2 rounded-full transition-colors duration-200 ${
                  source.enabled ? "bg-green-500" : "bg-slate-300 dark:bg-slate-600"
                }`}
              ></span>
            </label>
          ))}
        </div>
      )}
    </div>
    {/* Advanced Filtering */}
    <div className="mb-6">
      <button className="flex items-center justify-between w-full text-slate-700 dark:text-slate-300 mb-3 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors">
        <span className="font-medium">ADVANCED FILTERING</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      <div className="space-y-4 ml-2">
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-400 mb-2 block transition-colors duration-200">
            Date Range (Last 24h)
          </label>
          <input type="range" className="w-full accent-cyan-500" />
        </div>
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-400 mb-2 block transition-colors duration-200">Topic</label>
          <button
            onClick={() => setShowTopicDropdown(!showTopicDropdown)}
            className="w-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 px-3 py-2 rounded text-sm flex items-center justify-between transition-colors duration-200"
          >
            <span className="truncate">{selectedTopic}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div>
          <label className="text-sm text-slate-500 dark:text-slate-400 mb-2 block transition-colors duration-200">Sentiment</label>
          <button className="w-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 px-3 py-2 rounded text-sm flex items-center justify-between transition-colors duration-200">
            <span>Neutral)</span>
            <ChevronDown className="w-4 h-4" />
          </button>
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

export default Sidebar;
