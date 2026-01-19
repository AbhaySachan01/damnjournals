import React, { useEffect } from 'react';
import { FaWhatsapp, FaEnvelope, FaInstagram, FaGift, FaBriefcase, FaPenFancy, FaLeaf, FaHandsHelping } from 'react-icons/fa';

const BulkOrder = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FFFAF0] min-h-screen text-gray-700 font-sans pb-20">
      
      {/* --- HERO SECTION --- */}
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-12 text-center">
        <p className="text-[#DAA520] font-serif italic text-lg md:text-xl mb-4 tracking-wider">
          Make a Lasting Impression
        </p>
        <h1 className="text-4xl md:text-6xl font-serif text-[#2F4F4F] mb-8 uppercase tracking-widest leading-tight">
          Bulk Orders & <br/> Corporate Gifting
        </h1>
        
        <div className="w-24 h-1 bg-[#2F4F4F] mx-auto mb-10"></div>

        <p className="text-lg md:text-xl font-light leading-relaxed text-gray-600 max-w-3xl mx-auto">
          At <span className="font-bold text-[#2F4F4F]">Damn Journals</span>, we believe meaningful gifts should leave a lasting impression. 
          Our handcrafted solutions are designed for brands, institutions, and individuals who want to gift something thoughtful, premium, and timeless.
        </p>
      </div>

      {/* --- PERFECT FOR GRID --- */}
      <div className="max-w-6xl mx-auto px-6 mb-20">
        <h2 className="text-2xl font-serif text-[#2F4F4F] text-center mb-10 uppercase tracking-widest">
          Perfect For
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <FaBriefcase />, title: "Corporate Gifting", text: "Employee appreciation & client gifts." },
            { icon: <FaGift />, title: "Weddings & Events", text: "Premium favors & hampers." },
            { icon: <FaPenFancy />, title: "Brand Collaborations", text: "Custom aesthetics for creators." }
          ].map((item, index) => (
            <div key={index} className="bg-white p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 group">
              <div className="text-[#DAA520] text-4xl mb-4 flex justify-center group-hover:scale-110 transition">{item.icon}</div>
              <h3 className="text-lg font-serif text-[#2F4F4F] mb-2 uppercase">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- DARK SECTION: CUSTOMIZATION & CRAFTSMANSHIP --- */}
      <div className="bg-[#2F4F4F] text-white py-20 mb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Left: Customization */}
            <div>
              <h2 className="text-3xl md:text-4xl font-serif mb-6 text-[#DAA520]">Customization Options</h2>
              <p className="text-gray-300 leading-7 mb-8 font-light">
                We offer customization for bulk orders to make your journals truly yours. Our team works closely with you to ensure every detail aligns with your vision.
              </p>
              <ul className="space-y-4">
                {[
                  "Custom covers or specific brand colors",
                  "Logo embossing or branding",
                  "Personalized title pages or messages",
                  "Curated journal themes",
                  "Packaging options for premium presentation"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-200">
                    <span className="text-[#DAA520]">✦</span> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Craftsmanship Info */}
            <div className="bg-[#FFFAF0]/5 p-8 border border-[#DAA520]/30 rounded-sm backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-6">
                <FaHandsHelping className="text-[#DAA520] text-3xl" />
                <h3 className="text-xl font-serif uppercase tracking-widest">Handcrafted & Ethical</h3>
              </div>
              <p className="text-gray-300 leading-7 mb-6 font-light">
                All bulk orders are handmade in India by skilled artisans. Even in bulk, our journals are never mass-produced by machines. By choosing us, you support real craftsmanship and sustainable livelihoods.
              </p>
              <div className="flex items-center gap-4">
                <FaLeaf className="text-[#DAA520] text-3xl" />
                <h3 className="text-xl font-serif uppercase tracking-widest">Sustainable</h3>
              </div>
              <p className="text-gray-300 leading-7 mt-4 font-light">
                We use recycled and responsibly sourced paper. Bulk gifting with Damn Journals reflects values, not just aesthetics.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* --- WHY CHOOSE US (Simple List) --- */}
      <div className="max-w-4xl mx-auto px-6 mb-20 text-center">
        <h2 className="text-3xl font-serif text-[#2F4F4F] mb-10 uppercase tracking-widest">Why Choose Damn Journals</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-left md:text-center">
          {[
            "Premium handcrafted quality",
            "Luxury aesthetics with storytelling",
            "Recycled pages with a rich writing feel",
            "Ethical artisan-led production",
            "Flexible customization options",
            "Reliable support & clear communication"
          ].map((item, i) => (
            <div key={i} className="bg-white px-6 py-4 border-l-4 border-[#DAA520] shadow-sm text-gray-700 font-medium">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* --- PRICING & CTA SECTION --- */}
      <div className="max-w-3xl mx-auto px-6 text-center mb-16">
        <div className="bg-white p-10 border border-gray-200 shadow-xl rounded-sm">
          <h2 className="text-2xl font-serif text-[#2F4F4F] mb-4 uppercase tracking-widest">Get Quote & Pricing</h2>
          <p className="text-gray-500 mb-8 font-light">
            Pricing depends on volume, customization, and materials. Connect with us directly for timelines and best rates.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a 
              href="https://wa.me/919713631331" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-[#20bd5a] transition-all shadow-lg"
            >
              <FaWhatsapp size={20} /> Chat on WhatsApp
            </a>
            <a 
              href="mailto:damnjournals777@gmail.com" 
              className="flex items-center justify-center gap-2 bg-[#2F4F4F] text-white px-8 py-4 rounded-sm text-sm font-bold uppercase tracking-widest hover:bg-black transition-all shadow-lg"
            >
              <FaEnvelope size={20} /> Email Us
            </a>
          </div>
        </div>
      </div>

      {/* --- FOOTER LEGACY TEXT --- */}
      <div className="text-center px-6">
         <a href="https://www.instagram.com/damnjournals" target="_blank" rel="noreferrer" className="text-[#DAA520] hover:text-[#2F4F4F] transition mb-4 inline-block font-bold">
            <span className="flex items-center gap-2 justify-center"><FaInstagram /> Follow our craftsmanship on Instagram</span>
         </a>

    </div>
    <div className="text-center px-6">

        <div className="mt-6 inline-block border-y border-[#DAA520] py-4 px-8">
           <span className="block text-[#2F4F4F] font-serif text-lg md:text-2xl font-bold uppercase tracking-[0.2em]">
             Not Just a Journal, It’s a Damn Legacy.
           </span>
        </div>

    </div>
         
      

    </div>
  );
};

export default BulkOrder;