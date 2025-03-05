const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController'); // Ensure correct import
const propertyValidator = require('../validators/propertyValidator'); 
const { validate } = require('../middlewares/validationMiddleware');
// Routes for Property
router.post(
  '/create',
  propertyValidator.createPropertyValidator,
  validate,  // Assuming you have a middleware that runs validation results
  propertyController.createProperty
);

router.put(
  '/update/:property_id',
  propertyValidator.updatePropertyValidator,
  validate, 
  propertyController.updateProperty
);

router.delete('/delete/:property_id', propertyController.deleteProperty);

router.get('/get/:property_id', propertyController.getPropertyById);

module.exports = router;
