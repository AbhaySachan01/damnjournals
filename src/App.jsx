import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // <--- Ye zaroori hai
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import CategoryPage from './pages/CategoryPage';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
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
import MyOrders from './pages/MyOrders';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';
import AdminProducts from './pages/AdminProducts';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/ForgotPassword';
function App() {
  return (
    // 1. AuthProvider ko sabse bahar rakho taaki login state refresh par bani rahe
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              
              {/* Login/Signup Page - Dono paths handle kar diye */}
              <Route path="/auth" element={<Auth/>} />
              <Route path="/login" element={<Auth/>} /> 
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="verify/:token" element={<VerifyEmail />} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute> } />
              <Route path="/admin/product" element={<AdminRoute><AdminProducts /></AdminRoute> } />
              
              {/* User Routes */}
              <Route path="/order" element={<Checkout />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/order-success/:id" element={<OrderSuccess />} />
              <Route path="my-orders" element={<ProtectedRoute><MyOrders /></ProtectedRoute>} />
              
              {/* Product & Category Routes */}
              <Route path="product/:id" element={<ProductDetails />} />
              <Route path="limited-editions/:id" element={<LimitedEditionDetails />} />
              <Route path="/keychains" element={<KeychainsPage />} />
              <Route path="/keychains/:id" element={<KeychainDetails />} />
              <Route path="best-sellers" element={<BestsellersPage />} />
              <Route path="journals" element={<CategoryPage category="journals" title="Handcrafted Journals" />} />
              <Route path="blogs" element={<CategoryPage category="blogs" title="Our Blogs" />} />
              
              {/* Content Pages */}
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
    </AuthProvider>
  );
}

export default App;