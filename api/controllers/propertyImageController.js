const { validationResult } = require('express-validator');
const propertyImageService = require('../services/propertyImageService');

// Add Image to Property
exports.addPropertyImage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { image_url, property_id } = req.body;

  try {
    const image = await propertyImageService.addImage(image_url, property_id);
    res.status(201).json({ message: 'Image added successfully', image });
  } catch (error) {
    res.status(400).json({ message: 'Image addition failed', error: error.message });
  }
};

// Get Images for Property
exports.getPropertyImages = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const images = await propertyImageService.getImagesByProperty(propertyId);
    res.status(200).json(images);
  } catch (error) {
    res.status(400).json({ message: 'Error retrieving images', error: error.message });
  }
};

// Delete Image
exports.deletePropertyImage = async (req, res) => {
  const { imageId } = req.params;

  try {
    await propertyImageService.deleteImage(imageId);
    res.status(200).json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Image deletion failed', error: error.message });
  }
};
