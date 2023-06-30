// Example order routes

const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// GET route to fetch order items
router.get('/', orderController.getOrderItems);

// POST route to add item to the order
router.post('/', orderController.addItemToOrder);

// PUT route to update item in the order
router.put('/:itemId', orderController.updateItemInOrder);

// DELETE route to remove item from the order
router.delete('/:itemId', orderController.removeItemFromOrder);

// POST route to place the order
router.post('/place-order', orderController.placeOrder);

module.exports = router;
