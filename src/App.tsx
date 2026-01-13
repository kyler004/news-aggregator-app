import React, {useState, useEffect} from 'react'
import {Search, Grid3X3, List, ChevronDown, Clock, Heart, TrendingUp, Share2, Bookmark} from 'lucide-react'

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

interface NewSource {
  id: string; 
  name: string; 
  enabled: boolean; 
}

type ViewMode = 'grid' | 'list'; 
type SortOption = 'latest' | 'popular' | 'relevance'; 



const App : React.FC = () => {
  return (
    <div>App</div>
  )
}

export default App; 