// cartRoutes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Get all cart items
router.get('/', cartController.getCartItems);

module.exports = router;
