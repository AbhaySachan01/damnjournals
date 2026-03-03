import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AdminProductModal from '../components/AdminProductModal';
import { Star, TrendingUp, Edit, Trash2, X, Save, Plus, Loader2 } from 'lucide-react';



// --- MAIN PAGE COMPONENT ---
const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleSaveProduct = async (formData) => {
    const method = selectedProduct ? 'PUT' : 'POST';
    const url = selectedProduct 
      ? `${API_BASE_URL}/api/products/${selectedProduct._id}`
      : `${API_BASE_URL}/api/products`;

    try {
      const res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        // --- YE LINE SABSE ZAROORI HAI ---
        credentials: 'include' 
      });
      
      if (res.ok) {
        toast.success(selectedProduct ? "Product Updated!" : "New Product Added!");
        setIsModalOpen(false);
        fetchProducts();
      } else {
        const errorData = await res.json();
        toast.error(errorData.message || "Something went wrong");
      }
    } catch (err) {
      toast.error("Connection Error");
    }
  };

  // toggleFlag function ko bhi update karein
  const toggleFlag = async (mongoId, field, currentValue) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/${mongoId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [field]: !currentValue }),
        credentials: 'include' // <--- Isme bhi add karein
      });
      if (res.ok) {
        toast.success("Status Updated");
        fetchProducts();
      }
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const deleteHandler = async (mongoId) => {
    if (window.confirm("Are you sure you want to delete this legacy item?")) {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products/${mongoId}`, {
          method: 'DELETE',
          // --- YE LINE ADD KAREIN ---
          credentials: 'include' 
        });

        if (res.ok) {
          toast.success("Product Deleted Successfully");
          fetchProducts(); // List refresh karne ke liye
        } else {
          const errorData = await res.json();
          toast.error(errorData.message || "Delete failed");
        }
      } catch (err) {
        toast.error("Network error while deleting");
      }
    }
  };


  return (
    <div className="p-4 md:p-10 font-serif bg-[#FFFAF0] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          <div>
            <h2 className="text-3xl uppercase tracking-[0.2em] text-[#2F4F4F]">Inventory</h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Found {products.length} handcrafted items</p>
          </div>
          
          <button 
            onClick={() => { setSelectedProduct(null); setIsModalOpen(true); }}
            className="flex items-center gap-2 bg-[#2F4F4F] text-white px-8 py-3 uppercase text-[10px] tracking-[0.2em] font-bold hover:bg-black transition-all shadow-lg"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>
        
        <div className="bg-white shadow-xl rounded-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#2F4F4F] text-white text-[10px] uppercase tracking-[0.2em]">
                  <th className="p-5">Product Details</th>
                  <th className="p-5">Category</th>
                  <th className="p-5">Price</th>
                  <th className="p-5 text-center">Featured</th>
                  <th className="p-5 text-center">Best Seller</th>
                  <th className="p-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                {loading ? (
                  <tr><td colSpan="6" className="p-10 text-center"><Loader2 className="animate-spin mx-auto text-gray-300" /></td></tr>
                ) : (
                  products.map((p) => (
                    <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="p-5">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#2F4F4F] text-sm">{p.name}</span>
                          <span className="text-[9px] text-gray-400 mt-1 uppercase tracking-tighter">SKU/ID: {p.id}</span>
                        </div>
                      </td>
                      <td className="p-5">
                        <span className="bg-gray-100 px-2 py-1 text-[9px] uppercase tracking-widest text-gray-600 rounded-full">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-5 font-bold text-[#DAA520]">₹{p.price}</td>
                      
                      <td className="p-5 text-center">
                        <button onClick={() => toggleFlag(p._id, 'featured', p.featured)}>
                          <Star size={20} className={p.featured ? "text-yellow-500 fill-yellow-500" : "text-gray-200"} />
                        </button>
                      </td>

                      <td className="p-5 text-center">
                        <button onClick={() => toggleFlag(p._id, 'isBestseller', p.isBestseller)}>
                          <TrendingUp size={20} className={p.isBestseller ? "text-blue-500" : "text-gray-200"} />
                        </button>
                      </td>

                      <td className="p-5 text-right">
                        <div className="flex justify-end gap-4 text-gray-400">
                          <button onClick={() => { setSelectedProduct(p); setIsModalOpen(true); }} className="hover:text-[#2F4F4F] transition-colors"><Edit size={18} /></button>
                          <button onClick={() => deleteHandler(p._id)} className="hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AdminProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveProduct} editProduct={selectedProduct} />
    </div>
  );
};

export default AdminProducts;