import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import cookieParser from 'cookie-parser'; // 1. IMPORT KAREIN
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import addressRoutes from './routes/addressRoutes.js'
import productRoutes from './routes/productRoutes.js';


connectDB();

const app = express();
app.set('trust proxy', 1);
const allowedOrigins = [
  'http://localhost:5173',
  'https://damnjournals.vercel.app',
  'https://damnjournals.shop',
  'https://damnjournals.com',
  'https://www.damnjournals.com',
  
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json()); 
app.use(cookieParser()); // 3. MIDDLEWARE ADD KAREIN

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes); 
app.use('/api/address',addressRoutes)
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
export default app;