import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { keychains } from '../data/keychains';
import { useCart } from '../context/CartContext';
import { Heart, Truck, ShieldCheck } from 'lucide-react';

const KeychainDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const keychain = keychains.find((p) => p.id === id);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (keychain) {
      setMainImage(keychain.images[0]);
    }
  }, [keychain, id]);

  if (!keychain) {
    return <div className="text-center py-20 text-xl font-serif">Keychain not found!</div>;
  }

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-20 font-sans">
      
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-12 py-6 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-start">
          
          {/* LEFT: IMAGES */}
          <div className="flex flex-col gap-4 relative lg:sticky lg:top-24">
            
            {/* Main Image */}
            <div className="relative w-full">
              <div className="bg-[#F5F5F5] rounded-lg overflow-hidden w-full aspect-square relative group">
                <img 
                  src={mainImage} 
                  alt={keychain.name} 
                  className="w-full h-full object-cover mix-blend-multiply md:transition-transform md:duration-700 md:group-hover:scale-110" 
                />
                
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full text-gray-400 hover:text-red-500 shadow-sm transition z-10">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {keychain.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`flex-shrink-0 w-16 h-16 border rounded-md overflow-hidden transition-all duration-200 ${
                    mainImage === img
                      ? 'border-[#2F4F4F] ring-1 ring-[#2F4F4F] opacity-100'
                      : 'border-gray-200 opacity-60'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: INFO */}
          <div className="flex flex-col justify-center lg:pr-8">
            
            {/* Breadcrumb */}
            <p className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-3">
              Home / {keychain.category} / {keychain.name}
            </p>

            {/* Title */}
            <h1 className="text-2xl md:text-5xl font-serif text-[#2F4F4F] mb-2 md:mb-4 leading-tight">
              {keychain.name}
            </h1>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 border-b border-gray-100 pb-6">
              <p className="text-2xl md:text-3xl font-serif text-[#DAA520]">
                ₹ {keychain.price}
              </p>
              <span className="text-sm md:text-lg text-gray-400 line-through font-light">
                ₹ {keychain.price + 100}
              </span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8 bg-gray-50 p-4 rounded-lg md:bg-white md:p-0">
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">
                  Material
                </span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-lg font-medium">
                  {keychain.material}
                </span>
              </div>
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">
                  Size
                </span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-lg font-medium">
                  {keychain.size}
                </span>
              </div>
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">
                  Weight
                </span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-lg font-medium">
                  {keychain.weight}
                </span>
              </div>
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">
                  S.No.
                </span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-lg font-medium">
                  {keychain.id}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-serif text-lg md:text-xl text-[#2F4F4F] mb-3 italic">
                Product Details
              </h3>
              <p className="text-gray-600 leading-7 font-light text-sm md:text-[15px] text-justify">
                {keychain.description}
              </p>
            </div>

            {/* Tagline */}
            <div className="bg-[#FFFAF0] p-4 border-l-4 border-[#DAA520] italic text-[#2F4F4F] font-serif text-sm mb-8">
              "{keychain.tagline}"
            </div>

            {/* Desktop Add to Cart */}
            <div className="hidden md:block mb-8">
              <button 
                onClick={() => addToCart({ ...keychain, image: keychain.images[0] })}
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

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 md:hidden shadow-[0_-5px_15px_rgba(0,0,0,0.05)] flex gap-3 items-center">
        <div className="flex flex-col">
           <span className="text-[10px] text-gray-500 uppercase tracking-widest">
             Total
           </span>
           <span className="text-xl font-serif text-[#2F4F4F]">
             ₹ {keychain.price}
           </span>
        </div>
        <button 
          onClick={() => addToCart({ ...keychain, image: keychain.images[0] })}
          className="flex-grow bg-[#2F4F4F] text-white py-3 px-6 uppercase tracking-[0.2em] font-bold text-xs rounded-sm active:scale-95 transition"
        >
          Add to Bag
        </button>
      </div>

    </div>
  );
};

export default KeychainDetails;
