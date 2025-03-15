const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const transactionValidator = require('../validators/transactionValidator');
const { validate } = require('../middlewares/validationMiddleware');
const authToken = require('../middlewares/authToken');  // Import authToken middleware

// Transaction Routes with validation and authentication
router.post(
  '/',
  authToken,  // Ensure the user is authenticated
  transactionValidator.createTransactionValidator,  // Apply validation for create route
  validate,  // Run validation middleware
  transactionController.createTransaction
);

router.get('/:transaction_id', 
  authToken,  // Ensure the user is authenticated
  transactionController.getTransactionById
);

router.get('/', 
  authToken,  // Ensure the user is authenticated
  transactionController.getAllTransactions
);

router.put(
  '/:transaction_id/status',
  authToken,  // Ensure the user is authenticated
  transactionValidator.updateTransactionStatusValidator,  // Apply validation for status update route
  validate,  // Run validation middleware
  transactionController.updateTransactionStatus
);

router.delete('/:transaction_id', 
  authToken,  // Ensure the user is authenticated
  transactionController.deleteTransaction
);

module.exports = router;
