import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  
});
if (!process.env.CLOUDINARY_API_KEY) {
    console.error("CRITICAL ERROR: Cloudinary API Key is missing from .env file!");
} else {
    console.log("Cloudinary Configured with Key:", process.env.CLOUDINARY_API_KEY);
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products', // Cloudinary mein folder ka naam
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
  },
});

export const upload = multer({ storage }); 