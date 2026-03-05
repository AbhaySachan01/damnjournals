import Product from '../models/Product.js';

// @desc    Get all products (with optional category filter)
// @route   GET /api/products
export const getProducts = async (req, res) => {
  try {
    const { category, isBestseller, featured, limitedEdition } = req.query;
    let filter = {};

    if (category) filter.category = category;
    
    // Naming standardized to Capital S
   if (isBestseller) filter.isBestseller = isBestseller === 'true';

    if (featured) filter.featured = featured === 'true';
    if (limitedEdition) filter.limitedEdition = limitedEdition === 'true';

    console.log("Applying DB Filter:", filter);

    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get single product by manual ID
// @route   GET /api/products/:id
export const getProductById = async (req, res) => {
  try {
    // Note: Humne schema mein 'id' rakha hai, isliye findOne use kar rahe hain
    const product = await Product.findOne({ id: req.params.id });

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product nahi mila' });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete a product (Admin only)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  // Yahan req.params.id wahi hona chahiye jo route mein define kiya hai
  const product = await Product.findById(req.params.id); 

  if (product) {
    await product.deleteOne();
    res.json({ message: 'Product removed' });
  } else {
    res.status(404).json({ message: 'Product not found' }); // <--- Aapko yahi mil raha hai
  }
};

// @desc    Create a product (Admin only)
// @route   POST /api/products
export const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body); 
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res) => {
  try {
    // 1. findByIdAndUpdate use karo kyunki frontend se MongoDB _id aa rahi hai
    // 2. req.body ko seedha pass karo taaki saare fields (images, tagline, etc.) update ho jaye
    // 3. { new: true } se updated data wapas milta hai
    // 4. { runValidators: true } se schema rules check hote hain
    
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );

    if (updatedProduct) {
      res.json(updatedProduct);
    } else {
      // Agar manual 'id' SKU se search karna hai tabhi purana logic lagao
      // Par recommended findById hi hai
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    // Cloudinary automatically 'path' mein URL save karta hai
    const urls = req.files.map(file => file.path);

    res.status(200).json({
      success: true,
      urls: urls,
      message: "Images uploaded successfully to Cloudinary"
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message || "Upload failed" 
    });
  }
};