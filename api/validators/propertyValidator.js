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
    .isIn(['house', 'apartment', 'land']).withMessage('Property type must be one of house, apartment, or land'),

  body('user_id')
    .notEmpty().withMessage('User ID is required')
    .isInt().withMessage('User ID must be an integer'),
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
    .isIn(['house', 'apartment', 'land']).withMessage('Property type must be one of house, apartment, or land'),
  
  body('user_id')
    .optional()
    .isInt().withMessage('User ID must be an integer'),
];

// Validator for deleting a property
exports.validateDeleteProperty = [
  param('property_id')
    .notEmpty().withMessage('Property ID is required')
    .isInt().withMessage('Property ID must be an integer'),
];
