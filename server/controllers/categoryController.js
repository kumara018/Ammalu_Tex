const Category = require('../models/category');

// Get all categories
async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Search categories
async function searchCategories(req, res) {
  const searchInput = req.query.search;
  try {
    const categories = await Category.find({ name: { $regex: searchInput, $options: 'i' } });
    res.json(categories);
  } catch (error) {
    console.error('Error searching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Add a new category
async function addCategory(req, res) {
  const { name, image, description } = req.body;
  try {
    const newCategory = await Category.create({ name, image, description });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error adding a new category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Edit a category
async function editCategory(req, res) {
  const categoryId = req.params.id;
  const { name, image, description } = req.body;
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, image, description },
      { new: true }
    );
    res.json(updatedCategory);
  } catch (error) {
    console.error('Error editing category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Delete a category
async function deleteCategory(req, res) {
  const categoryId = req.params.id;
  try {
    await Category.findByIdAndRemove(categoryId);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  getAllCategories,
  searchCategories,
  addCategory,
  editCategory,
  deleteCategory,
};
