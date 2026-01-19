import React, { useEffect } from 'react';
import { FaMapMarkerAlt, FaPenNib, FaFeatherAlt, FaHands, FaQuoteLeft } from 'react-icons/fa';

const OurStory = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FFFAF0] min-h-screen font-sans text-gray-700 pb-20">
      
      {/* --- HERO SECTION: THE ORIGIN --- */}
      <div className="relative pt-20 pb-16 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 text-[#DAA520] font-bold tracking-widest uppercase text-xs md:text-sm mb-4">
          <FaMapMarkerAlt /> Rajasthan, India
        </div>
        <h1 className="text-4xl md:text-6xl font-serif text-[#2F4F4F] mb-6 leading-tight">
          From a Small Room <br/> to a Timeless Legacy
        </h1>
        <div className="w-24 h-1.5 bg-[#DAA520] mx-auto mb-10"></div>
        
        <p className="text-xl md:text-2xl font-serif italic text-gray-600 leading-relaxed max-w-3xl mx-auto">
          "Damn Journals was born in a small room in Rajasthan, not in a factory, not in a boardroom, and not with funding or privilege."
        </p>
      </div>

      {/* --- CHAPTER 1: THE SPARK --- */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Image Side - Vintage Vibe */}
          <div className="relative">
            <div className="absolute top-4 -left-4 w-full h-full border-2 border-[#DAA520] z-0 hidden md:block"></div>
            <img 
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800" 
              alt="The Beginning" 
              className="relative z-10 w-full h-[500px] object-cover shadow-xl grayscale hover:grayscale-0 transition duration-1000"
            />
          </div>

          {/* Text Side */}
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-[#2F4F4F]">It began with one girl.</h2>
            <p className="leading-8 text-lg font-light">
              At just 19 years old, <span className="font-bold text-[#2F4F4F]">Saniya Khan</span>, the founder of Damn Journals, spent her days writing, thinking, and searching. She would write 20–25 journals, filling pages with thoughts, dreams, chaos, and clarity.
            </p>
            <p className="leading-8 text-lg font-light">
              Yet, something always felt missing. None of those journals felt alive. None felt timeless. None carried the weight, texture, or soul that writing truly deserved.
            </p>
            <div className="bg-white p-6 border-l-4 border-[#DAA520] shadow-sm my-6">
              <p className="font-serif italic text-xl text-[#2F4F4F]">
                "Why doesn’t a journal exist that makes my hand write automatically?"
              </p>
            </div>
            <p className="leading-8 text-lg font-bold text-[#2F4F4F]">
              So she decided to create one.
            </p>
          </div>
        </div>
      </div>

      {/* --- CHAPTER 2: THE PHILOSOPHY --- */}
      <div className="bg-[#2F4F4F] text-white py-24 mb-24 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/black-linen.png')]"></div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <FaPenNib className="text-[#DAA520] text-4xl mx-auto mb-6" />
          <h2 className="text-3xl md:text-5xl font-serif mb-8">Journals That Write Back to You</h2>
          <p className="text-lg md:text-xl font-light leading-relaxed text-gray-200 mb-10">
            Every Damn Journal is designed to feel like it invites your hand to move. The weight, the texture, the binding, the paper, the silence between pages. Everything is intentional.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-16">
            <div className="bg-white/5 p-8 border border-[#DAA520]/30 backdrop-blur-sm">
              <h3 className="text-[#DAA520] font-serif text-xl mb-3">Not Notebooks. Companions.</h3>
              <p className="text-gray-300 font-light leading-7">
                These are not just notebooks. They are timeless writing companions made for people who write deeply, feel intensely, and think beyond surface-level living.
              </p>
            </div>
            <div className="bg-white/5 p-8 border border-[#DAA520]/30 backdrop-blur-sm">
              <h3 className="text-[#DAA520] font-serif text-xl mb-3">For The Seekers.</h3>
              <p className="text-gray-300 font-light leading-7">
                Created for writers, artists, thinkers, seekers, and those who use journaling as therapy, clarity, and self-growth.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- CHAPTER 3: ROOTS & RESPONSIBILITY --- */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          
          {/* Card 1 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-6 shadow-md text-[#2F4F4F]">
              <FaHands size={32} />
            </div>
            <h3 className="text-xl font-serif text-[#2F4F4F] mb-4 uppercase tracking-widest">Indian Roots</h3>
            <p className="text-gray-600 leading-7 font-light">
              Damn Journals proudly represents Indian handcrafted excellence. Each journal is handmade by skilled artisans. No machines replace human hands here.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-6 shadow-md text-[#2F4F4F]">
              <FaFeatherAlt size={32} />
            </div>
            <h3 className="text-xl font-serif text-[#2F4F4F] mb-4 uppercase tracking-widest">Soul Over Perfection</h3>
            <p className="text-gray-600 leading-7 font-light">
              From binding to finishing, every piece carries subtle imperfections, because perfection belongs to machines. Soul belongs to humans.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-6 shadow-md text-[#2F4F4F]">
              <FaQuoteLeft size={32} />
            </div>
            <h3 className="text-xl font-serif text-[#2F4F4F] mb-4 uppercase tracking-widest">Conscious Luxury</h3>
            <p className="text-gray-600 leading-7 font-light">
              We use recycled and responsibly sourced paper. Sustainability is not a trend for us. It’s a responsibility we carry with pride.
            </p>
          </div>

        </div>
      </div>

      {/* --- CHAPTER 4: THE CLIMAX --- */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-20">
        <h2 className="text-3xl font-serif text-[#2F4F4F] mb-8">More Than a Brand</h2>
        <p className="text-lg text-gray-600 leading-9 font-light mb-12">
          Damn Journals is a reminder that writing still matters. That paper still remembers. That slowing down is powerful. What started in a small room in Rajasthan has now become a brand trusted by writers, creatives, and journal lovers across India and beyond.
        </p>

        <div className="flex flex-col items-center gap-4 mb-16">
          <p className="text-2xl font-serif text-[#2F4F4F] font-bold">And yet, the heart remains the same.</p>
          <div className="flex flex-col gap-2 text-xl font-serif text-[#DAA520] italic">
            <span>One girl.</span>
            <span>One pen.</span>
            <span>One belief.</span>
          </div>
          <p className="text-xl font-serif text-[#2F4F4F] font-bold mt-4">That writing deserves a legacy.</p>
        </div>

        {/* --- TAGLINE FOOTER --- */}
        <div className="inline-block border-y-2 border-[#DAA520] py-6 px-12 bg-white shadow-lg transform hover:scale-105 transition duration-500">
          <span className="block text-[#2F4F4F] font-serif text-xl md:text-3xl font-bold uppercase tracking-[0.2em]">
            Not Just a Journal, <br className="md:hidden"/> It’s a Damn Legacy.
          </span>
        </div>
      </div>

    </div>
  );
};

export default OurStory;