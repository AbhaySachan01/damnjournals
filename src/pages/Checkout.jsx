import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import AddressModal from '../components/AddressModal'; 

const Checkout = () => {
  const { user } = useAuth();
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); 
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]); 
  const [isLoading, setIsLoading] = useState(false); 

  // Pipeline States
  const [selectedAddress, setSelectedAddress] = useState(user?.addresses?.[0] || null);
  const [paymentMethod, setPaymentMethod] = useState('Razorpay');

  // 2. MODAL OPEN/CLOSE KI STATE ADD KI
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // 3. fetchAddresses ko bahar nikala taaki refresh kar sakein
  const fetchAddresses = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_BASE_URL}/api/address/getaddresses`, { credentials: 'include' });
      if (res.ok) {
        const data = await res.json();
        setAddresses(data);
        // Auto-select first address if available aur koi pehle se select nahi hai
        if (data.length > 0 && !selectedAddress) {
          setSelectedAddress(data[0]);
        }
      }
    } catch (error) {
      console.error("Failed to fetch addresses:", error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []); // Eslint warning aaye toh ignore karna is line pe, theek chalega


  const handleDeleteAddress = async (e, addressId) => {
    e.stopPropagation(); // YEH BAHUT ZAROORI HAI: Taki delete dabane par address select na ho jaye
    
    const confirmDelete = window.confirm("Are you sure you want to remove this address?");
    if (!confirmDelete) return;

    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_BASE_URL}/api/address/${addressId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (response.ok) {
        toast.success("Address removed!");
        
        // List ko update karo (deleted address ko hata do)
        const updatedAddresses = addresses.filter(addr => addr._id !== addressId);
        setAddresses(updatedAddresses);

        // Edge Case: Agar deleted address wahi tha jo user ne select kiya hua tha,
        // toh selection clear kar do ya koi doosra select karwa do.
        if (selectedAddress?._id === addressId) {
          setSelectedAddress(updatedAddresses.length > 0 ? updatedAddresses[0] : null);
        }
      } else {
        toast.error("Failed to remove address");
      }
    } catch (error) {
      toast.error("Network Error");
    }
  };
  const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

 // Step 1: Payment window open karein aur Verify karwayein
const handlePayment = async () => {
  if (!selectedAddress) return toast.error("Please select an address");
  
  setIsLoading(true);
  try {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) throw new Error("Razorpay SDK failed to load");

    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    // 1. Backend se Razorpay Order ID mangwayein
    const res = await fetch(`${API_BASE_URL}/api/orders/razorpay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: getCartTotal() }),
      credentials: "include"
    });
    
    const orderData = await res.json();
    if (!res.ok) throw new Error(orderData.message || "Failed to create order id");

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
      amount: orderData.amount,
      currency: "INR",
      name: "Your Store Name",
      description: "Order Checkout",
      order_id: orderData.id,
      handler: async function (response) {
  try {
    setIsLoading(true);
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    const verifyData = {
      razorpay_order_id: response.razorpay_order_id,
      razorpay_payment_id: response.razorpay_payment_id,
      razorpay_signature: response.razorpay_signature,
      
      // Order Items Model ke hisaab se
      orderItems: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price
      })),

      // Shipping Address mapping (Crucial Fix)
      shippingAddress: {
        fullName: selectedAddress.name || user?.name,
        addressLine1: selectedAddress.street, // Address model ka 'street' -> Order model ka 'addressLine1'
        city: selectedAddress.city,
        state: selectedAddress.state,
        postalCode: selectedAddress.zipCode, // Address model ka 'zipCode' -> Order model ka 'postalCode'
        phone: selectedAddress.phoneNumber   // Address model ka 'phoneNumber' -> Order model ka 'phone'
      },

      paymentMethod: 'Razorpay',
      totalPrice: getCartTotal(),
    };

          // 3. Backend ko verification request bhejein
          const verifyRes = await fetch(`${API_BASE_URL}/api/orders/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(verifyData),
            credentials: "include"
          });

          const finalResult = await verifyRes.json();

          if (verifyRes.ok) {
            toast.success("Payment Verified & Order Placed!");
            clearCart(); 
            navigate(`/order-success/${finalResult._id}`);
          } else {
            throw new Error(finalResult.message || "Payment verification failed");
          }
        } catch (err) {
          toast.error(err.message);
          setIsLoading(false);
        }
      },
      prefill: {
        name: user?.name,
        email: user?.email,
        contact: selectedAddress?.phoneNumber || selectedAddress?.phone,
      },
      theme: { color: "#2F4F4F" },
      modal: {
        ondismiss: function() { 
          setIsLoading(false); 
          toast.error("Payment Cancelled");
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    toast.error(error.message);
    setIsLoading(false);
  }
};

// Step 2: Payment ke baad order save karein
const placeOrder = async (paymentId) => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    
    const orderData = {
      orderItems: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price
      })),
      shippingAddress: {
       fullName: user?.name,
        addressLine1: selectedAddress.street,
        city: selectedAddress.city,
        state: selectedAddress.state,
        postalCode: selectedAddress.zipCode,
        phone: selectedAddress.phoneNumber
      },
      paymentMethod: paymentMethod,
      paymentId: paymentId, // Razorpay payment ID yahan bhejien
      totalPrice: getCartTotal(),
    };

    const response = await fetch(`${API_BASE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
      credentials: "include"
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message);

    toast.success("Order Placed Successfully!");
    clearCart(); 
    navigate(`/order-success/${data._id}`);
  } catch (error) {
    toast.error("Order failed but payment was successful. Contact support.");
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};




  return (
    <div className="max-w-4xl mx-auto py-12 px-4 font-serif relative">
      {/* 4. MODAL COMPONENT YAHAN ADD KIYA HUA HAI */}
      <AddressModal 
        isOpen={isAddressModalOpen} 
        onClose={() => setIsAddressModalOpen(false)} 
        onAddressAdded={fetchAddresses} // Jab add ho jaye, toh list refresh karlo
      />

      {/* Step Indicator */}
      <div className="flex justify-between mb-12 border-b pb-4">
        {['Address', 'Payment', 'Review'].map((s, i) => (
          <div key={s} className={`text-xs uppercase tracking-widest font-bold ${step === i + 1 ? 'text-[#DAA520]' : 'text-gray-400'}`}>
            0{i + 1}. {s}
          </div>
        ))}
      </div>

      {/* STEP 1: ADDRESS SELECTION */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <h2 className="text-2xl mb-6 uppercase tracking-widest text-[#2F4F4F]">Select Shipping Address</h2>
          <div className="grid gap-4 mb-8">
            {addresses.map((addr, idx) => (
              <div 
                key={addr._id || idx} 
                onClick={() => setSelectedAddress(addr)}
                // Relative add kiya taaki delete button absolute position le sake
                className={`relative p-4 border-2 cursor-pointer transition ${selectedAddress?._id === addr._id ? 'border-[#DAA520] bg-[#FFFAF0]' : 'border-gray-100'}`}
              >
                <p className="font-bold pr-8">{addr.street}</p> {/* pr-8 taaki text delete button ke neeche na dabe */}
                <p className="text-sm text-gray-500">{addr.city}, {addr.state} - {addr.zipCode}</p>
                <p className="text-sm mt-2">📞 {addr.phoneNumber}</p>
                
                {/* DELETE BUTTON */}
                <button 
                  onClick={(e) => handleDeleteAddress(e, addr._id)}
                  className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors"
                  title="Remove Address"
                >
                  {/* SVG for a simple Trash icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            ))}
            
            <button 
              onClick={() => setIsAddressModalOpen(true)}
              className="text-sm font-bold text-[#DAA520] border-2 border-dashed border-gray-200 p-4 hover:bg-gray-50 transition-colors"
            >
              + Add New Address
            </button>
          </div>
          <button 
            disabled={!selectedAddress}
            onClick={() => setStep(2)} 
            className="w-full bg-[#2F4F4F] text-white py-4 uppercase tracking-widest text-xs font-bold disabled:bg-gray-300"
          >
            Continue to Payment
          </button>
        </div>
      )}

      {/* STEP 2: PAYMENT METHOD */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <h2 className="text-2xl mb-6 uppercase tracking-widest text-[#2F4F4F]">Payment Method</h2>
          <div className="space-y-4 mb-8">
            <label className="flex items-center gap-4 p-4 border border-gray-100 cursor-pointer hover:bg-gray-50">
              <input type="radio" checked={paymentMethod === 'Razorpay'} onChange={() => setPaymentMethod('Razorpay')} className="accent-[#DAA520]" />
              <span className="font-bold">Razorpay (Cards, UPI, NetBanking)</span>
            </label>
            <label className="flex items-center gap-4 p-4 border border-gray-100 cursor-pointer hover:bg-gray-50 opacity-50">
              <input type="radio" disabled className="accent-[#DAA520]" />
              <span className="font-bold">Cash on Delivery (Disabled)</span>
            </label>
          </div>
          <div className="flex gap-4">
            <button onClick={() => setStep(1)} className="w-1/3 border border-gray-200 py-4 uppercase tracking-widest text-xs font-bold">Back</button>
            <button onClick={() => setStep(3)} className="w-2/3 bg-[#2F4F4F] text-white py-4 uppercase tracking-widest text-xs font-bold">Review Order</button>
          </div>
        </div>
      )}

      {/* STEP 3: FINAL REVIEW */}
      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
          <h2 className="text-2xl mb-6 uppercase tracking-widest text-[#2F4F4F]">Review Your Order</h2>
          <div className="bg-gray-50 p-6 mb-8 rounded-sm space-y-4">
             <div className="border-b pb-4">
                <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Shipping To:</p>
                <p className="text-sm font-bold">{selectedAddress?.street}, {selectedAddress?.city}</p>
             </div>
             <div className="border-b pb-4">
                <p className="text-[10px] uppercase text-gray-400 font-bold mb-1">Items:</p>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm py-1">
                    <span>{item.name} x {item.quantity}</span>
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
             </div>
             <div className="flex justify-between text-xl font-bold text-[#2F4F4F] pt-2">
                <span>Total Amount:</span>
                <span>₹{getCartTotal()}</span>
             </div>
          </div>
          <button 
                onClick={handlePayment} 
                disabled={isLoading} // Sirf boolean pass karein
                className="w-full bg-[#DAA520] text-white py-5 uppercase tracking-[0.2em] text-sm font-bold shadow-xl hover:bg-[#b8860b] transition disabled:opacity-50"
            >
                {isLoading ? 'Processing...' : 'Place Order & Pay'}
            </button>
        </div>
      )}
    </div>
  );
};

export default Checkout;