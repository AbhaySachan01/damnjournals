import Order from '../models/Order.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';


// Naya order create karna
export const addOrderItems = async (req, res) => {
  try {
    console.log("Saving order to database...");
    const order = new Order({ ...req.body, user: req.user._id });
    const createdOrder = await order.save();
    console.log("Order saved successfully:", createdOrder._id);
    res.status(201).json(createdOrder);
  } catch (error) {
    console.error("AddOrderItems Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Logged in user ke saare orders get karna
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Razorpay Order Create Function
export const createRazorpayOrder = async (req, res) => {
  // Debugging Logs: Check karo terminal mein kya aa raha hai
  console.log("--- Razorpay Order Initiation ---");
  console.log("KEY_ID from ENV:", process.env.RAZORPAY_KEY_ID); 
  console.log("Amount received:", req.body.amount);

  // Validation: Agar key nahi hai toh turant error do, crash mat hone do
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    console.error("ERROR: Razorpay Keys are missing in .env file!");
    return res.status(500).json({ message: "Payment configuration missing on server" });
  }

  try {
    // Initialize Razorpay inside the function
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(req.body.amount * 100), // Decimal errors se bachne ke liye Math.round
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    console.log("Creating order on Razorpay servers...");
    const order = await razorpay.orders.create(options);
    
    console.log("Razorpay Order Created:", order.id);
    res.status(200).json(order);
  } catch (err) {
    console.error("Razorpay SDK Error:", err);
    res.status(500).json({ message: "Razorpay Order failed", error: err.message });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderItems, 
      shippingAddress, 
      totalPrice 
    } = req.body;

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // Order create karein
      const order = new Order({
        user: req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod: 'Razorpay',
        totalPrice,
        isPaid: true,
        paidAt: Date.now()
      });

      const createdOrder = await order.save(); // Ab Validation pass ho jayega!
      res.status(201).json(createdOrder);
    } else {
      res.status(400).json({ message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// orderController.js mein add karein
export const updateOrderToDelivered = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      order.status = 'Delivered'; // Status update

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// orderController.js snippet
export const assignDeliveryBoy = async (req, res) => {
  const { deliveryBoyId } = req.body;
  const order = await Order.findById(req.params.id);

  if (order) {
    order.deliveryBoy = deliveryBoyId;
    order.status = 'Shipped'; // Automatic status change
    await order.save();
    res.json({ message: 'Delivery Partner Assigned Successfully' });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name'); // User details ke saath
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json({ message: 'Order removed' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};