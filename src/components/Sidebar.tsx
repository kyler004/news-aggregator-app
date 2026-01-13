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
  <aside className="w-64 bg-slate-900/50 border-r border-slate-700 p-6 min-h-screen">
    <h2 className="text-white font-semibold mb-4">FILTERS & SOURCES</h2>
    {/* News APIs */}
    <div className="mb-6">
      <button
        onClick={() => setShowSourcesDropdown(!showSourcesDropdown)}
        className="flex items-center justify-between w-full text-slate-300 mb-3"
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
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={source.enabled}
                onChange={() => toggleSource(source.id)}
                className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-cyan-500 focus:ring-cyan-500"
              />
              <span className="text-sm text-slate-300">{source.name}</span>
              <span
                className={`ml-auto w-2 h-2 rounded-full ${
                  source.enabled ? "bg-green-500" : "bg-slate-600"
                }`}
              ></span>
            </label>
          ))}
        </div>
      )}
    </div>
    {/* Advanced Filtering */}
    <div className="mb-6">
      <button className="flex items-center justify-between w-full text-slate-300 mb-3">
        <span className="font-medium">ADVANCED FILTERING</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      <div className="space-y-4 ml-2">
        <div>
          <label className="text-sm text-slate-400 mb-2 block">
            Date Range (Last 24h)
          </label>
          <input type="range" className="w-full" />
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-2 block">Topic</label>
          <button
            onClick={() => setShowTopicDropdown(!showTopicDropdown)}
            className="w-full bg-slate-800 text-slate-300 px-3 py-2 rounded text-sm flex items-center justify-between"
          >
            <span className="truncate">{selectedTopic}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <div>
          <label className="text-sm text-slate-400 mb-2 block">Sentiment</label>
          <button className="w-full bg-slate-800 text-slate-300 px-3 py-2 rounded text-sm flex items-center justify-between">
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
        className="flex items-center justify-between w-full text-slate-300 mb-3"
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
            className={`flex items-center space-x-2 w-full px-3 py-2 rounded text-sm ${
              sortBy === "latest"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Latest</span>
          </button>
          <button
            onClick={() => setSortBy("popular")}
            className={`flex items-center space-x-2 w-full px-3 py-2 rounded text-sm ${
              sortBy === "popular"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Most Popular</span>
          </button>
          <button
            onClick={() => setSortBy("relevance")}
            className={`flex items-center space-x-2 w-full px-3 py-2 rounded text-sm ${
              sortBy === "relevance"
                ? "bg-slate-800 text-white"
                : "text-slate-400 hover:text-white"
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
