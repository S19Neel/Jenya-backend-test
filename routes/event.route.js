const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const eventController = require('../controllers/event.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/create', [
    body('name').isString().notEmpty(),
    body('date').isString().notEmpty(),
    body('capacity').isNumeric().notEmpty(),
    body('availableSeats').isNumeric().notEmpty(),
], eventController.createEvent);

router.get('/all-events', eventController.getAllEvents);

router.put('/update/:id', [
    body('name').isString().notEmpty(),
    body('date').isString().notEmpty(),
    body('capacity').isNumeric().notEmpty(),
    body('availableSeats').isNumeric().notEmpty(),
], authMiddleware.authUser, eventController.updateEvent);

router.delete('/delete/:id', authMiddleware.authUser, eventController.deleteEvent);

module.exports = router;