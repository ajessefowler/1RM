const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.put('/changePassword/:userId', authController.changePassword);
router.post('/isLoggedIn', authController.isLoggedIn)

module.exports = router;