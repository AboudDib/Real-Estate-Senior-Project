const { User } = require('../models/user');
const { Op } = require("sequelize");
const bcrypt = require('bcryptjs');

// Authenticate User (Login)
exports.authenticateUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }

  return user; // Return user after successful authentication
};

// Register User
exports.registerUser = async (first_name, last_name, email, password, phone_number) => {
  // Check if user already exists by email or phone number
  const existingUser = await User.findOne({ 
      where: { 
          [Op.or]: [{ email }, { phone_number }] 
      } 
  });

  if (existingUser) {
      if (existingUser.email === email) {
          throw new Error('User with this email already exists');
      }
      if (existingUser.phone_number === phone_number) {
          throw new Error('User with this phone number already exists');
      }
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      phone_number,
  });

  return user;
};


// Update User
exports.updateUser = async (userId, first_name, last_name, email, password, phone_number) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (first_name) user.first_name = first_name;   // Correct attribute: first_name
  if (last_name) user.last_name = last_name;       // Correct attribute: last_name
  if (email) user.email = email;                   // Correct attribute: email
  if (password) {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
  }
  if (phone_number) user.phone_number = phone_number; // Correct attribute: phone_number

  await user.save(); // Save updated user
  return user; // Return the updated user
};

// Delete User
exports.deleteUser = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  await user.destroy(); // Delete the user
};

// Get User by ID
exports.getUserById = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return user; // Return the user found by ID
};
