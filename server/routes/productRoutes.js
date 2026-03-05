import express from 'express';
import { 
  getProducts, 
  getProductById, 
  deleteProduct, 
  createProduct,
  updateProduct,
  uploadImages
} from '../controllers/productController.js';
import { upload } from '../utils/cloudinary.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes (Koi bhi dekh sakta hai)
router.get('/', getProducts);
router.get('/:id', getProductById);

// Private/Admin Routes (Sirf admin ke liye)
router.post('/', protect, admin, createProduct);
router.delete('/:id', protect, admin, deleteProduct);
router.put('/:id', protect, admin, updateProduct);
router.post('/upload', upload.array('images', 5), uploadImages);
export default router;