const { body, param } = require('express-validator');

// Validator for creating a transaction
exports.createTransactionValidator = [
  body('buyer_user_id').isInt().withMessage('Buyer user ID must be an integer'),
  body('seller_user_id').isInt().withMessage('Seller user ID must be an integer'),
  body('property_id').isInt().withMessage('Property ID must be an integer'),
  body('price').isDecimal().withMessage('Price must be a decimal number'),
];

// Validator for updating transaction status
exports.updateTransactionStatusValidator = [
  param('transaction_id').isInt().withMessage('Transaction ID must be an integer'),
  body('status').isIn(['pending', 'completed']).withMessage('Status must be either "pending" or "completed"'),
];
