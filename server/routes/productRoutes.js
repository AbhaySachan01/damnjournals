import express from 'express';
import { 
  getProducts, 
  getProductById, 
  deleteProduct, 
  createProduct,
  updateProduct
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes (Koi bhi dekh sakta hai)
router.get('/', getProducts);
router.get('/:id', getProductById);

// Private/Admin Routes (Sirf admin ke liye)
router.post('/', protect, admin, createProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.put('/:id', protect, admin, updateProduct);
export default router;