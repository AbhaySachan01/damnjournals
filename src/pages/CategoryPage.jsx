import React from 'react';
import { products } from '../data'; // Import data
import ProductCard from '../components/ProductCard';

const CategoryPage = ({ category, title }) => {
  // Filter products based on the category prop passed from App.jsx
  const categoryProducts = products.filter(p => p.category === category);

  return (
    <div className="bg-[#FFFAF0] min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-4xl font-serif text-[#2F4F4F] mb-4 uppercase tracking-widest">{title}</h2>
          <div className="h-1 w-24 bg-[#DAA520]"></div>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {categoryProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 font-serif italic">No products found in this collection yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;