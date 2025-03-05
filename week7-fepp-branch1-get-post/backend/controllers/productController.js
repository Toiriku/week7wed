// controllers/productController.js

const Product = require('../models/productModel');  // Import Product model

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { title, category, description, price, stockQuantity, supplier } = req.body;

    // Validate input data
    if (!title || !category || !description || !price || !stockQuantity || !supplier) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create and save new product
    const newProduct = new Product({
      title,
      category,
      description,
      price,
      stockQuantity,
      supplier,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product created successfully", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Error creating product", error: err.message });
  }
};

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

// Get a single product by its ID
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};

// Update a product by its ID
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { title, category, description, price, stockQuantity, supplier } = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { title, category, description, price, stockQuantity, supplier },
      { new: true } // Return the updated product
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

// Delete a product by its ID
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};

// Export all controller functions
module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
