const express = require('express');
const router = express.Router();
const { addProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');


router.post('/products', auth, admin, addProduct);
router.delete("/products/:id", auth, admin, deleteProduct);

module.exports = router;