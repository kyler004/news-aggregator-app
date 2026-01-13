import React from "react";
import { Search, List, Grid3X3 } from "lucide-react";

type ViewMode = "grid" | "list";

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
}) => (
  <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold text-white">
          NEXUS <span className="text-slate-400">NEWS</span>
        </h1>
      </div>
      <div className="flex items-center space-x-4 flex-1 max-w-2xl mx-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-800 text-white pl-10 pr-4 py-2 rounded-lg border border-slate-700 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2 bg-slate-800 rounded-lg p-1">
          <span className="text-slate-400 text-sm mr-2">VIEW:</span>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded ${
              viewMode === "grid"
                ? "bg-cyan-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded ${
              viewMode === "list"
                ? "bg-cyan-500 text-white"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-cyan-400 to-blue-500"></div>
      </div>
    </div>
  </header>
);

export default Header;
