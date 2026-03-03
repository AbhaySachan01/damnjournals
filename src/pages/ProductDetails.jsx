import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart, Truck, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImage, setMainImage] = useState(null);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
        if (!response.ok) throw new Error('Product not found');
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, API_BASE_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="animate-spin text-[#2F4F4F]" size={40} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 text-xl font-serif">
        Product not found!
        <button onClick={() => navigate(-1)} className="block mx-auto mt-4 text-sm text-[#DAA520] underline uppercase">Go Back</button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, image: product.images[0] });
    toast.success(`${product.name} added to Bag`, {
      style: { borderRadius: '0px', background: '#2F4F4F', color: '#fff', fontSize: '12px' }
    });
  };

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-20 font-sans">
      
      <div className="max-w-6xl mx-auto px-4 md:px-12 py-6 md:py-16">
        
        {/* Back Button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-400 hover:text-black mb-6 transition-colors">
          <ArrowLeft size={16} />
          <span className="text-[10px] uppercase tracking-widest font-bold">Back</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-20 items-start">
          
          {/* LEFT: IMAGES */}
          <div className="flex flex-col gap-4 relative lg:sticky lg:top-24">
            <div className="relative w-full">
              <div className="bg-[#F5F5F5] rounded-lg overflow-hidden w-full aspect-square md:aspect-[3/4] relative group">
                <img 
                  src={mainImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover mix-blend-multiply md:transition-transform md:duration-700 md:group-hover:scale-110" 
                />
                <button className="absolute top-3 right-3 bg-white p-2 rounded-full text-gray-400 hover:text-red-500 shadow-sm transition z-10">
                  <Heart size={20} />
                </button>
              </div>
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, index) => (
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

          {/* RIGHT: INFO */}
          <div className="flex flex-col justify-center lg:pr-8">
            
            <p className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase mb-3">
              Home / {product.category} / {product.name}
            </p>

            <h1 className="text-2xl md:text-5xl font-serif text-[#2F4F4F] mb-2 md:mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-3 mb-6 border-b border-gray-100 pb-6">
              <p className="text-2xl md:text-3xl font-serif text-[#DAA520]">₹ {product.price}</p>
              <span className="text-sm md:text-lg text-gray-400 line-through font-light">₹ {product.price + 250}</span>
            </div>

            {/* Dynamic Details Grid */}
            <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8 bg-gray-50 p-4 rounded-lg md:bg-white md:p-0">
              {product.category === 'Keychains' ? (
                <>
                  <div>
                    <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Material</span>
                    <span className="font-serif text-[#2F4F4F] text-sm md:text-lg font-medium">{product.material || 'Premium Alloy'}</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Weight</span>
                    <span className="font-serif text-[#2F4F4F] text-sm md:text-lg font-medium">{product.weight || 'Lightweight'}</span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Paper</span>
                    <span className="font-serif text-[#2F4F4F] text-sm md:text-lg font-medium">{product.pageQuality || '100 GSM'}</span>
                  </div>
                  <div>
                    <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Pages</span>
                    <span className="font-serif text-[#2F4F4F] text-sm md:text-lg font-medium">{product.pages || '144'}</span>
                  </div>
                </>
              )}
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Size</span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-lg font-medium">{product.size}</span>
              </div>
              <div>
                <span className="block text-gray-400 text-[10px] uppercase tracking-[0.2em] mb-1">Art No.</span>
                <span className="font-serif text-[#2F4F4F] text-sm md:text-lg font-medium">{product.id.slice(-6).toUpperCase()}</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-serif text-lg md:text-xl text-[#2F4F4F] mb-3 italic">Description</h3>
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
                    className="w-full bg-[#2F4F4F] text-white py-4 px-8 uppercase tracking-[0.25em] font-bold text-sm hover:bg-black transition duration-300 shadow-lg"
                >
                    Add to Bag
                </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 text-xs text-gray-500 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full">
                <Truck size={14} className="text-[#DAA520]" />
                <span className="tracking-wide uppercase font-bold text-[9px]">Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-full">
                <ShieldCheck size={14} className="text-[#DAA520]" />
                <span className="tracking-wide uppercase font-bold text-[9px]">Quality Check</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE STICKY FOOTER */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 md:hidden shadow-[0_-5px_15px_rgba(0,0,0,0.1)] flex gap-3 items-center">
        <div className="flex flex-col min-w-[100px]">
           <span className="text-[10px] text-gray-500 uppercase tracking-widest">Total Price</span>
           <span className="text-xl font-serif text-[#2F4F4F]">₹ {product.price}</span>
        </div>
        <button 
          onClick={handleAddToCart}
          className="flex-grow bg-[#2F4F4F] text-white py-3 px-6 uppercase tracking-[0.2em] font-bold text-xs rounded-sm active:scale-95 transition"
        >
          Add to Bag
        </button>
      </div>

    </div>
  );
};

export default ProductDetails;