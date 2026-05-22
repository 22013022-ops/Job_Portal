const express = require('express');
const router = express.Router();

// Import BOTH functions from the controller
const { registerUser, loginUser } = require('../controllers/authController');

// Route for Registration: POST /api/auth/register
router.post('/register', registerUser);

// Route for Login: POST /api/auth/login
router.post('/login', loginUser);

module.exports = router; //exports router.post('/register', registerUser);
