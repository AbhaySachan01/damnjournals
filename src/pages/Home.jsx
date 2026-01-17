import React from 'react';
import { products } from '../data'; // डेटा यहाँ से आ रहा है
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const Home = () => {
  // सिर्फ वो products निकालो जो 'featured: true' हैं
  const featuredProducts = products.filter(product => product.featured);

  return (
    <div className="bg-[#FFFAF0]">
      {/* Hero Section */}
      <section className="relative w-full bg-[#FFFAF0] py-16 md:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-12">
          
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-serif text-[#2F4F4F] mb-6 leading-tight">
              Where Hands Craft, <br/> and Hearts Write
            </h2>
            <p className="text-gray-500 mb-8 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
              Meticulously handcrafted by skilled artisans, our journals embody the elegance of Indian heritage.
            </p>
            <Link to="/journals" className="inline-block bg-[#2F4F4F] text-white px-10 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-black transition duration-300">
              Explore Collection
            </Link>
          </div>

          <div className="md:w-1/2 w-full flex justify-center md:justify-end">
            <div className="w-full max-w-lg h-[400px] bg-[#2F4F4F] relative shadow-2xl overflow-hidden">
               {/* Hero Image */}
               <img 
                 src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=1000" 
                 alt="Journal Hero" 
                 className="w-full h-full object-cover opacity-90 hover:scale-105 transition duration-1000"
               />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section (Data Driven) */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center mb-16">
          <h3 className="text-3xl font-serif text-[#2F4F4F] mb-4">Featured Creations</h3>
          <div className="h-1 w-16 bg-[#DAA520]"></div>
        </div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;