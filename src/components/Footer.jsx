import React from 'react';
import { FaInstagram, FaFacebookF, FaHeart } from "react-icons/fa"; 
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2F4F4F] text-white border-t-4 border-[#DAA520]">
      {/* Container: Vertical padding kam kar di (py-8) */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
          
          {/* --- LEFT SIDE: BRAND & TAGLINE --- */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-serif tracking-[0.2em] uppercase text-white mb-1">
              Damn Journals
            </h2>
            <p className="text-[#DAA520] font-serif italic text-sm md:text-base">
              "Where Ink Meets Soul"
            </p>
          </div>

          {/* --- CENTER: QUICK LINKS (Optional but looks good) --- */}
          <div className="flex gap-6 text-xs font-bold tracking-widest text-gray-400 uppercase">
            <Link to="/" className="hover:text-white transition">Home</Link>
            <Link to="/journals" className="hover:text-white transition">Shop</Link>
            <Link to="/blogs" className="hover:text-white transition">Story</Link>
          </div>

          {/* --- RIGHT SIDE: SOCIAL ICONS --- */}
          <div className="flex gap-6">
            <a 
              href="https://www.instagram.com/damnjournals/" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#DAA520] transition-all duration-300 transform hover:scale-110"
            >
              <FaInstagram size={24} />
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#DAA520] transition-all duration-300 transform hover:scale-110"
            >
              <FaFacebookF size={20} />
            </a>
          </div>
        </div>

        {/* --- BOTTOM: DIVIDER & COPYRIGHT --- */}
        <div className="border-t border-gray-600/30 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} DAMN JOURNALS.</p>
          
          <p className="flex items-center gap-1 mt-2 md:mt-0">
            Made with <FaHeart size={10} className="text-[#DAA520]" /> in India
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;