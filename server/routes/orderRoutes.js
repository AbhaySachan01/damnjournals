import express from 'express';
import { addOrderItems, getMyOrders, createRazorpayOrder,verifyPayment,updateOrderToDelivered, assignDeliveryBoy,getAllOrders,deleteOrder } from '../controllers/orderController.js';
import { protect,admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/myorders', protect, getMyOrders);
router.post('/razorpay',protect,createRazorpayOrder);
router.post('/verify', protect, verifyPayment);
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);
router.put('/:id/assign', protect, admin, assignDeliveryBoy);
router.get('/allorders', protect, admin, getAllOrders);
router.delete('/:id', protect, admin, deleteOrder);
export default router;