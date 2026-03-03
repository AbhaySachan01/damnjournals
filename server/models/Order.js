import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  orderItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      image: { type: String, required: true },
      price: { type: Number, required: true },
    }
  ],
  shippingAddress: {
    fullName: { type: String, required: true }, 
    addressLine1: { type: String, required: true }, 
    addressLine2: { type: String }, 
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    state: { type: String, required: true },
    phone: { type: String, required: true }
  },
  paymentMethod: { type: String, required: true, default: 'Razorpay' },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  totalPrice: { type: Number, required: true, default: 0.0 },
  
  // --- Status Tracking Fields ---
  isPaid: { type: Boolean, required: true, default: false },
  paidAt: { type: Date },
  
  isDelivered: { type: Boolean, required: true, default: false },
  deliveredAt: { type: Date },
  
  // Naya Field: Current Status (Dropdown ke liye kaam aayega)
  status: { 
    type: String, 
    required: true, 
    default: 'Processing',
    enum: ['Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled']
  },

  // Delivery Boy Assignment (ObjectId ref to User model)
  deliveryBoy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;