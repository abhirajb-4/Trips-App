const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const Trip = require('../models/Trip');
const { auth ,isUser } = require('../middlewares/auth');


router.post('/book/:tripId', auth, isUser,async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;

    // Check if trip exists
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });

    // Check if user already enrolled
    const exists = await Enrollment.findOne({ user: userId, trip: tripId });
    if (exists) return res.status(400).json({ message: 'Already enrolled in this trip' });

    await Trip.findByIdAndUpdate(tripId, { $inc: { 'tripSchedule.enrolled': 1 } });

    // Save enrollment
    const enrollment = new Enrollment({ user: userId, trip: tripId });
    await enrollment.save();

    res.status(200).json({ message: 'Trip booked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

// Get trips enrolled by the user
router.get('/my-trips', auth, isUser, async (req, res) => {
  try {
    const userId = req.user.id;

    const enrollments = await Enrollment.find({ user: userId }).populate('trip');

    const trips = enrollments.map(e => e.trip);

    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});


module.exports = router;
