const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required'),
], adminController.registerAdmin);

router.post('/login', [
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required'),
], adminController.loginAdmin);

router.get('/event', authMiddleware.authAdmin, adminController.getEvent);

module.exports = router;