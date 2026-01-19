import React, { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, ChevronDown, SlidersHorizontal } from 'lucide-react';

const CategoryPage = ({ category, title }) => {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("default"); 
  const [selectedType, setSelectedType] = useState("All");

  // --- LOGIC SAME HAI ---
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => p.category === category);

    if (selectedType !== "All") {
      result = result.filter(p => p.journalType === selectedType);
    }

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
  }, [category, searchQuery, sortOrder, selectedType]);


  const journalTypes = ["All", ...new Set(products
    .filter(p => p.category === category && p.journalType)
    .map(p => p.journalType))
  ];

  return (
    <div className="bg-[#FFFAF0] min-h-screen font-sans pb-20">
      
      {/* --- HERO HEADER --- */}
      <div className="bg-[#2F4F4F] text-white py-12 md:py-16 text-center shadow-md relative overflow-hidden">
         {/* Background decoration (Optional) */}
         <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         
         <h2 className="text-3xl md:text-5xl font-serif uppercase tracking-[0.2em] relative z-10">
            {title}
         </h2>
         <div className="h-1 w-20 bg-[#DAA520] mx-auto mt-4 relative z-10"></div>
      </div>

      {/* --- STICKY FILTER BAR --- */}
      <div className="sticky top-[60px] md:top-[100px] z-30 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            
            {/* 1. SEARCH (Left) */}
            <div className="relative w-full md:max-w-xs group">
              <input 
                type="text" 
                placeholder={`Search ${title.toLowerCase()}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#2F4F4F] focus:ring-1 focus:ring-[#2F4F4F] transition-all"
              />
              <Search className="absolute left-3.5 top-3 text-gray-400 group-focus-within:text-[#2F4F4F] transition-colors" size={18} />
            </div>

            {/* 2. FILTERS (Right - Horizontal Scroll on Mobile) */}
            <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400 mr-2 shrink-0">
                <SlidersHorizontal size={14} /> Filters:
              </div>

              {/* Journal Type Dropdown */}
              {category === 'journals' && (
                <div className="relative shrink-0">
                  <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-sm text-xs font-bold uppercase tracking-wide focus:outline-none focus:border-[#DAA520] cursor-pointer hover:border-gray-400 transition shadow-sm"
                  >
                    {journalTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type === "All" ? "All Categories" : type}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-2.5 text-gray-500 pointer-events-none" size={14} />
                </div>
              )}

              {/* Sort Dropdown */}
              <div className="relative shrink-0">
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 pl-4 pr-10 rounded-sm text-xs font-bold uppercase tracking-wide focus:outline-none focus:border-[#DAA520] cursor-pointer hover:border-gray-400 transition shadow-sm"
                >
                  <option value="default">Sort: Featured</option>
                  <option value="lowToHigh">Price: Low to High</option>
                  <option value="highToLow">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-2.5 text-gray-500 pointer-events-none" size={14} />
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* --- PRODUCTS GRID --- */}
      <div className="max-w-7xl mx-auto px-2 md:px-8 py-10">
        
        {/* Results Count */}
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6 px-2">
          Showing {filteredProducts.length} Results
        </p>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          // Better Empty State
          <div className="flex flex-col items-center justify-center py-32 opacity-70">
            <Search size={48} className="text-gray-300 mb-4" />
            <p className="text-xl text-[#2F4F4F] font-serif mb-2">No items found</p>
            <p className="text-sm text-gray-500">We couldn't find what you're looking for.</p>
            <button 
              onClick={() => {setSearchQuery(""); setSelectedType("All");}}
              className="mt-6 border-b border-[#DAA520] text-[#DAA520] pb-1 hover:text-[#2F4F4F] hover:border-[#2F4F4F] transition"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryPage;