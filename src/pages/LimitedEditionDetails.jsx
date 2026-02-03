import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { limitedEditions } from '../data/limitedEditions';
import { useCart } from '../context/CartContext';
import { Heart, Truck, ShieldCheck } from 'lucide-react';

const LimitedEditionDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const limitedEdition = limitedEditions.find((p) => p.id === id);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (limitedEdition) {
      setMainImage(limitedEdition.images[0]);
    }
  }, [limitedEdition, id]);

  if (!limitedEdition) {
    return <div className="text-center py-20 text-xl font-serif">Limited edition not found!</div>;
  }

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-20 font-sans">
      
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-12 py-6 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-start">
          
          {/* --- LEFT: IMAGES --- */}
          <div className="flex flex-col gap-4 relative lg:sticky lg:top-24">
            
            {/* Main Image */}
            <div className="relative w-full">
              <div className="bg-[#F5F5F5] rounded-lg overflow-hidden w-full aspect-square md:aspect-[3/4] relative group">
                <img 
                  src={mainImage} 
                  alt={limitedEdition.name} 
                  className="w-full h-full object-cover mix-blend-multiply md:transition-transform md:duration-700 md:group-hover:scale-110" 
                />
                
                {/* Floating Icons */}
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full text-gray-400 hover:text-red-500 shadow-sm transition z-10">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {limitedEdition.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-24 border rounded-md overflow-hidden transition-all duration-200 ${
                    mainImage === img ? 'border-[#2F4F4F] ring-1 ring-[#2F4F4F] opacity-100' : 'border-gray-200 opacity-60'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* --- RIGHT: INFO --- */}
          <div className="flex flex-col justify-center lg:pr-8">
            
            {/* Breadcrumb */}
            <p className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-3">
              Home / {limitedEdition.category} / {limitedEdition.name}
            </p>

            {/* Title */}
            <h1 className="text-2xl md:text-5xl font-serif text-[#2F4F4F] mb-2 md:mb-4 leading-tight">
              {limitedEdition.name}
            </h1>

            {/* Price Area */}
            <div className="flex items-baseline gap-3 mb-6 border-b border-gray-100 pb-6">
              <p className="text-2xl md:text-3xl font-serif text-[#DAA520]">₹ {limitedEdition.price}</p>
              <span className="text-sm md:text-lg text-gray-400 line-through font-light">₹ {limitedEdition.price + 200}</span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8 bg-gray-50 p-4 rounded-lg md:bg-white md:p-0">
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Paper</span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-lg font-medium">{limitedEdition.pageQuality}</span>
              </div>
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Size</span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-lg font-medium">{limitedEdition.size}</span>
              </div>
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Pages</span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-lg font-medium">{limitedEdition.pages}</span>
              </div>
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">S.No.</span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-lg font-medium">{limitedEdition.id}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-serif text-lg md:text-xl text-[#2F4F4F] mb-3 italic">The Story</h3>
              <p className="text-gray-600 leading-7 font-light text-sm md:text-[15px] text-justify">
                {limitedEdition.description}
              </p>
            </div>

            {/* Tagline Box */}
            <div className="bg-[#FFFAF0] p-4 border-l-4 border-[#DAA520] italic text-[#2F4F4F] font-serif text-sm mb-8">
              "{limitedEdition.tagline}"
            </div>

            {/* --- DESKTOP ADD TO CART BUTTON (Fix: Added Here) --- */}
            <div className="hidden md:block mb-8">
                <button 
                    onClick={() => addToCart({ ...limitedEdition, image: limitedEdition.images[0] })}
                    className="w-full bg-[#2F4F4F] text-white py-4 px-8 uppercase tracking-[0.25em] font-bold text-sm hover:bg-black transition duration-300 shadow-lg"
                >
                    Add to Bag
                </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full">
                <Truck size={14} className="text-[#DAA520]" />
                <span className="tracking-wide">PAN INDIA SHIPPING</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full">
                <ShieldCheck size={14} className="text-[#DAA520]" />
                <span className="tracking-wide">SECURE CHECKOUT</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- MOBILE STICKY FOOTER (Visible only on Mobile) --- */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 md:hidden shadow-[0_-5px_15px_rgba(0,0,0,0.05)] flex gap-3 items-center">
        <div className="flex flex-col">
           <span className="text-[10px] text-gray-500 uppercase tracking-widest">Total</span>
           <span className="text-xl font-serif text-[#2F4F4F]">₹ {limitedEdition.price}</span>
        </div>
        <button 
          onClick={() => addToCart({ ...limitedEdition, image: limitedEdition.images[0] })}
          className="flex-grow bg-[#2F4F4F] text-white py-3 px-6 uppercase tracking-[0.2em] font-bold text-xs rounded-sm active:scale-95 transition"
        >
          Add to Bag
        </button>
      </div>

    </div>
  );
};

export default LimitedEditionDetails;