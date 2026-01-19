import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import { CartProvider } from './context/CartContext';
import Contact from './pages/Contact'; 
import About from './pages/About';
import BulkOrder from './pages/BulkOrder';
import Faqs from './pages/Faqs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import OurStory from './pages/OurStory';
import Artworks from './pages/Artworks';
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            
            <Route path="product/:id" element={<ProductDetails />} />
            
            <Route path="journals" element={<CategoryPage category="journals" title="Handcrafted Journals" />} />
            <Route path="keychains" element={<CategoryPage category="keychains" title="Keychains" />} />
            <Route path="blogs" element={<CategoryPage category="blogs" title="Our Blogs" />} />
            <Route path="cart" element={<Cart />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="bulk-order" element={<BulkOrder />} />
            <Route path="faqs" element={<Faqs />} />
            <Route path="limited-editions" element={<CategoryPage category="journals" title="Limited Editions" />} />
            <Route path="best-sellers" element={<CategoryPage category="journals" title="Best Sellers" />} />
            <Route path="club" element={<div className="text-center py-20 font-serif text-2xl">Journalling Club - Coming Soon</div>} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="our-story" element={<OurStory />} />
            <Route path="artworks" element={<Artworks />} />

          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;