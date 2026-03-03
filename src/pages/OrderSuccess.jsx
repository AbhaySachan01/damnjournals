import {Link} from 'react-router-dom'

const OrderSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFFAF0] font-serif p-4">
      <div className="bg-white p-12 shadow-2xl rounded-sm text-center max-w-lg border border-gray-100">
        <div className="text-7xl mb-6">✨</div>
        <h2 className="text-3xl font-bold text-[#2F4F4F] mb-4 uppercase tracking-[0.2em]">Order Confirmed</h2>
        <p className="text-gray-500 italic mb-8">
          Thank you for being part of the club. Aapka journal jald hi aapke paas hoga!
        </p>
        <Link to="/my-orders" className="block w-full bg-[#2F4F4F] text-white py-4 mb-4 font-bold uppercase tracking-widest text-xs hover:bg-black transition">
          View My Orders
        </Link>
        <Link to="/" className="text-[#DAA520] font-bold underline text-xs uppercase tracking-widest">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;