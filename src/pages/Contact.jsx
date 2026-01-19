import React, { useEffect } from 'react';
import { FaWhatsapp, FaEnvelope, FaInstagram, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // CHANGE 1: py-16 md:py-24 ko kam karke py-8 md:py-12 kiya (Top gap reduced)
    <div className="bg-[#FFFAF0] min-h-screen py-8 md:py-12 font-sans text-gray-700">
      <div className="max-w-4xl mx-auto px-6 text-center">
        
        {/* --- HEADER --- */}
        {/* CHANGE 2: mb-6 ko mb-2 kiya (Title aur Quote ka gap kam) */}
        <h1 className="text-4xl md:text-5xl font-serif text-[#2F4F4F] mb-2 uppercase tracking-[0.2em]">
          Contact Us
        </h1>
        
        {/* CHANGE 3: mb-10 ko mb-6 kiya */}
        <p className="text-[#DAA520] font-serif italic text-lg md:text-xl mb-6">
          "We’d love to hear from you."
        </p>
        
        {/* CHANGE 4: Divider ke niche ka gap mb-12 se mb-8 kiya */}
        <div className="w-24 h-1 bg-[#2F4F4F] mx-auto mb-8"></div>

        {/* --- INTRO TEXT --- */}
        {/* CHANGE 5: mb-16 ko mb-10 kiya aur space-y-6 ko space-y-4 kiya */}
        <div className="max-w-3xl mx-auto mb-10 space-y-4">
          <p className="leading-7 text-gray-700 text-sm md:text-base font-light">
            At <span className="font-bold text-[#2F4F4F]">Damn Journals</span>, we create more than premium journals. 
            We create timeless writing companions, handcrafted with intention, heritage, and soul. 
            Every message we receive carries a story, and we value each one deeply.
          </p>
          <p className="leading-7 text-gray-700 text-sm md:text-base font-light">
            Whether you’re looking to buy luxury handcrafted journals in India, need assistance with an order, 
            wish to explore custom or bulk gifting options, or want to collaborate with a premium stationery brand, 
            our team is always here to assist you.
          </p>
        </div>

        {/* --- GET IN TOUCH SECTION --- */}
        {/* CHANGE 6: Padding thodi tight ki (p-6 instead of p-10) */}
        <div className="bg-white p-6 md:p-8 shadow-sm border border-gray-100 rounded-sm mb-12 max-w-2xl mx-auto">
          <h3 className="font-serif text-[#2F4F4F] text-lg mb-2 uppercase tracking-widest">Get in Touch</h3>
          <p className="font-light text-sm md:text-base leading-relaxed text-gray-600">
            For product inquiries, order support, personalized journals, corporate gifting, wholesale partnerships, 
            or creative collaborations, feel free to reach out. We ensure a thoughtful and prompt response.
          </p>
        </div>

        {/* --- CONTACT CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
          
          {/* Card 1: WhatsApp */}
          <a 
            href="https://wa.me/919713631331" 
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-6 rounded-sm border border-transparent hover:border-[#25D366] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center"
          >
            <FaWhatsapp className="text-[#25D366] text-3xl mb-3 group-hover:scale-110 transition" />
            <h4 className="font-serif text-[#2F4F4F] text-base mb-1 uppercase tracking-wide">WhatsApp & Call</h4>
            <p className="text-gray-600 font-bold text-base group-hover:text-[#2F4F4F] transition">
              +91 97136 31331
            </p>
          </a>

          {/* Card 2: Email */}
          <a 
            href="mailto:damnjournals777@gmail.com" 
            className="group bg-white p-6 rounded-sm border border-transparent hover:border-[#DAA520] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center"
          >
            <FaEnvelope className="text-[#DAA520] text-3xl mb-3 group-hover:scale-110 transition" />
            <h4 className="font-serif text-[#2F4F4F] text-base mb-1 uppercase tracking-wide">Email</h4>
            <p className="text-gray-600 font-medium text-base group-hover:text-[#2F4F4F] transition">
              damnjournals777@gmail.com
            </p>
          </a>

          {/* Card 3: Instagram */}
          <a 
            href="https://www.instagram.com/damnjournals" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-white p-6 rounded-sm border border-transparent hover:border-[#E1306C] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center col-span-1 md:col-span-2"
          >
            <FaInstagram className="text-[#E1306C] text-3xl mb-3 group-hover:scale-110 transition" />
            <h4 className="font-serif text-[#2F4F4F] text-base mb-1 uppercase tracking-wide">Instagram</h4>
            <p className="text-gray-500 text-xs md:text-sm mb-3 max-w-md mx-auto leading-relaxed">
              Discover our world of premium journals, behind-the-scenes craftsmanship, and timeless aesthetics on Instagram.
            </p>
            <span className="text-[#2F4F4F] font-bold text-sm border-b border-[#2F4F4F] pb-0.5 hover:text-[#DAA520] hover:border-[#DAA520] transition">
              @damnjournals
            </span>
          </a>

          {/* Card 4: Origin */}
          <div className="group bg-white p-6 rounded-sm border border-transparent shadow-sm flex flex-col items-center col-span-1 md:col-span-2">
            <FaMapMarkerAlt className="text-[#2F4F4F] text-3xl mb-3" />
            <h4 className="font-serif text-[#2F4F4F] text-base mb-1 uppercase tracking-wide">Origin</h4>
            <p className="text-gray-600 font-medium text-sm">
              Proudly handcrafted in India 🇮🇳
            </p>
          </div>

        </div>

        {/* --- CLOSING --- */}
        <div className="mb-8">
          <p className="text-gray-600 italic text-base mb-8 font-serif text-center max-w-2xl mx-auto">
            "Journaling is intimate. So is our relationship with you. Write to us, connect with us, or simply say hello. Your words belong here."
          </p>
          
          <div className="inline-block border-y border-[#DAA520] py-3 px-6">
             <span className="block text-[#2F4F4F] font-serif text-base md:text-xl font-bold uppercase tracking-[0.15em]">
               Not Just a Journal, It’s a Damn Legacy.
             </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;