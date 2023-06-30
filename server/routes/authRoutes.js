// authRoutes.js

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Handle sign in request
router.post('/signin', authController.signIn);

module.exports = router;
