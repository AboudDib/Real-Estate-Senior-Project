const { Transaction } = require('../models/transaction');
const { Property } = require('../models/property');  // Make sure the path is correct

// Create Transaction
exports.createTransaction = async (buyer_user_id, seller_user_id, property_id, price) => {
  // Fetch the property to verify the owner
  const property = await Property.findByPk(property_id);
  
  if (!property) {
    throw new Error('Property not found');
  }

  // Check if the seller is the property owner
  if (property.user_id !== seller_user_id) {
    throw new Error('Seller is not the owner of the property');
  }

  // Prevent self-purchase
  if (buyer_user_id === seller_user_id) {
    throw new Error('A user cannot buy their own property');
  }

  // Create the transaction
  const transaction = await Transaction.create({
    buyer_user_id,
    seller_user_id,
    property_id,
    price,
    status: 'pending',
  });

  return transaction;
};

// Get Transaction by ID
exports.getTransactionById = async (transaction_id) => {
  const transaction = await Transaction.findByPk(transaction_id);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  return transaction;
};

// Get All Transactions
exports.getAllTransactions = async () => {
  return await Transaction.findAll();
};

// Update Transaction Status
exports.updateTransactionStatus = async (transaction_id, status) => {
  const transaction = await Transaction.findByPk(transaction_id);
  if (!transaction) {
    throw new Error('Transaction not found');
  }

  transaction.status = status;
  await transaction.save();
  return transaction;
};

// Delete Transaction
exports.deleteTransaction = async (transaction_id) => {
  const transaction = await Transaction.findByPk(transaction_id);
  if (!transaction) {
    throw new Error('Transaction not found');
  }

  await transaction.destroy();
};
