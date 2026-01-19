import React, { useState, useEffect } from 'react';
import { FaInstagram, FaChevronLeft, FaChevronRight, FaPalette, FaBrush } from 'react-icons/fa';

const Artworks = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

 const sliderImages = [
  "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&q=80&w=1200", // abstract art
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=1200", // modern painting
  "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200"  // artistic wall art
];


  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto Slide Logic
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(slideInterval);
  }, [sliderImages.length]);

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderImages.length - 1 : currentSlide - 1);
  };
  const nextSlide = () => {
    setCurrentSlide(currentSlide === sliderImages.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <div className="bg-[#FFFAF0] min-h-screen font-sans text-gray-700 pb-20">
      
      {/* --- HERO HEADER --- */}
      <div className="pt-16 pb-12 px-6 text-center max-w-4xl mx-auto">
        <p className="text-[#DAA520] font-serif italic text-lg mb-2">
          Indian Handmade Art & Creative Expressions
        </p>
        <h1 className="text-4xl md:text-6xl font-serif text-[#2F4F4F] mb-6 uppercase tracking-[0.2em]">
          Artworks
        </h1>
        <div className="w-20 h-1 bg-[#2F4F4F] mx-auto mb-8"></div>
        <p className="text-xl font-light text-gray-600 italic">
          "Art has the power to pause time."
        </p>
      </div>

      {/* --- SLIDING CAROUSEL SECTION --- */}
      <div className="max-w-5xl mx-auto px-4 mb-20 relative group">
        
        {/* Frame (Viewport) */}
        <div className="w-full h-[300px] md:h-[500px] rounded-sm overflow-hidden relative shadow-xl border-4 border-white">
          
          {/* THE TRACK (Ye slide karega) */}
          <div 
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {sliderImages.map((img, index) => (
              // Individual Slide
              <div key={index} className="min-w-full h-full relative">
                <img 
                  src={img} 
                  alt={`Artwork ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-black/10"></div>
              </div>
            ))}
          </div>

        </div>

        {/* Buttons (Hover par dikhenge) */}
        <button 
          onClick={prevSlide}
          className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/80 p-3 rounded-full text-[#2F4F4F] hover:bg-[#2F4F4F] hover:text-white transition shadow-lg opacity-0 group-hover:opacity-100 z-10"
        >
          <FaChevronLeft size={20} />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/80 p-3 rounded-full text-[#2F4F4F] hover:bg-[#2F4F4F] hover:text-white transition shadow-lg opacity-0 group-hover:opacity-100 z-10"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Dots Indicators */}
        <div className="flex justify-center gap-3 mt-6">
          {sliderImages.map((_, index) => (
            <div 
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all border border-[#2F4F4F] ${currentSlide === index ? 'bg-[#2F4F4F] scale-125' : 'bg-transparent'}`}
            ></div>
          ))}
        </div>
      </div>

      {/* --- PHILOSOPHY SECTION --- */}
      <div className="max-w-4xl mx-auto px-6 mb-20 space-y-8 text-center md:text-left">
        <p className="text-lg leading-8 font-light">
          At <span className="font-bold text-[#2F4F4F]">Damn Journals</span>, our Artworks collection is an extension of the same philosophy that shapes our journals: intention, depth, and handcrafted beauty.
        </p>
        <p className="text-lg leading-8 font-light">
          This space is created to celebrate original Indian artwork, soulful creations, and artists who believe art is not decoration, but expression. Every piece here is meant to carry emotion, story, and presence, just like our journals.
        </p>
      </div>

      {/* --- SPLIT SECTION --- */}
      <div className="bg-white py-20 mb-20 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaPalette className="text-[#DAA520] text-2xl" />
              <h2 className="text-2xl font-serif text-[#2F4F4F] uppercase tracking-widest">A Home for Meaningful Art</h2>
            </div>
            <p className="text-gray-600 leading-7 font-light mb-6">
              Our Artworks section is curated for those who value authenticity over mass-produced décor. The art you’ll find here is inspired by culture, emotion, inner worlds, and slow creation. Each piece is designed to live with you, not just fill a wall.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaBrush className="text-[#DAA520] text-2xl" />
              <h2 className="text-2xl font-serif text-[#2F4F4F] uppercase tracking-widest">Rooted in Indian Craft</h2>
            </div>
            <p className="text-gray-600 leading-7 font-light mb-6">
              Damn Journals proudly supports Indian artists and handmade art. We believe true art carries the fingerprints of the artist, the silence of the process, and the story behind its creation.
            </p>
          </div>
        </div>
      </div>

      {/* --- ARTIST NOTICE --- */}
      <div className="max-w-3xl mx-auto px-6 mb-20">
        <div className="bg-[#2F4F4F] text-white p-10 rounded-sm text-center shadow-2xl relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#DAA520] rounded-full opacity-20 blur-xl"></div>
          
          <h2 className="text-3xl font-serif mb-4 text-[#DAA520]">Calling Artists</h2>
          <p className="text-lg font-light mb-8 max-w-xl mx-auto leading-relaxed">
            We are opening our doors to artists, illustrators, painters, and creative souls who want their work to be seen, valued, and shared.
          </p>

          <div className="bg-white/10 p-6 border border-white/20 rounded-sm backdrop-blur-sm">
            <p className="font-bold uppercase tracking-widest mb-2 text-[#DAA520]">Current Status</p>
            <p className="text-sm font-light">
              Artist onboarding is currently <span className="font-bold underline">on hold</span>. <br/>
              We are carefully curating our first set of artworks.
            </p>
          </div>
        </div>
      </div>

      {/* --- STAY CONNECTED --- */}
      <div className="text-center px-6 max-w-2xl mx-auto mb-16">
        <h3 className="text-2xl font-serif text-[#2F4F4F] mb-6">Stay Connected</h3>
        <p className="text-gray-600 mb-8 font-light">
          Artist submissions will open soon. Follow our journey on Instagram to stay updated.
        </p>
        
        <a 
          href="https://www.instagram.com/damnjournals" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 border-2 border-[#2F4F4F] text-[#2F4F4F] px-8 py-3 rounded-full font-bold uppercase tracking-widest hover:bg-[#2F4F4F] hover:text-white transition-all duration-300"
        >
          <FaInstagram size={20} /> Follow on Instagram
        </a>
      </div>

      {/* --- LEGACY FOOTER --- */}
      <div className="text-center px-6">
        <p className="text-gray-500 italic mb-8 font-serif text-lg">
          "This is a beginning. This is an invitation."
        </p>
        <div className="inline-block border-y border-[#DAA520] py-4 px-8 bg-white">
           <span className="block text-[#2F4F4F] font-serif text-lg md:text-2xl font-bold uppercase tracking-[0.2em]">
             Not Just a Journal, It’s a Damn Legacy.
           </span>
        </div>
      </div>

    </div>
  );
};

export default Artworks;