const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const blacklistedModel = require('../models/blacklisted.model');

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if(!token) {
            return res.status(401).send({
                error: 'Unauthorized'
            });
        }

        const blacklistedToken = await blacklistedModel.findOne({ token });
        if(blacklistedToken) {
            return res.status(401).send({
                error: 'Unauthorized'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);

        req.user = user;

        return next();

    } catch (error) {
        console.log(error);
        res.status(401).send({ 
            error: 'Unauthorized'
        });
    }
}