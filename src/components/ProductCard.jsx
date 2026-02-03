import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const ProductCard = ({ product,basePath  }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white group flex flex-col h-full hover:shadow-2xl transition-all duration-300 ease-in-out border border-transparent hover:border-gray-100 relative">
      
      {/* 1. Image Link Wrapper - Click to go to details */}
      <Link to={`${basePath}/${product.id}`} className="w-full aspect-[4/5] overflow-hidden relative bg-gray-100 block">
        {/* Pehli image array se utha rahe hain */}
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
        />
        {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition duration-300"></div> */}
      </Link>

      {/* 2. Details */}
      <div className="p-5 text-center flex flex-col flex-grow">
        {/* Name Link */}
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-1 truncate hover:text-[#2F4F4F]">
            {product.name}
          </h3>
        </Link>
        
        {/* Page Quality (New Requirement) */}
        <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-2">
          {product.pageQuality}
        </p>
        
        <p className="text-[#DAA520] font-serif text-lg italic mb-4">₹ {product.price}</p>
        
        {/* Add to Cart Button */}
        <div className="mt-auto">
          <button 
            onClick={() => addToCart({ ...product, image: product.images[0] })} // Cart me sirf main image bhejen
            className="w-full border border-[#2F4F4F] text-[#2F4F4F] py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#2F4F4F] hover:text-white transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;