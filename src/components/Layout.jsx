import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './Navbar';
import Footer from './Footer';

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
    </div>
  );
};

export default Layout;