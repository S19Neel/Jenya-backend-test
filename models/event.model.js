const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
        default: 0,
    },
    availableSeats: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Event', eventSchema);