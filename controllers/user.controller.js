const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res) => {
    try {
        
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;

        const hash = await userModel.hashPassword(password);

        const user = await userService.createUser({
            name,
            email,
            password: hash,
        });
        
        const token = user.generateJWT();

        return res.status(200).json({
            user,
            token
        });

    } catch (error) {
        res.status(400).json({
            message: 'Error registering user'
        });
        console.log(error);
    }
}

module.exports.loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required'
            });
        }

        const user = await userModel.findOne({ email }).select('+password');

        if(!user) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const comparedPassword = await user.comparePassword(password);

        if(!comparedPassword) {
            return res.status(400).json({
                message: 'Invalid email or password'
            });
        }

        const token = user.generateJWT();
        res.cookie('token', token);

        return res.status(200).json({
            user,
            token
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