import React, { useState, useEffect } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const CLOUDINARY_BASE =
"https://res.cloudinary.com/dafcbp9mu/image/upload";

const cld = (publicId, w = 800) =>
`${CLOUDINARY_BASE}/f_auto,q_auto,w_${w}/${publicId}`;

const heroImages = [
  cld("journals/pic1.png"),
  cld("journals/pic2.png"),
  cld("journals/pic3.png"),
];

const Home = () => {
  const featuredProducts = products.filter(product => product.featured);


  const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide(prev => (prev + 1) % heroImages.length);
  }, 7000);

  return () => clearInterval(interval);
}, []);

  return (
    <div className="bg-[#FFFAF0]">
      
      {/* HERO SECTION */}
      <section className="relative w-full bg-[#FFFAF0] py-16 md:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-12">
          
          {/* LEFT TEXT */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl md:text-4xl font-serif text-[#2F4F4F] mb-6 leading-tight">
              Handcrafted Luxury Journals made in India for mindful Writing and Journaling
            </h2>

            <p className="text-gray-500 mb-8 text-base md:text-lg leading-relaxed max-w-md mx-auto md:mx-0">
              Meticulously handcrafted by skilled artisans, our journals embody the elegance of Indian heritage.
            </p>

            <Link 
              to="/journals" 
              className="inline-block bg-[#2F4F4F] text-white px-10 py-4 uppercase tracking-[0.2em] text-xs font-bold hover:bg-black transition duration-300"
            >
              Explore Collection
            </Link>
          </div>

         <div className="md:w-1/2 w-full flex justify-center md:justify-end">
  <div className="w-full max-w-120 h-[550px] bg-[#2F4F4F] relative shadow-2xl overflow-hidden">

    {/* Sliding Container */}
    <div 
       className="flex h-full transition-transform duration-[4500ms] ease-[cubic-bezier(0.65,0,0.35,1)]"
      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
    >
      {heroImages.map((img, index) => (
        <img
          key={index}
          src={img}
          alt="Hero Slide"
          className="w-full h-full object-cover flex-shrink-0"
        />
      ))}
    </div>

    {/* Dots */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
      {heroImages.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`w-2.5 h-2.5 rounded-full transition-all ${
            currentSlide === index
              ? "bg-[#DAA520] scale-110"
              : "bg-white/60"
          }`}
        />
      ))}
    </div>

  </div>
</div>

        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center mb-16">
          <h3 className="text-3xl font-serif text-[#2F4F4F] mb-4">Featured Creations</h3>
          <div className="h-1 w-16 bg-[#DAA520]"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} basePath="/product" />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
