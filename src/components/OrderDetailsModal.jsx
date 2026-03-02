import React from 'react';
import { X, MapPin, Truck, CheckCircle,CreditCard } from 'lucide-react';

const OrderDetailsModal = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl relative animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#2F4F4F] uppercase tracking-widest">Order Summary</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition"><X size={20} /></button>
        </div>

        <div className="p-8">
          {/* Status Tracker */}
          <div className="flex justify-between mb-10 relative">
             <div className="flex flex-col items-center z-10">
                <div className="bg-[#2F4F4F] text-white p-2 rounded-full mb-2"><CheckCircle size={16}/></div>
                <p className="text-[10px] uppercase font-bold text-gray-500">Placed</p>
             </div>
             <div className="flex flex-col items-center z-10">
                <div className={`p-2 rounded-full mb-2 ${order.isPaid ? 'bg-[#2F4F4F] text-white' : 'bg-gray-200 text-gray-400'}`}><CreditCard size={16}/></div>
                <p className="text-[10px] uppercase font-bold text-gray-500">Paid</p>
             </div>
             <div className="flex flex-col items-center z-10">
                <div className={`p-2 rounded-full mb-2 ${order.isDelivered ? 'bg-[#2F4F4F] text-white' : 'bg-gray-200 text-gray-400'}`}><Truck size={16}/></div>
                <p className="text-[10px] uppercase font-bold text-gray-500">Delivered</p>
             </div>
             <div className="absolute top-4 left-0 right-0 h-[2px] bg-gray-100 -z-0"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Items List */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 border-b pb-2">Items Ordered</h4>
              <div className="space-y-4">
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded shadow-sm" />
                    <div>
                      <p className="text-sm font-bold text-[#2F4F4F] truncate w-32">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.quantity} x ₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div>
              <h4 className="text-xs font-bold text-gray-400 uppercase mb-4 border-b pb-2">Delivery Address</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-bold text-[#2F4F4F] mb-1">{order.shippingAddress.fullName}</p>
                <div className="flex gap-2 text-xs text-gray-500 leading-relaxed">
                  <MapPin size={14} className="flex-shrink-0 text-[#DAA520]" />
                  <span>
                    {order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2 && order.shippingAddress.addressLine2 + ','} <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.postalCode} <br />
                    <span className="font-bold text-gray-700 mt-2 block">Phone: {order.shippingAddress.phone}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Footer */}
          <div className="mt-10 pt-6 border-t flex justify-between items-center">
            <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Grand Total Paid</span>
            <span className="text-2xl font-bold text-[#2F4F4F]">₹{order.totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;