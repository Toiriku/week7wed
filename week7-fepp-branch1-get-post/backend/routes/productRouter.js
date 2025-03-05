const express = require('express');
const router = express.Router();

// Import the controller functions
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require('../controllers/productController');
const requireAuth = require("../middleware/requireAuth");

router.use(requireAuth);


// Define the routes and associate them with controller functions

router.post('/', createProduct);       // POST /products -> createProduct
router.get('/', getProducts);           // GET /products -> getProducts
router.get('/:id', getProductById);   // GET /products/:id -> getProductById
router.put('/:id', updateProduct);    // PUT /products/:id -> updateProduct
router.delete('/:id', deleteProduct); // DELETE /products/:id -> deleteProduct

module.exports = router;
