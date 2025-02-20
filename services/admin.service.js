const adminModel = require('../models/admin.model');

module.exports.createAdmin = async ({ name, email, password }) => {

    try {
        if(!name || !email || !password) {
            throw new Error('All fields are required');
        }

        const admin = adminModel.create({
            name,
            email,
            password,
        })

        return admin;
    } catch (error) {
        console.log(error);
    }
}