import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { limitedEditions } from '../data/limitedEditions'; // Removed Static Data
import { useCart } from '../context/CartContext';
import { Heart, Truck, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';

const LimitedEditionDetails = () => {
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
        // Backend se specific limited edition product fetch kar rahe hain
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images[0]);
        setLoading(false);
      } catch (error) {
        console.error("Fetch Error:", error);
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id, API_BASE_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFAF0]">
        <Loader2 className="animate-spin text-[#DAA520] mb-4" size={48} />
        <p className="font-serif italic text-[#2F4F4F] tracking-widest">Loading Exclusive Content...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl font-serif text-[#2F4F4F] mb-4">Edition Not Found</h2>
        <button onClick={() => navigate('/limited-editions')} className="text-[#DAA520] border-b border-[#DAA520] pb-1 uppercase tracking-widest text-xs font-bold">
          Back to Collection
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, image: product.images[0] });
    toast.success(`${product.name} added to your collection!`, {
      style: { borderRadius: '0px', background: '#2F4F4F', color: '#fff', fontSize: '12px', letterSpacing: '0.1em' }
    });
  };

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-20 font-sans">
      
      <div className="max-w-6xl mx-auto px-4 md:px-12 py-6 md:py-16">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="hidden md:flex items-center gap-2 text-gray-400 hover:text-[#DAA520] mb-8 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Return</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-start">
          
          {/* LEFT: IMAGES */}
          <div className="flex flex-col gap-4 relative lg:sticky lg:top-24">
            <div className="relative w-full">
              <div className="bg-[#F5F5F5] rounded-sm overflow-hidden w-full aspect-square md:aspect-[3/4] relative group shadow-sm">
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover md:transition-transform md:duration-1000 md:group-hover:scale-110" 
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
                  className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-24 border rounded-sm overflow-hidden transition-all duration-200 ${
                    mainImage === img ? 'border-[#DAA520] ring-1 ring-[#DAA520]' : 'border-gray-200 opacity-60'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: INFO */}
          <div className="flex flex-col justify-center lg:pr-8">
            
            <p className="text-[10px] font-bold text-[#DAA520] tracking-[0.2em] uppercase mb-3">
              Limited Edition / {product.category}
            </p>

            <h1 className="text-2xl md:text-5xl font-serif text-[#2F4F4F] mb-2 md:mb-4 leading-tight uppercase">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-6 border-b border-gray-100 pb-6">
              <p className="text-2xl md:text-3xl font-serif text-[#2F4F4F]">₹ {product.price}</p>
              <span className="text-sm md:text-lg text-gray-400 line-through font-light">₹ {product.price + 500}</span>
              <span className="ml-auto text-[9px] font-bold bg-[#2F4F4F] text-white px-3 py-1 tracking-widest uppercase">Rare Find</span>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8 bg-gray-50 p-6 rounded-sm">
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Paper Grade</span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-base font-medium">{product.pageQuality || "120 GSM Natural"}</span>
              </div>
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Dimensions</span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-base font-medium">{product.size}</span>
              </div>
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Volume</span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-base font-medium">{product.pages} Pages</span>
              </div>
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Edition No.</span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-base font-medium font-mono">#{product.id.slice(-4).toUpperCase()}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-serif text-lg md:text-xl text-[#2F4F4F] mb-3 italic underline decoration-[#DAA520] underline-offset-8">The Craftsmanship</h3>
              <p className="text-gray-600 leading-7 font-light text-sm md:text-[15px] text-justify">
                {product.description}
              </p>
            </div>

            {product.tagline && (
              <div className="bg-[#FFFAF0] p-4 border-l-4 border-[#DAA520] italic text-[#2F4F4F] font-serif text-sm mb-8">
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
                {product.countInStock > 0 ? 'Add to Bag' : 'Out of Stock'}
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-[10px] text-gray-500 pt-6 border-t border-gray-100 uppercase tracking-widest font-bold">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-[#DAA520]" />
                <span>Priority Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-[#DAA520]" />
                <span>Certificate of Authenticity</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 md:hidden shadow-[0_-5px_15px_rgba(0,0,0,0.05)] flex gap-4 items-center">
        <div className="flex flex-col">
           <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold">Investment</span>
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

export default LimitedEditionDetails;