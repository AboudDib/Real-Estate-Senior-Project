const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const transactionValidator = require('../validators/transactionValidator'); // Ensure correct import
const { validate } = require('../middlewares/validationMiddleware'); // Ensure validation middleware

// Transaction Routes with validation
router.post(
  '/',
  transactionValidator.createTransactionValidator,  // Apply validation for create route
  validate,  // Run validation middleware
  transactionController.createTransaction
);

router.get('/:transaction_id', transactionController.getTransactionById);

router.get('/', transactionController.getAllTransactions);

router.put(
  '/:transaction_id/status',
  transactionValidator.updateTransactionStatusValidator,  // Apply validation for status update route
  validate,  // Run validation middleware
  transactionController.updateTransactionStatus
);

router.delete('/:transaction_id', transactionController.deleteTransaction);

module.exports = router;
