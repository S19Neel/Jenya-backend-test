const eventModel = require('../models/event.model');

module.exports.eventService = async ({ name, date, capacity, availableSeats }) => {

    try {
        if(!name || !date || !capacity || !availableSeats) {
            throw new Error('All fields are required');
        }

        const event = eventModel.create({
            name,
            date,
            capacity,
            availableSeats,
        });

        return event;
    } catch (error) {
        console.log(error);
    }
}