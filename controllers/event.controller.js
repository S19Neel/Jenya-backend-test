const eventModel = require('../models/event.model');
const eventService = require('../services/event.service');
const { validationResult } = require('express-validator');

module.exports.createEvent = async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array()
            });
        }

        const { name, date, capacity, availableSeats } = req.body;

        const event = await eventService.eventService({
            name,
            date,
            capacity,
            availableSeats,
        });

        return res.status(200).json({
            event
        });

    } catch (error) {
        res.status(400).json({
            message: 'Error creating event'
        });
        console.log(error);
    }
}

module.exports.getAllEvents = async (req, res) => {
    try {
        const { start, end } = req.query;

        const filterEvents = {}
        if(start && end) {
            filterEvents.date = {
                $gte: start,
                $lte: end
            }
        }

        const events = await eventModel.find(filterEvents);

        return res.status(200).json({
            events
        });
        
    } catch (error) {
        res.status(400).json({
            message: 'Error fetching events'
        });
        console.log(error);
    }
}

module.exports.updateEvent = async (req, res) => {

    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ 
                errors: errors.array()
            });
        }

        const { name, date, capacity, availableSeats } = req.body;
        const { id } = req.params;

        const event = await eventModel.findByIdAndUpdate(id, {
            name,
            date,
            capacity,
            availableSeats,
        });

        return res.status(200).json({
            event
        });

    } catch (error) {
        res.status(400).json({
            message: 'Error updating event'
        });
        console.log(error);
    }
}

module.exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await eventModel.findByIdAndDelete(id);

        return res.status(200).json({
            event
        });

    } catch (error) {
        res.status(400).json({
            message: 'Error deleting event'
        });
        console.log(error);
    }
}