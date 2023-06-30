// routes/paymentRoutes.js

const express = require('express');
const paymentController = require('../controllers/paymentController');

const router = express.Router();

// Process the payment
router.post('/process-payment', paymentController.processPayment);

module.exports = router;
