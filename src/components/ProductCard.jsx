import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white group flex flex-col h-full hover:shadow-2xl transition-all duration-300 ease-in-out border border-transparent hover:border-gray-100">
      
      {/* Image Container - Aspect Ratio 4:5 (Standard E-commerce) */}
      <div className="w-full aspect-[4/5] overflow-hidden relative bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
        />
      </div>

      {/* Details */}
      <div className="p-5 text-center flex flex-col flex-grow">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-2 truncate">
          {product.name}
        </h3>
        
        <p className="text-[#DAA520] font-serif text-lg italic mb-4">₹ {product.price}</p>
        
        <div className="mt-auto">
          <button 
            onClick={() => addToCart(product)}
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