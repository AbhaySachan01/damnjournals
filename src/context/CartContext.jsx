import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('damn-journals-cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('damn-journals-cart', JSON.stringify(cart));
  }, [cart]);

  // --- EXISTING LOGIC BELOW (No changes needed here) ---

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      toast.success(`Updated quantity: ${product.name}`);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      toast.success(`${product.name} added to bag!`);
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null; 
          }
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter(item => item.id !== productId));
    toast.error("Item removed from bag");
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const checkoutViaWhatsApp = () => {
    const phoneNumber = "919713631331"; 
    
    if(cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    let message = "Hello! I would like to place an order:\n\n";
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (x${item.quantity}) - ₹${item.price * item.quantity}\n`;
    });
    message += `\nTotal Amount: ₹${getCartTotal()}`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      decreaseQuantity, 
      removeFromCart, 
      getCartTotal, 
      getCartCount,
      checkoutViaWhatsApp 
    }}>
      {children}
    </CartContext.Provider>
  );
};