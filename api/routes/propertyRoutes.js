const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController'); 
const propertyValidator = require('../validators/propertyValidator'); 
const { validate } = require('../middlewares/validationMiddleware');

// Create Property
router.post(
  '/create',
  propertyValidator.validateCreateProperty,  // Validator for property creation
  validate,  // Custom validation middleware to handle validation errors
  propertyController.createProperty  // Controller to handle the actual creation logic
);

// Update Property
router.put(
  '/update/:property_id',
  propertyValidator.validateUpdateProperty,  // Validator for property update
  validate,  // Custom validation middleware to handle validation errors
  propertyController.updateProperty  // Controller to handle the actual update logic
);

// Delete Property
router.delete('/delete/:property_id', 
  propertyValidator.validateDeleteProperty,  // Validator for deleting property
  validate,  // Custom validation middleware to handle validation errors
  propertyController.deleteProperty  // Controller to delete the property
);

// Get Property by ID
router.get('/get/:property_id',
  propertyValidator.validateGetPropertyById,  // Validator for fetching property by ID
  validate,  // Custom validation middleware to handle validation errors
  propertyController.getPropertyById  // Controller to fetch property by ID
);

// Get Approved Properties
router.get('/approved', propertyController.getApprovedProperties);

// Get Non-Approved Properties
router.get('/non-approved', propertyController.getNonApprovedProperties);

module.exports = router;
