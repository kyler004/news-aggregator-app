import React from "react";
import {
  Clock,
  Share2,
  Bookmark,
  Triangle,
  Globe,
  Smartphone,
  Newspaper,
  Terminal,
} from "lucide-react";

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

interface ArticleCardProps {
  article: NewsArticle;
  viewMode: ViewMode;
}

const IconMap: Record<string, React.ElementType> = {
  Triangle: Triangle,
  Globe: Globe,
  Smartphone: Smartphone,
  Newspaper: Newspaper,
};

const ArticleCard: React.FC<ArticleCardProps> = ({ article, viewMode }) => {
  const SourceIcon = IconMap[article.sourceIcon] || Terminal;

  return (
    <article
      className={`bg-white dark:bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 transition-all duration-200 ${
        viewMode === "list" ? "flex" : ""
      }`}
    >
      <img
        src={article.image}
        alt={article.title}
        className={`object-cover ${
          viewMode === "grid" ? "w-full h-48" : "w-48 h-full"
        }`}
      />
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-cyan-600 dark:text-cyan-500">
              <SourceIcon className="w-4 h-4" />
            </span>
            <span className="text-sm text-slate-600 dark:text-slate-400">{article.source}</span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span className="text-sm text-slate-500 dark:text-slate-400">{article.timestamp}</span>
          </div>
        </div>
        <h3 className="text-slate-900 dark:text-white font-semibold mb-2 line-clamp-2 transition-colors duration-200">
          {article.title}
        </h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2 transition-colors duration-200">
          {article.description}
        </p>
        <div className="flex items-center justify-between mt-4 border-t border-slate-100 dark:border-slate-700/50 pt-4">
          <div className="flex items-center space-x-3">
            <button className="text-slate-400 hover:text-cyan-500 transition-colors">
              <Clock className="w-4 h-4" />
            </button>
            <button className="text-slate-400 hover:text-cyan-500 transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="text-slate-400 hover:text-cyan-500 transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-cyan-500 hover:text-cyan-600 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors duration-200 flex items-center group gap-1"
          >
            Read Article
            <span className="transform transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </article>
  );
};

export default ArticleCard;
