const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController'); 
const propertyValidator = require('../validators/propertyValidator'); 
const { validate } = require('../middlewares/validationMiddleware');
const authToken = require('../middlewares/authToken');  // Import the authToken middleware

// Create Property
router.post(
  '/create',
  authToken,  // Add the authToken middleware here to ensure only authenticated users can create properties
  propertyValidator.validateCreateProperty, 
  validate,
  propertyController.createProperty
);

// Update Property
router.put(
  '/update/:property_id',
  authToken,  // Add the authToken middleware here
  propertyValidator.validateUpdateProperty, 
  validate,
  propertyController.updateProperty
);

// Delete Property
router.delete('/delete/:property_id', 
  authToken,  // Add the authToken middleware here
  propertyValidator.validateDeleteProperty, 
  validate, 
  propertyController.deleteProperty
);

// Get Property by ID
router.get('/get/:property_id',
  authToken,  // Add the authToken middleware here
  propertyValidator.validateGetPropertyById, 
  validate, 
  propertyController.getPropertyById
);

router.get('/properties/user/:user_id',
   propertyController.getPropertiesByUserId);

// Get Approved Properties
router.get('/approved', 
  authToken,  // Add the authToken middleware here
  propertyController.getApprovedProperties
);

// Get Non-Approved Properties
router.get('/non-approved', 
  authToken,  // Add the authToken middleware here
  propertyController.getNonApprovedProperties
);

// Approve Property
router.put(
  '/approve/:property_id',
  authToken,  // Ensure user is authenticated
  propertyController.approveProperty  // Call the controller function for approving property
);


// Get Land Properties
router.get('/land', 
  authToken,  // Ensure user is authenticated
  propertyController.getLandProperties
);

// Get House Properties
router.get('/house', 
  authToken,  // Ensure user is authenticated
  propertyController.getHouseProperties
);

// In propertyRoutes.js
router.get('/location', 
  propertyValidator.validateGetPropertiesByLocation, 
  propertyController.getPropertiesByLocation);

  // Route for house properties
router.get('/location/house',
  propertyValidator.validateGetPropertiesByLocation,
    propertyController.getHousePropertiesByLocation);

// Route for land properties
router.get('/location/land',
  propertyValidator.validateGetPropertiesByLocation, 
   propertyController.getLandPropertiesByLocation);



module.exports = router;
