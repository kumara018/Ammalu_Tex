// controllers/paymentController.js

const Payment = require('../models/payment');

// Handle the payment request
exports.processPayment = (req, res) => {
  // Get the payment method from the request body
  const { method } = req.body;

  // Create a new payment document
  const payment = new Payment({
    method: method
    // Add more fields as needed for payment details
  });

  // Save the payment to the database
  payment.save()
    .then(() => {
      res.status(200).json({ message: 'Payment processed successfully' });
    })
    .catch(error => {
      console.error('Error processing payment:', error);
      res.status(500).json({ error: 'Failed to process payment' });
    });
};
