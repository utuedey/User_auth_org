// routes/auth.js
const express = require('express');
const router = express.Router();
const { userRegistrationValidator, userLoginValidator } = require('../validators/authValidators');
const { register, login } = require('../controllers/authController');

router.post('/register', userRegistrationValidator, register);
router.post('/login', userLoginValidator, login);

module.exports = router;
