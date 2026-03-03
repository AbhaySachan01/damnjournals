import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  category: { type: String, required: true }, 
  price: { type: Number, required: true },
  images: [String],
  description: String,
  tagline: String,
  pages: String,
  size: String,
  
  // Specific Fields
  material: String,       
  pageQuality: String,    
  collection: String,     
  serialNumber: String,   

  // Flags for Filtering (Frontend filters ke liye best hain)
  featured: { type: Boolean, default: false },
  limitedEdition: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false }, // <--- Naya field add ho gaya
  
  countInStock: { type: Number, default: 10 }, 
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
export default Product;