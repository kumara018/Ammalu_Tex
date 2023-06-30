// Import the Product model
const Product = require('../models/product');

// Controller method to fetch all products
exports.getAllProducts = (req, res) => {
  Product.find()
    .then(products => {
      res.json(products);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    });
};
