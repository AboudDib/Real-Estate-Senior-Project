const express = require('express');
const router = express.Router();
const propertyImageController = require('../controllers/propertyImageController');
const { validateAddImage, validateGetImagesByProperty, validateDeleteImage } = require('../validators/propertyImageValidator');

// Route to add an image to a property
router.post('/add', validateAddImage, propertyImageController.addPropertyImage);

// Route to get images for a property
router.get('/property/:propertyId', validateGetImagesByProperty, propertyImageController.getPropertyImages);

// Route to delete an image
router.delete('/:imageId', validateDeleteImage, propertyImageController.deletePropertyImage);

module.exports = router;
