// services/transactionService.js
import http from "../http-common";
import handleApiError from "../utils/apiErrorHandler";  // Import the reusable error handler

// Create Transaction
const createTransaction = async (transactionData) => {
  try {
    const response = await http.post("/transactions", transactionData);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get Transaction by ID
const getTransactionById = async (transactionId) => {
  try {
    const response = await http.get(`/transactions/${transactionId}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Get All Transactions
const getAllTransactions = async () => {
  try {
    const response = await http.get("/transactions");
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Update Transaction Status
const updateTransactionStatus = async (transactionId, status) => {
  try {
    const response = await http.put(`/transactions/${transactionId}/status`, { status });
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Delete Transaction
const deleteTransaction = async (transactionId) => {
  try {
    const response = await http.delete(`/transactions/${transactionId}`);
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

// Export the service methods
const TransactionService = {
  createTransaction,
  getTransactionById,
  getAllTransactions,
  updateTransactionStatus,
  deleteTransaction,
};

export default TransactionService;
