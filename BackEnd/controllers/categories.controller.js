const { Categories } = require('../models');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll();
    res.status(200).json({ categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching categories.', error: error.message });
  }
};