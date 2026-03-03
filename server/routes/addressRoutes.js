import express from 'express';
import { addAddress, getMyAddresses,removeAddress } from '../controllers/addressController.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

router.post('/', protect, addAddress);
router.get('/getaddresses', protect, getMyAddresses);
router.delete('/:id', protect, removeAddress);
export default router;