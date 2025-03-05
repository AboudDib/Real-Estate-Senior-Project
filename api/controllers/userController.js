const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const userService = require('../services/userService'); // Import userService

// Authenticate User (Login)
exports.authenticateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await userService.authenticateUser(email, password); // Delegate to service

    // Generate a JWT token
    console.log( process.env.JWT_SECRET)
    const token = jwt.sign({ userId: user.user_id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
      message: 'Authentication successful',
      token: token, // Send the token to the client
    });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: error.message });
  }
};

// Register User
exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { first_name, last_name, email, password, phone_number } = req.body;
    const user = await userService.registerUser(first_name, last_name, email, password, phone_number);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'User creation failed', error: error.message });
  }
};

// Update User
exports.updateUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { userId } = req.params;
    const { first_name, last_name, email, password, phone_number } = req.body;
    const user = await userService.updateUser(userId, first_name, last_name, email, password, phone_number); // Delegate to service
    res.status(200).json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'User update failed', error: error.message });
  }
};

// Delete User
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await userService.deleteUser(userId); // Delegate to service
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'User deletion failed', error: error.message });
  }
};

// Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userService.getUserById(userId); // Delegate to service
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: 'User not found', error: error.message });
  }
};
