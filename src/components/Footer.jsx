import React from 'react';
import { FaInstagram, FaFacebookF, FaHeart } from "react-icons/fa"; 
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#2F4F4F] text-white border-t-4 border-[#DAA520]">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0">
          
          {/* --- LEFT SIDE: BRAND & SOCIALS --- */}
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-serif tracking-[0.2em] uppercase text-white mb-2">
              Damn Journals
            </h2>
            <p className="text-[#DAA520] font-serif italic text-sm mb-6">
              "Not Just a Journal. It’s a Damn Legacy"
            </p>
            
            {/* Social Icons (Left Aligned now) */}
            <div className="flex gap-5">
              <a 
                href="https://www.instagram.com/damnjournals/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#DAA520] transition-all duration-300 transform hover:scale-110"
              >
                <FaInstagram size={22} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#DAA520] transition-all duration-300 transform hover:scale-110"
              >
                <FaFacebookF size={18} />
              </a>
            </div>
          </div>

          {/* --- RIGHT SIDE: LINKS (Your Requested List) --- */}
          {/* Grid Layout: 2 Columns for better organization */}
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-xs md:text-sm font-light tracking-wide text-gray-300">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-3">
              <Link to="/about" className="hover:text-[#DAA520] transition-colors">About Us</Link>
              <Link to="/bulk-order" className="hover:text-[#DAA520] transition-colors">Bulk Order</Link>
              <Link to="/contact" className="hover:text-[#DAA520] transition-colors">Contact Us</Link>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3">
              <Link to="/faqs" className="hover:text-[#DAA520] transition-colors">FAQs</Link>
              <Link to="/privacy-policy" className="hover:text-[#DAA520] transition-colors">Privacy Policy</Link>
            </div>

          </div>
        </div>

        <div className="border-t border-gray-600/30 mt-10 pt-6 relative flex flex-col md:flex-row justify-center items-center text-[12px] text-gray-500 tracking-widest uppercase">
          
          {/* Copyright: Laptop par Absolute Left rahega */}
          <p className="md:absolute md:left-0 mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} DAMN JOURNALS.
          </p>
          
          {/* Made in India: Flexbox ki wajah se Centre me rahega */}
          <p className="flex items-center gap-1">
            Made with <FaHeart size={10} className="text-[#DAA520]" /> in India
          </p>
          
        </div>


      </div>
    </footer>
  );
};

export default Footer;