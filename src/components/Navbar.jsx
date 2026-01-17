import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  // FIX: Yahan humne 'cart' ki jagah 'getCartCount' nikala hai context se
  const { getCartCount } = useCart(); 
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Ab ye function available hai call karne ke liye
  const cartCount = getCartCount();

  return (
    <nav className="bg-[#FFFAF0] sticky top-0 z-50 font-serif border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 relative">
        
        {/* Mobile Header */}
        <div className="flex justify-between items-center">
          <button className="md:hidden text-[#2F4F4F]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Logo */}
          <div className="flex-grow text-center md:flex-grow-0 md:w-full md:text-center md:absolute md:left-0 md:top-5">
            <Link to="/" className="text-3xl md:text-4xl font-bold text-[#2F4F4F] tracking-[0.2em] uppercase">
              Damn Journals
            </Link>
          </div>

          {/* Cart */}
          <div className="md:absolute md:right-12 md:top-6 z-10">
            <Link to="/cart" className="relative text-[#2F4F4F] hover:text-gray-600 transition">
              <ShoppingBag size={26} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#DAA520] text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-[#FFFAF0]">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex justify-center items-center mt-8 pt-2 w-full">
          <div className="flex gap-12 text-xs font-bold tracking-[0.15em] text-gray-500 uppercase">
            <Link to="/" className="hover:text-[#2F4F4F] transition">Home</Link>
            <Link to="/journals" className="hover:text-[#2F4F4F] transition">Journals</Link>
            <Link to="/keychains" className="hover:text-[#2F4F4F] transition">Keychains</Link>
            <Link to="/blogs" className="hover:text-[#2F4F4F] transition">Blogs</Link>
            <Link to="/artworks" className="hover:text-[#2F4F4F] transition">Art Works</Link>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center gap-6 py-8 bg-[#FFFAF0] mt-4 animate-fade-in">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold tracking-widest text-gray-700 uppercase">Home</Link>
            <Link to="/journals" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold tracking-widest text-gray-700 uppercase">Journals</Link>
            <Link to="/keychains" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold tracking-widest text-gray-700 uppercase">Keychains</Link>
            <Link to="/blogs" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold tracking-widest text-gray-700 uppercase">Blogs</Link>
            <Link to="/artworks" onClick={() => setIsMenuOpen(false)} className="text-sm font-bold tracking-widest text-gray-700 uppercase">Art Works</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;