import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Package, ChevronRight, Calendar } from 'lucide-react';
import OrderDetailsModal from '../components/OrderDetailsModal'; // Naya component banayenge

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null); // Summary ke liye state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${API_BASE_URL}/api/orders/myorders`, {
          credentials: 'include'
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        setOrders(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-20 font-serif italic text-gray-400">Loading your collection...</div>;

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl font-serif min-h-screen">
      <h2 className="text-3xl text-center text-[#2F4F4F] mb-12 uppercase tracking-[0.3em] font-light">My Orders</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-gray-400 mb-6">No journals ordered yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div 
              key={order._id} 
              onClick={() => setSelectedOrder(order)} // Click par modal khulega
              className="group bg-white p-6 shadow-sm border border-gray-100 rounded-xl hover:shadow-md hover:border-[#DAA520]/30 transition-all cursor-pointer flex flex-col md:flex-row justify-between items-center gap-4"
            >
              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="bg-[#FFFAF0] p-4 rounded-full text-[#DAA520]">
                  <Package size={24} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Order ID: #{order._id.slice(-8)}</p>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar size={14} />
                    <span>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                  <p className="text-lg font-bold text-[#2F4F4F]">₹{order.totalPrice}</p>
                  <p className={`text-[10px] font-bold uppercase tracking-tighter ${order.isPaid ? 'text-green-600' : 'text-orange-500'}`}>
                    {order.isPaid ? '• Payment Successful' : '• Payment Pending'}
                  </p>
                </div>
                <ChevronRight className="text-gray-300 group-hover:text-[#DAA520] transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Summary Modal Component */}
      {selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default MyOrders;