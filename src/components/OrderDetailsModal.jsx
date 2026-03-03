import React from 'react';
import { X, MapPin, Truck, CheckCircle, CreditCard } from 'lucide-react';

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm shadow-2xl relative animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex justify-between items-center z-20">
          <div>
            <h3 className="text-xl font-light text-[#2F4F4F] uppercase tracking-[0.3em]">Order <span className="font-bold">Summary</span></h3>
            <p className="text-[9px] text-gray-400 font-mono mt-1 uppercase">ID: {order._id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:rotate-90 hover:bg-gray-50 rounded-full transition-all duration-300">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="p-8">
          {/* Status Tracker */}
          <div className="flex justify-between mb-12 relative px-4">
              <div className="flex flex-col items-center z-10">
                 <div className="bg-[#2F4F4F] text-white p-2 rounded-full mb-2 ring-4 ring-white"><CheckCircle size={14}/></div>
                 <p className="text-[9px] uppercase font-bold text-[#2F4F4F] tracking-tighter">Placed</p>
              </div>
              <div className="flex flex-col items-center z-10">
                 <div className={`p-2 rounded-full mb-2 ring-4 ring-white ${order.isPaid ? 'bg-[#2F4F4F] text-white' : 'bg-gray-100 text-gray-300'}`}><CreditCard size={14}/></div>
                 <p className="text-[9px] uppercase font-bold text-gray-400 tracking-tighter">Paid</p>
              </div>
              <div className="flex flex-col items-center z-10">
                 <div className={`p-2 rounded-full mb-2 ring-4 ring-white ${order.isDelivered ? 'bg-[#2F4F4F] text-white' : 'bg-gray-100 text-gray-300'}`}><Truck size={14}/></div>
                 <p className="text-[9px] uppercase font-bold text-gray-400 tracking-tighter">Delivered</p>
              </div>
              <div className="absolute top-4 left-0 right-0 h-[1px] bg-gray-100 -z-0"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Items List */}
            <div>
              <h4 className="text-[10px] font-bold text-gray-300 uppercase mb-5 tracking-widest border-b border-gray-50 pb-2">Items Ordered</h4>
              <div className="space-y-5">
                {order.orderItems.map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-center group">
                    <div className="relative overflow-hidden w-14 h-20 bg-gray-50 rounded-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[11px] font-bold text-[#2F4F4F] uppercase tracking-tight leading-tight">{item.name}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{item.quantity} Unit(s) <span className="mx-1">×</span> ₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="flex flex-col">
              <h4 className="text-[10px] font-bold text-gray-300 uppercase mb-5 tracking-widest border-b border-gray-50 pb-2">Delivery Details</h4>
              <div className="bg-gray-50/50 p-5 border border-gray-100 rounded-sm flex-1">
                <p className="text-xs font-bold text-[#2F4F4F] mb-3 uppercase tracking-tighter">{order.shippingAddress.fullName}</p>
                <div className="flex gap-3 text-[11px] text-gray-500 leading-relaxed">
                  <MapPin size={14} className="flex-shrink-0 text-[#DAA520] mt-0.5" />
                  <span>
                    {order.shippingAddress.addressLine1}, {order.shippingAddress.addressLine2 && order.shippingAddress.addressLine2} <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} <br />
                    <span className="text-[#2F4F4F] font-bold">PIN {order.shippingAddress.postalCode}</span>
                    <div className="mt-4 pt-4 border-t border-gray-200/50">
                        <p className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Contact Support</p>
                        <p className="font-bold text-[#2F4F4F]">{order.shippingAddress.phone}</p>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Total Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-end">
            <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-1">Payment Method</p>
                <p className="text-[10px] font-bold text-[#2F4F4F] uppercase">{order.paymentMethod}</p>
            </div>
            <div className="text-right">
                <p className="text-[9px] text-gray-400 uppercase tracking-[0.2em] mb-1">Total Amount</p>
                <span className="text-3xl font-light text-[#2F4F4F]">₹{order.totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsModal;