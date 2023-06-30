// models/payment.js

const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  method: String,
  // Add more fields as needed for payment details
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
