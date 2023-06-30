/*const express = require('express');
const router = express.Router();
const Product = require('../models/product.model');

router.get('/', (req, res) => {
  Product.find()
    .then(products => {
      res.json(products);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    });
});

module.exports = router;*/


const express = require('express');
const router = express.Router();

// Import the products controller
const productsController = require('../controllers/productsController');

// Route to get all products
router.get('/', productsController.getAllProducts);

module.exports = router;
