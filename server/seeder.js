import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';
import { keychains } from './data/keychains.js';
import { journals } from './data/products.js';
import { limitedEditions } from './data/limitedEditions.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // 1. Purana data delete karein
    await Product.deleteMany(); 
    console.log('Data Destroyed! 🗑️');

    // 2. Teeno files ke data ko ek array mein merge karein
    const allProducts = [...journals, ...keychains, ...limitedEditions];

    // 3. Merge kiye huye data ko insert karein
    await Product.insertMany(allProducts);
    console.log(`${allProducts.length} Products Imported Successfully! 🚀`);
    
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();