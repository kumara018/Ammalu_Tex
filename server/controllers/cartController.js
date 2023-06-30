// cartController.js

const CartItem = require('../models/cartItem');

// Get all cart items
const getCartItems = (req, res) => {
  CartItem.find()
    .then(cartItems => {
      res.json(cartItems);
    })
    .catch(error => {
      console.error('Error fetching cart items:', error);
      res.status(500).json({ error: 'Failed to fetch cart items' });
    });
};

module.exports = {
  getCartItems,
};
