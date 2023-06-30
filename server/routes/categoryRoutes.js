const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Get all categories
router.get('/', categoryController.getAllCategories);

// Search categories
router.get('/search', categoryController.searchCategories);

// Add a new category
router.post('/', categoryController.addCategory);

// Edit a category
router.put('/:id', categoryController.editCategory);

// Delete a category
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
