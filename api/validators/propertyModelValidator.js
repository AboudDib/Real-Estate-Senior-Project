const { body, param } = require('express-validator');

exports.createPropertyModelValidator = [
  body('property_id')
    .isInt({ min: 1 })
    .withMessage('Property ID must be a positive integer'),
  body('model_url')
    .isURL()
    .withMessage('Model URL must be a valid URL'),
  body('format')
    .isIn(['glb', 'gltf', 'obj', 'fbx', 'stl'])
    .withMessage('Format must be one of the following: glb, gltf, obj, fbx, stl'),
];

exports.propertyModelIdValidator = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Property Model ID must be a positive integer'),
];
