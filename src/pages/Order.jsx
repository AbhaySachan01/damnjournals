import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { State, City } from "country-state-city";

const Order = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // State & City lists
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    state: '',
    phone: '',
    country: 'India'
  });

  // Load Indian states on mount
  useEffect(() => {
    const indianStates = State.getStatesOfCountry("IN");
    setStates(indianStates);
  }, []);

  // Handle normal input change
  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value
    });
  };

  // Handle state change
  const handleStateChange = (e) => {
    const stateCode = e.target.value;
    const selectedState = states.find(s => s.isoCode === stateCode);

    setShippingAddress(prev => ({
      ...prev,
      state: selectedState?.name || '',
      city: ''
    }));

    const stateCities = City.getCitiesOfState("IN", stateCode);
    setCities(stateCities);
  };

  // Handle city change
  const handleCityChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      city: e.target.value
    });
  };

  // Place Order
  const placeOrderHandler = async (e) => {
    e.preventDefault();

    if (!shippingAddress.state || !shippingAddress.city) {
      toast.error("Please select state and city");
      return;
    }

    setLoading(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderItems: cart,
          shippingAddress,
          paymentMethod: 'Razorpay (Pending)',
          totalPrice: getCartTotal(),
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      toast.success('Order stored successfully!');
      clearCart();
      navigate('/my-orders');

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl font-serif">
      <h2 className="text-3xl text-center text-[#2F4F4F] mb-12 uppercase tracking-widest font-bold">
        Shipping Info
      </h2>

      <div className="flex flex-col md:flex-row gap-12">

        {/* Form Section */}
        <div className="md:w-2/3 bg-white p-8 shadow-sm border border-gray-100">
          <form onSubmit={placeOrderHandler} className="space-y-6">

            {/* Full Name */}
            <div>
              <label className="block text-xs text-gray-400 uppercase font-bold mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={shippingAddress.fullName}
                onChange={handleChange}
                className="w-full border-b border-gray-300 py-2 outline-none"
              />
            </div>

            {/* Address Lines */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="addressLine1"
                required
                placeholder="Flat / House No"
                value={shippingAddress.addressLine1}
                onChange={handleChange}
                className="border-b border-gray-300 py-2 outline-none"
              />
              <input
                type="text"
                name="addressLine2"
                placeholder="Area / Landmark"
                value={shippingAddress.addressLine2}
                onChange={handleChange}
                className="border-b border-gray-300 py-2 outline-none"
              />
            </div>

            {/* Pincode & Phone */}
            <div className="grid grid-cols-2 gap-6">
              <input
                type="text"
                name="postalCode"
                required
                maxLength="6"
                placeholder="Pincode"
                value={shippingAddress.postalCode}
                onChange={handleChange}
                className="border-b border-gray-300 py-2 outline-none"
              />
              <input
                type="text"
                name="phone"
                required
                placeholder="Phone Number"
                value={shippingAddress.phone}
                onChange={handleChange}
                className="border-b border-gray-300 py-2 outline-none"
              />
            </div>

            {/* Country (Fixed) */}
            <div>
              <label className="block text-xs text-gray-400 uppercase font-bold mb-1">
                Country
              </label>
              <input
                type="text"
                value="India"
                readOnly
                className="w-full bg-gray-100 border-b border-gray-300 py-2"
              />
            </div>

            {/* State & City Dropdown */}
            <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-md">

              {/* State */}
              <div>
                <label className="block text-xs text-gray-400 uppercase font-bold mb-1">
                  State
                </label>
                <select
                  required
                  onChange={handleStateChange}
                  className="w-full border-b border-gray-300 py-2 outline-none"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* City */}
              <div>
                <label className="block text-xs text-gray-400 uppercase font-bold mb-1">
                  City
                </label>
                <select
                  required
                  value={shippingAddress.city}
                  onChange={handleCityChange}
                  disabled={!cities.length}
                  className="w-full border-b border-gray-300 py-2 outline-none"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2F4F4F] text-white py-4 font-bold uppercase tracking-widest hover:bg-black transition"
            >
              {loading ? 'Saving Order...' : 'Review & Pay'}
            </button>

          </form>
        </div>

        {/* Order Summary */}
        <div className="md:w-1/3 bg-[#FFFAF0] p-6 shadow-sm border border-gray-200 h-fit">
          <h3 className="text-lg text-[#2F4F4F] mb-4 border-b border-gray-300 pb-2 uppercase tracking-wide">
            Summary
          </h3>

          <div className="space-y-4 mb-6">
            {cart.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xl font-bold border-t pt-4">
            <span>Total:</span>
            <span>₹{getCartTotal()}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Order;