import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { keychains } from '../data/keychains'; // <-- Static data removed
import { useCart } from '../context/CartContext';
import { Heart, Truck, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const KeychainDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState("");

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProductDetails = async () => {
      try {
        setLoading(true);
        // Backend se single product fetch kar rahe hain uski manual ID se
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, API_BASE_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#2F4F4F] mb-4" size={40} />
        <p className="font-serif italic text-gray-500">Unveiling the masterpiece...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-32 bg-white">
        <h2 className="text-2xl font-serif text-[#2F4F4F] mb-4">Masterpiece Not Found</h2>
        <button onClick={() => navigate(-1)} className="text-[#DAA520] underline uppercase tracking-widest text-xs">
          Go Back to Collection
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ 
      ...product, 
      image: product.images[0] 
    });
    toast.success(`${product.name} added to bag!`, {
      style: { borderRadius: '0px', background: '#2F4F4F', color: '#fff', fontSize: '12px', letterSpacing: '0.1em' }
    });
  };

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-20 font-sans">
      
      {/* Container */}
      <div className="max-w-6xl mx-auto px-4 md:px-12 py-6 md:py-16">
        
        {/* Back Button for Desktop */}
        <button 
          onClick={() => navigate(-1)} 
          className="hidden md:flex items-center gap-2 text-gray-400 hover:text-black mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Back to Gallery</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-start">
          
          {/* LEFT: IMAGES */}
          <div className="flex flex-col gap-4 relative lg:sticky lg:top-24">
            
            {/* Main Image */}
            <div className="relative w-full">
              <div className="bg-[#F5F5F5] rounded-sm overflow-hidden w-full aspect-square md:aspect-[3/4] relative group shadow-sm">
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-all duration-700 md:group-hover:scale-105" 
                />
                
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full text-gray-400 hover:text-red-500 shadow-sm transition z-10">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, index) => (
                <button 
                  key={index}
                  onClick={() => setMainImage(img)}
                  className={`flex-shrink-0 w-16 h-16 border rounded-sm overflow-hidden transition-all duration-200 ${
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
            
            <p className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-3">
              Home / {product.category} / {product.name}
            </p>

            <h1 className="text-2xl md:text-5xl font-serif text-[#2F4F4F] mb-2 md:mb-4 leading-tight uppercase tracking-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-6 border-b border-gray-100 pb-6">
              <p className="text-2xl md:text-3xl font-serif text-[#DAA520]">
                ₹ {product.price}
              </p>
              <span className="text-sm md:text-lg text-gray-400 line-through font-light">
                ₹ {product.price + 149}
              </span>
              <span className="text-[10px] bg-green-50 text-green-700 px-2 py-1 rounded-full font-bold uppercase tracking-widest">In Stock</span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8 bg-gray-50 p-6 rounded-sm">
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Material</span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-base font-medium">
                  {product.material || "Handcrafted Metal/Resin"}
                </span>
              </div>
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Size</span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-base font-medium">{product.size}</span>
              </div>
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Authenticity</span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-base font-medium">100% Original</span>
              </div>
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">S.No.</span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-base font-medium font-mono">{product.id}</span>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-serif text-lg md:text-xl text-[#2F4F4F] mb-3 italic">Curator's Note</h3>
              <p className="text-gray-600 leading-7 font-light text-sm md:text-[15px] text-justify">
                {product.description}
              </p>
            </div>

            {/* Tagline */}
            {product.tagline && (
              <div className="bg-[#FFFAF0] p-4 border-l-4 border-[#DAA520] italic text-[#2F4F4F] font-serif text-sm mb-8 shadow-sm">
                "{product.tagline}"
              </div>
            )}

            {/* Desktop Add to Cart */}
            <div className="hidden md:block mb-8">
              <button 
                onClick={handleAddToCart}
                disabled={product.countInStock <= 0}
                className="w-full bg-[#2F4F4F] text-white py-4 px-8 uppercase tracking-[0.25em] font-bold text-xs hover:bg-black transition-all duration-300 shadow-xl disabled:bg-gray-300"
              >
                {product.countInStock > 0 ? 'Add to Bag' : 'Sold Out'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-[10px] text-gray-500 pt-6 border-t border-gray-100 uppercase tracking-widest font-bold">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-[#DAA520]" />
                <span>Express Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#DAA520]" />
                <span>Quality Assured</span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 md:hidden shadow-[0_-5px_15px_rgba(0,0,0,0.05)] flex gap-4 items-center">
        <div className="flex flex-col min-w-[80px]">
           <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Price</span>
           <span className="text-lg font-serif text-[#2F4F4F]">₹ {product.price}</span>
        </div>
        <button 
          onClick={handleAddToCart}
          disabled={product.countInStock <= 0}
          className="flex-grow bg-[#2F4F4F] text-white py-4 px-6 uppercase tracking-[0.2em] font-bold text-[10px] rounded-sm active:scale-95 transition-all shadow-lg disabled:bg-gray-300"
        >
          {product.countInStock > 0 ? 'Add to Bag' : 'Sold Out'}
        </button>
      </div>

    </div>
  );
};

export default KeychainDetails;