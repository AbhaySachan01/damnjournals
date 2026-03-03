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
    const product = await Product.findOne({ id: req.params.id });

    if (product) {
      // Jo fields body mein aayenge unhe update karo, baaki purane rehne do
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.description = req.body.description || product.description;
      product.category = req.body.category || product.category;
      product.featured = req.body.featured !== undefined ? req.body.featured : product.featured;
      product.isBestSeller = req.body.isBestSeller !== undefined ? req.body.isBestSeller : product.isBestSeller;
      product.limitedEdition = req.body.limitedEdition !== undefined ? req.body.limitedEdition : product.limitedEdition;
      product.countInStock = req.body.countInStock || product.countInStock;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};