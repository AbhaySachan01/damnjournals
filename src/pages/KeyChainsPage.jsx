import React, { useState, useMemo, useEffect } from 'react';
import { keychains } from '../data/keychains';
import ProductCard from '../components/ProductCard';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';

const KeychainsPage = () => {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); 
  const [stickyTop, setStickyTop] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      const navbar = document.getElementById('main-navbar');
      if (navbar) {
        setStickyTop(navbar.offsetHeight);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, []);

  const filteredKeychains = useMemo(() => {
    let result = [...keychains];

    if (searchQuery) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (sortOrder === "lowToHigh") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [searchQuery, sortOrder]);

  return (
    <div className="bg-[#FFFAF0] min-h-screen font-sans pb-20">
      
      {/* HERO SECTION */}
      <div className="bg-[#2F4F4F] text-white py-12 md:py-16 text-center shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <h2 className="text-3xl md:text-5xl font-serif uppercase tracking-[0.2em] relative z-10">
          Keychains
        </h2>
        <div className="h-1 w-20 bg-[#DAA520] mx-auto mt-4 relative z-10"></div>
      </div>

      {/* FILTER BAR */}
      <div 
        className="sticky z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all"
        style={{ top: `${stickyTop}px` }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3">
          
          <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-between items-center">
            
            {/* SEARCH */}
            <div className="relative w-full md:max-w-xs group">
              <input 
                type="text" 
                placeholder="Search keychains..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-xs md:text-sm focus:outline-none focus:border-[#2F4F4F] focus:ring-1 focus:ring-[#2F4F4F] transition-all"
              />
              <Search className="absolute left-3.5 top-2.5 text-gray-400 group-focus-within:text-[#2F4F4F] transition-colors" size={16} />
            </div>

            {/* SORT */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-400 mr-2 shrink-0">
                <SlidersHorizontal size={14} /> Filters:
              </div>

              <div className="relative shrink-0">
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 text-gray-700 py-1.5 pl-3 pr-8 rounded-sm text-[10px] md:text-xs font-bold uppercase tracking-wide focus:outline-none focus:border-[#DAA520] cursor-pointer hover:border-gray-400 transition shadow-sm"
                >
                  <option value="default">Sort: Featured</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-2 top-2 text-gray-500 pointer-events-none" size={12} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="max-w-7xl mx-auto px-2 md:px-8 py-10">
        
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-2">
          Showing {filteredKeychains.length} Results
        </p>

        {filteredKeychains.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {filteredKeychains.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                basePath="/keychains"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 opacity-70">
            <Search size={48} className="text-gray-300 mb-4" />
            <p className="text-xl text-[#2F4F4F] font-serif mb-2">
              No keychains found
            </p>
            <button 
              onClick={() => setSearchQuery("")}
              className="mt-4 text-[#DAA520] underline"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default KeychainsPage;
