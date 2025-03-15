const { body, param } = require('express-validator');

// Validator for creating a property
exports.validateCreateProperty = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string'),

  body('description')
    .notEmpty().withMessage('Description is required')
    .isString().withMessage('Description must be a string'),

  body('city')
    .notEmpty().withMessage('City is required')
    .isString().withMessage('City must be a string'),

  body('price')
    .notEmpty().withMessage('Price is required')
    .isDecimal().withMessage('Price must be a valid number'),

  body('property_type')
    .notEmpty().withMessage('Property type is required')
    .isIn(['house', 'land']).withMessage('Property type must be one of house or land'), // Removed apartment type

  body('user_id')
    .notEmpty().withMessage('User ID is required')
    .isInt().withMessage('User ID must be an integer'),

  // Conditional validation for house properties
  body('square_meter')
    .if(body('property_type').equals('house'))
    .notEmpty().withMessage('Square meter is required for house properties')
    .isInt().withMessage('Square meter must be a valid integer'),

  body('isForRent')
    .if(body('property_type').equals('house'))
    .isBoolean().withMessage('For Rent flag must be a boolean')
    .optional() // Allows isForRent to be optional, but it must be boolean if provided
];

// Validator for getting a property by ID
exports.validateGetPropertyById = [
  param('property_id')
    .notEmpty().withMessage('Property ID is required')
    .isInt().withMessage('Property ID must be an integer'),
];

// Validator for updating a property
exports.validateUpdateProperty = [
  param('property_id')
    .notEmpty().withMessage('Property ID is required')
    .isInt().withMessage('Property ID must be an integer'),

  body('name')
    .optional()
    .isString().withMessage('Name must be a string'),

  body('description')
    .optional()
    .isString().withMessage('Description must be a string'),

  body('city')
    .optional()
    .isString().withMessage('City must be a string'),

  body('price')
    .optional()
    .isDecimal().withMessage('Price must be a valid number'),

  body('property_type')
    .optional()
    .isIn(['house', 'land']).withMessage('Property type must be one of house or land'), // Removed apartment type

  body('user_id')
    .optional()
    .isInt().withMessage('User ID must be an integer'),

  // Conditional validation for house properties
  body('square_meter')
    .if(body('property_type').equals('house'))
    .notEmpty().withMessage('Square meter is required for house properties')
    .isInt().withMessage('Square meter must be a valid integer'),

  body('isForRent')
    .if(body('property_type').equals('house'))
    .isBoolean().withMessage('For Rent flag must be a boolean')
    .optional() // Allows isForRent to be optional, but it must be boolean if provided
];

// Validator for deleting a property
exports.validateDeleteProperty = [
  param('property_id')
    .notEmpty().withMessage('Property ID is required')
    .isInt().withMessage('Property ID must be an integer'),
];

exports.validateGetPropertiesByLocation = [
  body('city')
    .notEmpty().withMessage('City is required')  // Check if city is provided
    .isString().withMessage('City must be a string')  // Ensure it's a string
    .trim()  // Remove leading/trailing spaces
    .isLength({ min: 3 }).withMessage('City must be at least 3 characters long'),  // Minimum length of 3 characters
];