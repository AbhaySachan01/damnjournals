import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaWhatsapp } from 'react-icons/fa';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFAF0]">
      {/* 1. Global Toast Configuration */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#2F4F4F',
            color: '#fff',
            border: '1px solid #DAA520',
            padding: '16px',
            fontFamily: 'serif',
          },
          iconTheme: {
            primary: '#DAA520',
            secondary: '#2F4F4F',
          },
        }}
      />

      {/* 2. Navbar */}
      <Navbar />

      {/* 3. Main Content (Outlet renders the current page) */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* 4. Footer */}
      <Footer />

      <a 
        href="https://wa.me/919713631331" 
        target="_blank"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition z-50 flex items-center gap-2"
      >
        {/* React Icons se FaWhatsapp import kar lena */}
        <FaWhatsapp size={28} />
        <span className="font-bold hidden md:block">Chat with us</span>
      </a>
    </div>
  );
};

export default Layout;