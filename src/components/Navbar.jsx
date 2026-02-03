import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = getCartCount();
  
  const location = useLocation();

  const CLOUDINARY_BASE =
  "https://res.cloudinary.com/dafcbp9mu/image/upload";

  const cld = (publicId, w = 200) =>
  `${CLOUDINARY_BASE}/f_auto,q_auto,w_${w}/${publicId}`;



  const greenPages = ['/', '/artworks', '/our-story','/cart'];
  const isDarkNav = greenPages.includes(location.pathname);


  const navBgClass = isDarkNav ? "bg-[#2F4F4F] border-[#DAA520]/20" : "bg-[#FFFAF0] border-gray-200";
  const textColorClass = isDarkNav ? "text-[#FFFAF0]" : "text-[#2F4F4F]";
  const hoverColorClass = isDarkNav ? "hover:text-[#DAA520]" : "hover:text-gray-600";
  const logoFilter = isDarkNav ? "brightness-80 "  : ""; // White Logo for Dark BG

  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;
    if (isDarkNav) {
       // Dark Background Styles
       return isActive ? "text-[#DAA520] font-extrabold" : "text-gray-300 hover:text-[#DAA520]";
    } else {
       // Light Background Styles
       return isActive ? "text-[#2F4F4F] font-extrabold" : "text-gray-500 hover:text-[#2F4F4F]";
    }
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Journals", path: "/journals" },
    { name: "Keychains", path: "/keychains" },
    { name: "Art Work", path: "/artworks" },
    { name: "Limited Edition", path: "/limited-editions" },
    { name: "Our Story", path: "/our-story" },
    { name: "Best Sellers", path: "/best-sellers" },
    { name: "Journalling Club", path: "/club" },
  ];

  return (
    <nav id="main-navbar" className={`${navBgClass} sticky top-0 z-50 font-serif border-b shadow-sm transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-3 md:px-6 py-3 relative">
        
        {/* --- HEADER ROW --- */}
        <div className="flex justify-between items-center relative min-h-[30px]">
          
          {/* Hamburger Button */}
          <button className={`lg:hidden ${textColorClass}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* LOGO IMAGE (Desktop Left) */}
          <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2">
             <Link to="/">
               <img 
                 src={cld('journals/logo.jpg')} 
                 alt="Logo"
                 className={`h-14 w-auto transition-all duration-300 rounded-full m-2 ${logoFilter}`} 
               />
             </Link>
          </div>

          {/* BRAND NAME (Centered) */}
          <div className="flex-grow text-center lg:w-full">
            <Link to="/" className={`text-3xl md:text-4xl font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${textColorClass}`}>
              Damn Journals
            </Link>
          </div>

          {/* CART ICON (Right) */}
          <div className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-10">
            <Link to="/cart" className={`relative transition-colors duration-300 ${textColorClass} ${hoverColorClass}`}>
              <ShoppingBag size={26} />
              {cartCount > 0 && (
                <span className={`absolute -top-2 -right-2 bg-[#DAA520] text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 ${isDarkNav ? 'border-[#2F4F4F]' : 'border-[#FFFAF0]'}`}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
        
        {/* --- DESKTOP LINKS ROW --- */}
        <div className="hidden lg:flex justify-center items-center mt-3 pt-2 w-full border-t border-current/10">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] font-bold tracking-[0.15em] uppercase transition-all">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className={`${getLinkClasses(link.path)} transition-colors duration-300`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* --- MOBILE MENU --- */}
        {isMenuOpen && (
          <div className={`lg:hidden flex flex-col items-center gap-6 py-8 mt-4 border-t animate-fade-in h-screen ${isDarkNav ? 'bg-[#2F4F4F] border-gray-600' : 'bg-[#FFFAF0] border-gray-200'}`}>
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={() => setIsMenuOpen(false)} 
                className={`text-sm font-bold tracking-widest uppercase hover:text-[#DAA520] ${isDarkNav ? 'text-gray-200' : 'text-gray-700'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;