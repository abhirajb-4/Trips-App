const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const { auth, isAdmin } = require('../middlewares/auth');

// Create new trip
router.post('/', auth, isAdmin,async (req, res) => {
  try {
    const trip = new Trip(req.body);
    trip.tripSchedule.enrolled = 0;
    await trip.save();
    res.status(201).json(trip);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get trip by ID
router.get('/:id', async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);  // Find trip by ID
    if (!trip) {
      return res.status(404).json({ error: 'Trip not found' });
    }
    res.status(200).json(trip);  // Return the trip
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
