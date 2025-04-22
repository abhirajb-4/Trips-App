const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Trip = require('../models/Trip');
const { auth } = require('../middlewares/auth');


router.post('/book/:tripId', auth, async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;

    // Check if trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    // Check if user already enrolled
    const exists = await Enrollment.findOne({ user: userId, trip: tripId });
    if (exists) return res.status(400).json({ message: 'Already enrolled in this trip' });

    // Save enrollment
    const enrollment = new Enrollment({ user: userId, trip: tripId });
    await enrollment.save();

    res.status(200).json({ message: 'Trip booked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

module.exports = router;
