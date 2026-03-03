import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Search, Trash2, Eye, Filter } from 'lucide-react';
import OrderDetailsModal from '../components/OrderDetailsModal';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // Status state
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [showModal, setShowModal] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchAllOrders = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/allorders`, { 
        credentials: 'include' 
      });
      const data = await res.json();
      if (res.ok) {
        setOrders(data);
        setFilteredOrders(data);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      toast.error("Network Error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Combined Search and Filter Logic
  useEffect(() => {
    let results = orders;

    // 1. Status Filter
    if (statusFilter === 'Pending') {
      results = results.filter(order => !order.isDelivered);
    } else if (statusFilter === 'Delivered') {
      results = results.filter(order => order.isDelivered);
    }

    // 2. Search Filter
    if (searchTerm) {
      results = results.filter(order => 
        order.shippingAddress.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredOrders(results);
  }, [searchTerm, orders, statusFilter]);

  const handleDeleteOrder = async (id) => {
    if (window.confirm("Are you sure? This will remove the order permanently.")) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/orders/${id}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (res.ok) {
          toast.success("Order Deleted");
          fetchAllOrders();
        }
      } catch (error) {
        toast.error("Error deleting order");
      }
    }
  };

  const handleDeliver = async (orderId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/orders/${orderId}/deliver`, {
        method: 'PUT',
        credentials: 'include'
      });
      if (res.ok) {
        toast.success("Marked as Delivered");
        fetchAllOrders(); 
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen font-serif uppercase tracking-widest text-gray-400">Loading Admin Panel...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 font-serif min-h-screen bg-gray-50">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 border-b border-gray-200 pb-6">
        <h1 className="text-2xl uppercase tracking-[0.2em] text-[#2F4F4F]">
          Order <span className="font-bold">List</span>
        </h1>

        <div className="relative w-full md:w-80">
          <input 
            type="text" 
            placeholder="Search name or ID..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-xs focus:outline-none focus:ring-1 focus:ring-[#2F4F4F] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2 text-gray-400" size={16} />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-4 mb-8 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 text-gray-400 mr-2">
          <Filter size={14} />
          <span className="text-[10px] uppercase font-bold tracking-widest">Filter:</span>
        </div>
        {['All', 'Pending', 'Delivered'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-6 py-2 text-[10px] uppercase font-bold tracking-[0.1em] rounded-full transition-all border ${
              statusFilter === status 
              ? 'bg-[#2F4F4F] text-white border-[#2F4F4F] shadow-md' 
              : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Table Section */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[#2F4F4F] uppercase text-[9px] tracking-[0.15em] border-b border-gray-100">
              <th className="p-5 font-bold">Order ID</th>
              <th className="p-5 font-bold">Customer</th>
              <th className="p-5 font-bold">Total</th>
              <th className="p-5 font-bold">Status</th>
              <th className="p-5 font-bold text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[11px] text-gray-600">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
                  <td className="p-5 font-mono text-gray-400">#{order._id.slice(-6).toUpperCase()}</td>
                  <td className="p-5">
                    <p className="font-bold text-[#2F4F4F] uppercase tracking-tighter">{order.shippingAddress.fullName}</p>
                    <p className="text-[9px] text-gray-400 italic lowercase">{order.user?.email}</p>
                  </td>
                  <td className="p-5 font-bold text-gray-700">₹{order.totalPrice.toLocaleString()}</td>
                  <td className="p-5">
                    <span className={`px-2 py-1 rounded-full text-[8px] font-black uppercase ${
                      order.isDelivered ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-5 flex justify-center gap-3">
                    <button 
                      onClick={() => { setSelectedOrder(order); setShowModal(true); }}
                      className="p-2 text-gray-400 hover:text-[#2F4F4F] hover:bg-gray-100 rounded-lg transition-all"
                    >
                      <Eye size={16} />
                    </button>

                    {!order.isDelivered && (
                      <button 
                        onClick={() => handleDeliver(order._id)}
                        className="bg-[#2F4F4F] text-white px-4 py-1.5 rounded-lg text-[9px] uppercase font-bold tracking-widest hover:bg-[#1a2e2e] shadow-sm"
                      >
                        Deliver
                      </button>
                    )}

                    <button 
                      onClick={() => handleDeleteOrder(order._id)}
                      className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-16 text-center text-gray-300 uppercase tracking-[0.2em] text-xs">
                  No {statusFilter !== 'All' ? statusFilter : ''} orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && selectedOrder && (
        <OrderDetailsModal 
          order={selectedOrder} 
          onClose={() => { setShowModal(false); setSelectedOrder(null); }} 
        />
      )}
    </div>
  );
};

export default AdminDashboard;