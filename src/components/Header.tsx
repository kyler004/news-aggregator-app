import React from "react";
import { Search, List, Grid3X3, Sun, Moon } from "lucide-react";

type ViewMode = "grid" | "list";
type Theme = "light" | "dark";

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  theme,
  setTheme,
}) => (
  <header className="bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 shrink-0 z-50 transition-colors duration-200">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-200">
          NEXUS <span className="text-cyan-600 dark:text-cyan-500">NEWS</span>
        </h1>
      </div>
      <div className="flex items-center space-x-4 flex-1 max-w-2xl mx-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500 dark:text-slate-400 w-5 h-5 transition-colors duration-200" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-500 transition-colors duration-200 placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
        
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 rounded-lg p-1 transition-colors duration-200">
          <span className="text-slate-500 dark:text-slate-400 text-sm mr-2 ml-1">VIEW:</span>
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded transition-colors duration-200 ${
              viewMode === "grid"
                ? "bg-white dark:bg-cyan-500 text-cyan-600 dark:text-white shadow-xs"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded transition-colors duration-200 ${
              viewMode === "list"
                ? "bg-white dark:bg-cyan-500 text-cyan-600 dark:text-white shadow-xs"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white"
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
