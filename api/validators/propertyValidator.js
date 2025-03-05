const { body } = require('express-validator');

// Property validation rules
exports.createPropertyValidator = [
  body('name')
    .isString()
    .withMessage('Property name is required and should be a string.')
    .notEmpty()
    .withMessage('Property name cannot be empty.'),
  body('description')
    .isString()
    .withMessage('Description should be a string.')
    .notEmpty()
    .withMessage('Description cannot be empty.'),
  body('city')
    .isString()
    .withMessage('City is required and should be a string.')
    .notEmpty()
    .withMessage('City cannot be empty.'),
  body('price')
    .isDecimal()
    .withMessage('Price must be a valid decimal.')
    .notEmpty()
    .withMessage('Price is required.'),
  body('property_type')
    .isIn(['house', 'apartment', 'land'])
    .withMessage('Property type must be one of the following: house, apartment, land.')
    .notEmpty()
    .withMessage('Property type is required.'),
];

// Update Property validation rules
exports.updatePropertyValidator = [
  body('name')
    .optional()
    .isString()
    .withMessage('Property name should be a string.')
    .notEmpty()
    .withMessage('Property name cannot be empty.'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description should be a string.')
    .notEmpty()
    .withMessage('Description cannot be empty.'),
  body('city')
    .optional()
    .isString()
    .withMessage('City should be a string.')
    .notEmpty()
    .withMessage('City cannot be empty.'),
  body('price')
    .optional()
    .isDecimal()
    .withMessage('Price must be a valid decimal.')
    .notEmpty()
    .withMessage('Price is required.'),
  body('property_type')
    .optional()
    .isIn(['house', 'apartment', 'land'])
    .withMessage('Property type must be one of the following: house, apartment, land.')
    .notEmpty()
    .withMessage('Property type is required.'),
];
