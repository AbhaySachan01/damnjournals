import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart, getCartTotal, checkoutViaWhatsApp } = useCart();

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl min-h-[60vh]">
      <h2 className="text-3xl font-serif text-center text-[#2F4F4F] mb-12 tracking-widest uppercase">Your Shopping Bag</h2>
      
      {cart.length === 0 ? (
        <div className="text-center flex flex-col items-center">
          <p className="text-gray-500 mb-6 text-lg">Your cart is currently empty.</p>
          <Link to="/journals" className="px-8 py-3 bg-[#2F4F4F] text-white uppercase tracking-widest text-xs font-bold hover:bg-black transition">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row gap-12">
          
          {/* Cart Items List */}
          <div className="md:w-2/3 flex flex-col gap-6">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 flex gap-4 md:gap-6 items-center shadow-sm border border-gray-100 rounded-lg">
                
                {/* Image */}
                <div className="w-20 h-24 md:w-24 md:h-32 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <h4 className="font-bold text-[#2F4F4F] text-sm md:text-base uppercase tracking-wide mb-1">{item.name}</h4>
                  <p className="text-gray-500 text-xs mb-3">{item.category}</p>
                  <p className="font-serif text-[#DAA520] font-bold">₹ {item.price}</p>
                </div>

                {/* Quantity Controls */}
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center border border-gray-300 rounded-full">
                    <button 
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-l-full transition"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold text-[#2F4F4F]">{item.quantity}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-r-full transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-red-400 hover:text-red-600 underline mt-1"
                  >
                    Remove
                  </button>
                </div>

              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="md:w-1/3">
            <div className="bg-white p-8 shadow-sm border border-gray-100 sticky top-24">
              <h3 className="text-lg font-serif font-bold text-[#2F4F4F] mb-6 border-b pb-4">Order Summary</h3>
              
              <div className="flex justify-between mb-4 text-gray-600">
                <span>Subtotal</span>
                <span>₹ {getCartTotal()}</span>
              </div>
              <div className="flex justify-between mb-6 text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600 text-xs font-bold uppercase self-center">Free</span>
              </div>
              
              <div className="flex justify-between mb-8 text-xl font-bold text-[#2F4F4F]">
                <span>Total</span>
                <span>₹ {getCartTotal()}</span>
              </div>

              <button 
                onClick={checkoutViaWhatsApp}
                className="w-full bg-[#25D366] text-white font-bold py-4 hover:bg-green-600 transition flex items-center justify-center gap-3 uppercase tracking-widest text-xs shadow-lg"
              >
                Checkout on WhatsApp
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;