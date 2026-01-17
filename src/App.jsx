import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Layout import kiya
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          {/* Layout sab pages ke upar wrap ho jayega */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="journals" element={<CategoryPage category="journals" title="Handcrafted Journals" />} />
            <Route path="keychains" element={<CategoryPage category="keychains" title="Keychains" />} />
            <Route path="blogs" element={<CategoryPage category="blogs" title="Our Blogs" />} />
            <Route path="artworks" element={<CategoryPage category="artworks" title="Art Works" />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;