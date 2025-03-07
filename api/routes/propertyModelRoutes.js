const express = require('express');
const router = express.Router();
const propertyModelController = require('../controllers/propertyModelController');
const propertyModelValidator = require('../validators/propertyModelValidator');
const { validate } = require('../middlewares/validationMiddleware');

// Create Property Model
router.post('/', propertyModelValidator.createPropertyModelValidator, validate, propertyModelController.createPropertyModel);

// Get Property Model by ID
router.get('/:id', propertyModelController.getPropertyModelById);

// Get Property Models by Property ID
router.get('/property/:property_id', propertyModelController.getPropertyModelsByPropertyId);  // New route for property_id

// Delete Property Model
router.delete('/:id', propertyModelController.deletePropertyModel);

module.exports = router;
