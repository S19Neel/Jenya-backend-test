const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    }
})

adminSchema.methods.generateJWT = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
}

adminSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

adminSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

module.exports = mongoose.model('Admin', adminSchema);