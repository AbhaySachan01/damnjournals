import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import {toast} from 'react-hot-toast'
const AdminProductModal = ({ isOpen, onClose, onSave, editProduct }) => {
  const initialState = {
    id: '', 
    name: '', 
    category: 'journals', 
    price: '', 
    description: '', 
    tagline: '', 
    images: [''], // Array for multiple image URLs
    pages: '', 
    size: '', 
    material: '', 
    pageQuality: '',
    featured: false, 
    isBestseller: false, 
    limitedEdition: false
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editProduct) setFormData({ ...initialState, ...editProduct });
    else setFormData(initialState);
  }, [editProduct, isOpen]);

  const handleFileUpload = async (e) => {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;

  const uploadToast = toast.loading("Uploading images...");
  
  // Iska naam badal do taaki confusion na ho (State vs FormData)
  const dataForServer = new FormData(); 
  files.forEach(file => dataForServer.append('images', file));

  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const res = await fetch(`${API_BASE_URL}/api/products/upload`, {
      method: 'POST',
      body: dataForServer,
      credentials: 'include'
    });

    const data = await res.json();

    if (res.ok) {
      setFormData(prevData => ({ 
        ...prevData, 
        images: [...prevData.images.filter(img => img !== ''), ...data.urls] 
      }));
      
      toast.success("Images Uploaded!", { id: uploadToast });
    } else {
      toast.error(data.message || "Upload failed", { id: uploadToast });
    }
  } catch (err) {
    console.error(err);
    toast.error("Network Error", { id: uploadToast });
  }
};

  // Handle Image URL changes
  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages.length ? newImages : [''] });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-md shadow-2xl p-6 md:p-10 font-serif">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h2 className="text-2xl uppercase tracking-widest font-bold text-[#2F4F4F]">
              {editProduct ? 'Edit Legacy Item' : 'Create New Masterpiece'}
            </h2>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Fill in the handcrafted details below</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-black transition-colors"><X size={28} /></button>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-8">
          
          {/* Basic Info Group */}
          <section className="space-y-4">
            <h3 className="text-xs uppercase font-bold text-[#DAA520] border-l-2 border-[#DAA520] pl-2">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Manual ID / SKU</label>
                <input type="text" className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-[#2F4F4F]" 
                  value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} required />
              </div>
              <div className="md:col-span-2">
                <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Product Name</label>
                <input type="text" className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-[#2F4F4F]" 
                  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
              </div>
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Tagline (Short Catchy Phrase)</label>
              <input type="text" placeholder="e.g. Elegance in every stroke" className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-[#2F4F4F]" 
                value={formData.tagline} onChange={(e) => setFormData({...formData, tagline: e.target.value})} />
            </div>
          </section>

          {/* Pricing & Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Category</label>
              <select className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none bg-white" 
                value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="journals">Journals</option>
                <option value="Keychains">Keychains</option>
                <option value="limited-editions">Limited Edition</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Price (INR ₹)</label>
              <input type="number" className="w-full border-b border-gray-200 py-2 text-sm focus:outline-none focus:border-[#2F4F4F]" 
                value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
            </div>
          </div>

          {/* Dynamic Specifications */}
          <section className="bg-gray-50 p-6 rounded-sm space-y-4">
            <h3 className="text-xs uppercase font-bold text-[#2F4F4F]">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">
                    {formData.category === 'Keychains' ? 'Material Used' : 'Page Quality (GSM)'}
                  </label>
                  <input type="text" className="w-full border-b border-gray-200 bg-transparent py-2 text-sm focus:outline-none" 
                    value={formData.category === 'Keychains' ? formData.material : formData.pageQuality} 
                    onChange={(e) => setFormData(formData.category === 'Keychains' ? {...formData, material: e.target.value} : {...formData, pageQuality: e.target.value})} />
               </div>
               <div>
                  <label className="text-[10px] uppercase font-bold text-gray-400 block mb-1">Dimensions / Sheet Count</label>
                  <input type="text" placeholder="e.g. 5x7 inches or 100 Sheets" className="w-full border-b border-gray-200 bg-transparent py-2 text-sm focus:outline-none" 
                    value={formData.size} onChange={(e) => setFormData({...formData, size: e.target.value})} />
               </div>
            </div>
          </section>

          {/* Image Section: Upload + Manual URLs */}
<section className="space-y-4">
  <div className="flex justify-between items-center">
    <h3 className="text-xs uppercase font-bold text-[#2F4F4F]">Product Images</h3>
    <div className="flex gap-4">
      {/* Hidden File Input */}
      <label className="cursor-pointer text-[#DAA520] text-[10px] font-bold uppercase flex items-center gap-1 hover:underline">
        <Plus size={14} /> Upload from Device
        <input type="file" multiple className="hidden" onChange={handleFileUpload} accept="image/*" />
      </label>
      
      <button type="button" onClick={addImageField} className="text-[#2F4F4F] text-[10px] font-bold uppercase flex items-center gap-1 hover:underline">
        <ImageIcon size={14} /> Add Manual URL
      </button>
    </div>
  </div>

  {/* Image List / Preview */}
  <div className="grid grid-cols-1 gap-3">
    {formData.images.map((url, index) => (
      <div key={index} className="flex gap-2 items-center">
        {/* Preview Thumbnail (Chota sa image dikhega) */}
        {url && (
          <img src={url} alt="preview" className="w-10 h-10 object-cover rounded-sm border border-gray-100" />
        )}
        
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Image URL" 
            className="w-full border border-gray-100 pl-3 pr-2 py-2 text-xs focus:outline-none focus:border-[#2F4F4F]" 
            value={url} 
            onChange={(e) => handleImageChange(index, e.target.value)} 
          />
        </div>

        {formData.images.length > 1 && (
          <button type="button" onClick={() => removeImageField(index)} className="text-red-300 hover:text-red-500 transition-colors">
            <Trash2 size={18} />
          </button>
        )}
      </div>
    ))}
  </div>
</section>

          {/* Description */}
          <div>
            <label className="text-[10px] uppercase font-bold text-gray-400 block mb-2">Detailed Story / Description</label>
            <textarea className="w-full border border-gray-100 p-4 text-sm focus:outline-none focus:border-[#2F4F4F] h-32 resize-none leading-relaxed" 
              placeholder="Describe the craftsmanship..."
              value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
          </div>

          {/* Status Toggles */}
          <div className="flex flex-wrap gap-8 py-6 border-y border-gray-50">
            {['featured', 'isBestseller', 'limitedEdition'].map((flag) => (
              <label key={flag} className="flex items-center gap-3 text-[11px] uppercase tracking-widest font-bold cursor-pointer hover:text-[#DAA520] transition-colors">
                <div className={`w-4 h-4 border flex items-center justify-center ${formData[flag] ? 'bg-[#2F4F4F] border-[#2F4F4F]' : 'border-gray-300'}`}>
                  {formData[flag] && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <input type="checkbox" className="hidden" checked={formData[flag]} 
                  onChange={(e) => setFormData({...formData, [flag]: e.target.checked})} />
                {flag.replace(/([A-Z])/g, ' $1')}
              </label>
            ))}
          </div>

          {/* Submit */}
          <button type="submit" className="w-full bg-[#2F4F4F] text-white py-5 uppercase tracking-[0.3em] text-xs font-bold hover:bg-black transition-all shadow-xl flex items-center justify-center gap-2">
            <Save size={18} /> {editProduct ? 'Commit Changes' : 'Archive to Inventory'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminProductModal;