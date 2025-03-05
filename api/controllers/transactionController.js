const { validationResult } = require('express-validator');
const transactionService = require('../services/transactionService');

// Create Transaction
exports.createTransaction = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { buyer_user_id, seller_user_id, property_id, price } = req.body;
    // Ensure buyer and seller are not the same user
    if (buyer_user_id === seller_user_id) {
      return res.status(400).json({ message: 'Buyer and seller cannot be the same person' });
    }
    const transaction = await transactionService.createTransaction(buyer_user_id, seller_user_id, property_id, price);
    res.status(201).json({ message: 'Transaction created successfully', transaction });
  } catch (error) {
    res.status(400).json({ message: 'Transaction creation failed', error: error.message });
  }
};

// Get Transaction by ID
exports.getTransactionById = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    const transaction = await transactionService.getTransactionById(transaction_id);
    res.status(200).json({ transaction });
  } catch (error) {
    res.status(400).json({ message: 'Transaction not found', error: error.message });
  }
};

// Get All Transactions
exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await transactionService.getAllTransactions();
    res.status(200).json({ transactions });
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch transactions', error: error.message });
  }
};

// Update Transaction Status
exports.updateTransactionStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { transaction_id } = req.params;
    const { status } = req.body;
    const transaction = await transactionService.updateTransactionStatus(transaction_id, status);
    res.status(200).json({ message: 'Transaction status updated successfully', transaction });
  } catch (error) {
    res.status(400).json({ message: 'Transaction update failed', error: error.message });
  }
};

// Delete Transaction
exports.deleteTransaction = async (req, res) => {
  try {
    const { transaction_id } = req.params;
    await transactionService.deleteTransaction(transaction_id);
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Transaction deletion failed', error: error.message });
  }
};
