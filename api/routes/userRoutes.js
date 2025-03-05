const express = require('express');
const userController = require('../controllers/userController');
const userValidator = require('../validators/userValidator');
const { validate } = require('../middlewares/validationMiddleware');

const router = express.Router();

// Register User
router.post('/register', userValidator.registerValidator, validate, userController.registerUser);

// Login User
router.post('/login', userValidator.loginValidator, validate, userController.authenticateUser);

// Update User
router.put('/update/:userId', userValidator.updateUserValidator, validate, userController.updateUser);

// Delete User
router.delete('/delete/:userId', userController.deleteUser);

// Get User by ID
router.get('/:userId', userController.getUserById);

module.exports = router;
