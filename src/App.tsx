import React, {useState, useEffect} from 'react'
import {Search, Grid3X3, List, ChevronDown, Clock, Heart, TrendingUp, Share2, Bookmark} from 'lucide-react'
import { sources, articles} from './data';

interface NewsArticle {
  id: string; 
  source : string; 
  sourceIcon: string; 
  description : string; 
  image: string; 
  category: string; 
  timestamp : string; 
  url: string; 
}

interface NewsSource {
  id: string; 
  name: string; 
  enabled: boolean; 
}

type ViewMode = 'grid' | 'list'; 
type SortOption = 'latest' | 'popular' | 'relevance'; 



const App : React.FC = () => {

  //State variables 
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');
  const [selectedTopic, setSelectedTopic] = useState('Technology, Politics, Finance');
  const [showSourcesDropdown, setShowSourcesDropdown] = useState(false);
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);  
  const [sources, setSources] = useState<NewsSource>(sources); 
  const [articles, setArticles] = useState<NewsArticle>(articles)
  
  
   const toggleSource = (sourceId: string) => {
    setSources(sources.map(source => 
      source.id === sourceId ? { ...source, enabled: !source.enabled } : source
    ));
  };
  
  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.description.toLowerCase().includes(searchQuery.toLowerCase())
  ); 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white">NEXUS <span className="text-slate-400">NEWS</span></h1>
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
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-cyan-500 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500"></div>
          </div>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900/50 border-r border-slate-700 p-6 min-h-screen">
          <h2 className="text-white font-semibold mb-4">FILTERS & SOURCES</h2>
          
          {/* News APIs */}
          <div className="mb-6">
            <button 
              onClick={() => setShowSourcesDropdown(!showSourcesDropdown)}
              className="flex items-center justify-between w-full text-slate-300 mb-3"
            >
              <span className="font-medium">NEWS APIs</span>
              <ChevronDown className={`w-4 h-4 transition-transform ${showSourcesDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showSourcesDropdown && (
              <div className="space-y-2 ml-2">
                {sources.map(source => (
                  <label key={source.id} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={source.enabled}
                      onChange={() => toggleSource(source.id)}
                      className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-sm text-slate-300">{source.name}</span>
                    <span className={`ml-auto w-2 h-2 rounded-full ${source.enabled ? 'bg-green-500' : 'bg-slate-600'}`}></span>
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
                <label className="text-sm text-slate-400 mb-2 block">Date Range (Last 24h)</label>
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
              <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showSortDropdown && (
              <div className="space-y-2 ml-2">
                <button
                  onClick={() => setSortBy('latest')}
                  className={`flex items-center space-x-2 w-full px-3 py-2 rounded text-sm ${sortBy === 'latest' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <Clock className="w-4 h-4" />
                  <span>Latest</span>
                </button>
                <button
                  onClick={() => setSortBy('popular')}
                  className={`flex items-center space-x-2 w-full px-3 py-2 rounded text-sm ${sortBy === 'popular' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Most Popular</span>
                </button>
                <button
                  onClick={() => setSortBy('relevance')}
                  className={`flex items-center space-x-2 w-full px-3 py-2 rounded text-sm ${sortBy === 'relevance' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>Relevance</span>
                </button>
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredArticles.map(article => (
              <article
                key={article.id}
                className={`bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-500 transition-all ${viewMode === 'list' ? 'flex' : ''}`}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className={`object-cover ${viewMode === 'grid' ? 'w-full h-48' : 'w-48 h-full'}`}
                />
                <div className="p-4 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{article.sourceIcon}</span>
                      <span className="text-sm text-slate-400">{article.source}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-sm text-slate-400">{article.timestamp}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-semibold mb-2 line-clamp-2">{article.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{article.description}</p>
                  
                  <div className="flex items-center justify-between">
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
                    <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">
                      {article.category}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App; 