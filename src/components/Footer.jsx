import React from 'react';
import { FaInstagram, FaFacebookF, FaEnvelope, FaHeart } from "react-icons/fa"; 

const Footer = () => {
  return (
    // Added border-top for a premium look
    <footer className="bg-[#2F4F4F] text-white pt-20 pb-10 mt-auto border-t-4 border-[#DAA520]">
      <div className="container mx-auto px-6 flex flex-col items-center justify-center text-center">
        
        {/* 1. Brand Name */}
        <h2 className="text-4xl md:text-5xl font-serif tracking-[0.2em] mb-3 uppercase text-white">
          Damn Journals
        </h2>
        
        {/* 2. Tagline (Gold Color) */}
        <p className="text-[#DAA520] font-serif italic text-lg md:text-xl mb-8">
          "Where Ink Meets Soul"
        </p>

        {/* 3. The "Mast Wala" Text (Soulful Description) */}
        <div className="max-w-2xl mx-auto mb-10">
          <p className="text-gray-300 text-sm md:text-base leading-loose font-light tracking-wide">
            We don't just sell paper; we craft keepers of secrets. 
            Handbound with patience and wrapped in Indian heritage, our journals are waiting for your story. 
            Whether it's a sketch, a poem, or a midnight thought—give it a home it deserves.
          </p>
        </div>

        {/* Divider Line */}
        <div className="w-16 h-[1px] bg-gray-500 mb-10"></div>

        {/* 4. Social Icons */}
        <div className="flex gap-8 mb-10 items-center">
          
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/damnjournals/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#DAA520] transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
            title="Follow us on Instagram"
          >
            <FaInstagram size={28} />
          </a>
          
          {/* Facebook */}
          <a 
            href="https://facebook.com" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#DAA520] transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
            title="Join us on Facebook"
          >
            <FaFacebookF size={24} />
          </a>

          {/* Mail Icon (New Addition)
          <a 
            href="mailto:hello@damnjournals.com" 
            className="text-gray-300 hover:text-[#DAA520] transition-all duration-300 transform hover:scale-125 hover:-translate-y-1"
            title="Email Us"
          >
            <FaEnvelope size={26} />
          </a> */}

        </div>

        {/* 5. Copyright with a tiny heart */}
        <div className="flex flex-col gap-2">
          <p className="text-[10px] md:text-xs text-gray-500 tracking-[0.2em] uppercase font-sans">
            &copy; {new Date().getFullYear()} DAMN JOURNALS. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] text-gray-600 flex items-center justify-center gap-1">
            Made with <FaHeart size={10} className="text-red-500" /> in India
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;