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
import LimitedEditionDetails from './pages/LimitedEditionDetails';
import LimitedEditionsPage from './pages/LimitedEditionsPage';
import BestsellersPage from './pages/BestSellersPage';
import KeychainDetails from './pages/KeyChainDetails';
import KeychainsPage from './pages/KeyChainsPage';
import JournalingClub from './pages/JournalingClub';
import Auth from './pages/Auth';
import VerifyEmail from './pages/VerifyEmail';
import Order from './pages/Order';
import MyOrders from './pages/MyOrders';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import AdminProducts from './pages/AdminProducts';
function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/keychains" element={<KeychainsPage />} />
            <Route path="/auth" element={<Auth/>} />
            <Route path="verify/:token" element={<VerifyEmail />} />
            {/* <Route path="order" element={<Order />} /> */}
            <Route path="/admin/dashboard" element={<AdminRoute>  <AdminDashboard /></AdminRoute> } />
            <Route path="/admin/product" element={<AdminRoute>  <AdminProducts /></AdminRoute> } />
            <Route path="/order" element={<Checkout />} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/order-success/:id" element={<OrderSuccess />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="limited-editions/:id" element={<LimitedEditionDetails />} />
            <Route path="/keychains/:id" element={<KeychainDetails />} />
            <Route path="best-sellers" element={<BestsellersPage />} />
            <Route path="journals" element={<CategoryPage category="journals" title="Handcrafted Journals" />} />
            <Route path="keychains" element={<CategoryPage category="keychains" title="Keychains" />} />
            <Route path="blogs" element={<CategoryPage category="blogs" title="Our Blogs" />} />
            <Route path="cart" element={<Cart />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="bulk-order" element={<BulkOrder />} />
            <Route path="faqs" element={<Faqs />} />
            <Route path="limited-editions" element={<LimitedEditionsPage />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="our-story" element={<OurStory />} />
            <Route path="artworks" element={<Artworks />} />
            <Route path="club" element={<JournalingClub/>} />

          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;