const express = require('express')
const authController = require('../controller/authController');

const router = express.Router();

router.get('/login', authController.loginCheck);
router.get('/register', authController.renderRegister);
router.get('/resetPassword', authController.renderReset);
router.post('/register', authController.registerPost);
router.post('/home', authController.loginPost);
router.post('/resetPassword', authController.resetPost);
router.post('/logout', authController.logoutPost);

module.exports = router;