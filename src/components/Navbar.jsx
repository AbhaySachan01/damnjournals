import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // 1. AuthContext import kiya
import toast from 'react-hot-toast';

const Navbar = () => {
  const { getCartCount } = useCart();
  const { user, logout } = useAuth(); // 2. useAuth se user aur setUser nikala
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const cartCount = getCartCount();
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Outside click logic (Same rahega)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownRef]);

  // Logout Logic: Context aur Storage dono clear karein
  const handleLogout = async () => {
    try {
      setShowDropdown(false);
      
      // 🔥 YAHAN APNA ASLI CONTEXT WALA LOGOUT CALL KAR 🔥
      await logout(); 
      
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const CLOUDINARY_BASE = "https://res.cloudinary.com/dafcbp9mu/image/upload";
  const cld = (publicId, w = 200) => `${CLOUDINARY_BASE}/f_auto,q_auto,w_${w}/${publicId}`;

  const greenPages = ['/', '/artworks', '/our-story', '/cart', '/club','/auth'];
  const isDarkNav = greenPages.includes(location.pathname);

  const navBgClass = isDarkNav ? "bg-[#2F4F4F] border-[#DAA520]/20" : "bg-[#FFFAF0] border-gray-200";
  const textColorClass = isDarkNav ? "text-[#FFFAF0]" : "text-[#2F4F4F]";
  const hoverColorClass = isDarkNav ? "hover:text-[#DAA520]" : "hover:text-gray-600";
  const logoFilter = isDarkNav ? "brightness-80" : "";

  const getLinkClasses = (path) => {
    const isActive = location.pathname === path;
    if (isDarkNav) {
      return isActive ? "text-[#DAA520] font-extrabold underline decoration-2 underline-offset-8" : "text-gray-300 hover:text-[#DAA520]";
    } else {
      return isActive ? "text-[#2F4F4F] font-extrabold underline decoration-2 underline-offset-8" : "text-gray-500 hover:text-[#2F4F4F]";
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
        <div className="flex justify-between items-center relative min-h-[30px]">
          
          <button className={`lg:hidden ${textColorClass}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2">
            <Link to="/">
              <img src={cld('journals/logo.jpg')} alt="Logo" className={`h-14 w-auto transition-all duration-300 rounded-full m-2 ${logoFilter}`} />
            </Link>
          </div>

          <div className="flex-grow text-center lg:w-full">
            <Link to="/" className={`text-3xl md:text-4xl font-bold tracking-[0.2em] uppercase transition-colors duration-300 ${textColorClass}`}>
              Damn Journals
            </Link>
          </div>

          <div className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 z-10 flex items-center gap-4 md:gap-6">
            
            {/* --- USER PROFILE / GOOGLE AVATAR --- */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="overflow-hidden w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-[#DAA520] transition-transform hover:scale-105 active:scale-95 flex items-center justify-center bg-[#2F4F4F] text-white"
                >
                  {/* Agar user.image hai toh photo dikhao, warna pehla letter */}
                  {user.image ? (
                    <img 
                      src={user.image} 
                      alt={user.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer" // Google photos ke liye zaroori
                    />
                  ) : (
                    <span className="font-bold text-lg">{user.name.charAt(0).toUpperCase()}</span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-48 bg-white shadow-2xl border border-gray-100 py-2 rounded-lg overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                       <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1 italic">Welcome back,</p>
                       <p className="text-sm font-bold text-[#2F4F4F] truncate">{user.name}</p>
                    </div>

                    <Link 
                        to="/profile" 
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-[#2F4F4F] hover:bg-gray-50 transition-colors font-bold uppercase tracking-wider border-b border-gray-100"
                      >
                        👤 My Profile
                      </Link>

                      <Link 
                        to="/my-orders" 
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-[#2F4F4F] hover:bg-gray-50 transition-colors font-bold uppercase tracking-wider border-b border-gray-100"
                      >
                        📦 My Orders
                      </Link>

                      <button 
                        onClick={handleLogout} 
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-left text-red-600 hover:bg-red-50 transition-colors font-bold uppercase tracking-wider"
                      >
                        👋 Logout
                      </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth" className={`transition-colors duration-300 ${textColorClass} ${hoverColorClass}`}>
                <User size={26} />
              </Link>
            )}

            <Link to="/cart" className={`relative transition-colors duration-300 ${textColorClass} ${hoverColorClass}`}>
              <ShoppingBag size={26} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#DAA520] text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-current">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop Links Row (Same) */}
        <div className="hidden lg:flex justify-center items-center mt-3 pt-2 w-full border-t border-current/10">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] font-bold tracking-[0.15em] uppercase transition-all">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className={`${getLinkClasses(link.path)} transition-colors duration-300`}>
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu (Same) */}
        {isMenuOpen && (
          <div className={`lg:hidden flex flex-col items-center gap-6 py-8 mt-4 border-t h-screen ${isDarkNav ? 'bg-[#2F4F4F] border-gray-600' : 'bg-[#FFFAF0] border-gray-200'}`}>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)} className={`text-sm font-bold tracking-widest uppercase hover:text-[#DAA520] ${isDarkNav ? 'text-gray-200' : 'text-gray-700'}`}>
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