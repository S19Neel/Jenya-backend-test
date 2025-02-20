const adminModel = require('../models/admin.model');
const adminService = require('../services/admin.service');
const { validationResult } = require('express-validator');

module.exports.registerAdmin = async (req, res) => {
    try {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;

        const hash = await adminModel.hashPassword(password);

        const admin = await adminService.createAdmin({
            name,
            email,
            password: hash,
        });
        
        const adminToken = admin.generateJWT();

        return res.status(200).json({
            admin,
            adminToken
        });

    } catch (error) {
        res.status(400).json({
            message: 'Error registering admin'
        });
        console.log(error);
    }
}

module.exports.loginAdmin = async (req, res) => {

    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const admin = await adminModel.findOne({ email }).select('+password');

        if(!admin) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const comparedPassword = await admin.comparePassword(password);

        if(!comparedPassword) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const adminToken = admin.generateJWT();
        res.cookie('adminToken', adminToken);

        return res.status(200).json({
            admin,
            adminToken
        });
    } catch (error) {
        res.status(401).json({
            message: 'Error logging in'
        });
        console.log(error);
    }
}

module.exports.getEvent = async (req, res) => {
    return res.status(200).json({
        message: 'Event'
    });
}