import React, { useEffect } from 'react';
import { FaWhatsapp, FaInstagram, FaLeaf, FaHands, FaPenNib } from 'react-icons/fa';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FFFAF0] min-h-screen text-gray-700 font-sans pb-20">
      
      {/* --- HERO SECTION --- */}
      <div className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-serif text-[#2F4F4F] mb-4 uppercase tracking-[0.15em]">
          About Us
        </h1>
        <p className="text-[#DAA520] font-serif italic text-xl md:text-2xl mb-8">
          "Luxury Handcrafted Journals Made in India"
        </p>

        

        <div className="w-24 h-1 bg-[#2F4F4F] mx-auto mb-12"></div>
        
        <p className="text-lg md:text-xl font-light leading-relaxed text-[#2F4F4F]">
          Damn Journals was born from a simple but powerful belief: <span className="font-serif italic">writing is not just an activity, it is a legacy.</span> In a fast-moving digital world, we exist to slow things down, to bring people back to paper, intention, and self-reflection.
        </p>
      </div>

      {/* --- IMAGE + STORY SECTION --- */}
      <div className="max-w-6xl mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <img 
              src="https://images.unsplash.com/photo-1515816995393-01825828a2a5?auto=format&fit=crop&q=80&w=800" 
              alt="Writing Journey" 
              className="w-full h-[400px] object-cover rounded-sm shadow-xl grayscale hover:grayscale-0 transition duration-700"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-serif text-[#2F4F4F] mb-6">Our Story</h2>
            <p className="text-gray-600 leading-8 mb-6 font-light">
              Damn Journals is not a factory-made brand. It is a deeply personal journey rooted in creativity, craftsmanship, and purpose. What began as a love for writing and old-world journals slowly evolved into a mission: to build a luxury Indian journal brand that respects tradition while speaking to modern minds.
            </p>
            <p className="text-gray-600 leading-8 font-light">
              Each journal is thoughtfully designed, carefully crafted, and emotionally driven. We don’t follow trends. We create pieces that feel eternal.
            </p>
          </div>
        </div>
      </div>

      {/* --- VALUES GRID --- */}
      <div className="bg-white py-20 mb-24 border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          
          {/* Card 1 */}
          <div className="p-6">
            <div className="w-16 h-16 bg-[#FFFAF0] rounded-full flex items-center justify-center mx-auto mb-6 text-[#DAA520]">
              <FaHands size={30} />
            </div>
            <h3 className="text-xl font-serif text-[#2F4F4F] mb-4">Handcrafted by Artisans</h3>
            <p className="text-sm text-gray-500 leading-7">
              Every Damn Journal is handmade in India by skilled artisans. From binding to finishing, each journal passes through human hands, preserving traditional techniques and supporting real livelihoods.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-6">
            <div className="w-16 h-16 bg-[#FFFAF0] rounded-full flex items-center justify-center mx-auto mb-6 text-[#DAA520]">
              <FaLeaf size={30} />
            </div>
            <h3 className="text-xl font-serif text-[#2F4F4F] mb-4">Sustainable & Recycled</h3>
            <p className="text-sm text-gray-500 leading-7">
              Sustainability is our responsibility. We use recycled and responsibly sourced paper to reduce impact without compromising quality. Smooth, durable, and conscious.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-6">
            <div className="w-16 h-16 bg-[#FFFAF0] rounded-full flex items-center justify-center mx-auto mb-6 text-[#DAA520]">
              <FaPenNib size={30} />
            </div>
            <h3 className="text-xl font-serif text-[#2F4F4F] mb-4">Timeless Purpose</h3>
            <p className="text-sm text-gray-500 leading-7">
              We don’t just sell journals. We offer writing companions meant to last for years. Designed for those who listen to their inner voice and write from the heart.
            </p>
          </div>

        </div>
      </div>

      {/* --- WHY CHOOSE & WHO FOR --- */}
      <div className="max-w-5xl mx-auto px-6 mb-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* Why Choose */}
        <div>
          <h2 className="text-3xl font-serif text-[#2F4F4F] mb-8 border-b border-[#DAA520] pb-2 inline-block">Why Choose Us</h2>
          <ul className="space-y-4">
            {[
              "Luxury aesthetics with emotional storytelling",
              "Handcrafted quality over mass production",
              "Recycled pages with premium feel",
              "Indian artisanship with global design",
              "Limited editions that feel personal and rare"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 font-light">
                <span className="text-[#DAA520] mt-1">✦</span> {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Who We Create For */}
        <div>
          <h2 className="text-3xl font-serif text-[#2F4F4F] mb-8 border-b border-[#DAA520] pb-2 inline-block">Who We Create For</h2>
          <ul className="space-y-4">
            {[
              "Believe writing is therapy, not a task",
              "Value premium stationery and handmade products",
              "Seek depth, intention, and emotional connection",
              "Love gifting meaningful, long-lasting objects",
              "Want journals that feel personal and powerful"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-700 font-light">
                <span className="text-[#DAA520] mt-1">✦</span> {item}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* --- SOCIAL BUTTONS (REQUESTED) --- */}
        <div className="flex justify-center gap-6 mb-12">
          <a 
            href="https://wa.me/919713631331" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#2F4F4F] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#25D366] transition-all duration-300 shadow-lg"
          >
            <FaWhatsapp size={20} /> WhatsApp
          </a>
          <a 
            href="https://www.instagram.com/damnjournals" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#2F4F4F] text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-[#E1306C] transition-all duration-300 shadow-lg"
          >
            <FaInstagram size={20} /> Instagram
          </a>
        </div>

      

      {/* --- LEGACY FOOTER --- */}
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-2xl font-serif text-[#2F4F4F] mb-6">More Than a Brand</h2>
        <p className="text-gray-600 leading-8 mb-10 font-light italic">
          "Damn Journals is a movement towards mindful writing, slow living, and conscious creativity. Every journal carries a piece of our philosophy: that words have power, paper has memory, and writing leaves a legacy."
        </p>
        
        <div className="inline-block border-y border-[#DAA520] py-4 px-10 bg-white shadow-sm">
          <span className="block text-[#2F4F4F] font-serif text-lg md:text-2xl font-bold uppercase tracking-[0.2em]">
            Not Just a Journal, It’s a Damn Legacy.
          </span>
        </div>
      </div>

      

    </div>
  );
};

export default About;