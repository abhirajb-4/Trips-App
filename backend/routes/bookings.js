const express = require('express');
const crypto = require('crypto');
const razorpay = require('../utils/razorpay'); // adjust if needed
const router = express.Router();
const Trip = require('../models/Trip');
const { auth, isUser } = require('../middlewares/auth');
const Booking = require('../models/BookingModel');  // Ensure this path is correct based on your folder structure



router.post('/confirm-booking',auth,isUser ,async (req, res) => {
    console.log('Received booking confirmation request:', req.body);
  try {
    const { payment, booking } = req.body;
    const tripId = req.body.tripId;
    if (!payment || !booking) {
      return res.status(400).json({ success: false, message: "Missing payment or booking details" });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = payment;
    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', razorpay.key_secret)
      .update(body.toString())
      .digest('hex');
    console.log('tip:',tripId);
    const isAuthentic = expectedSignature === razorpay_signature;
    if (isAuthentic) {
      const newBooking = new Booking({
        user: req.user._id,
        trip: tripId,
        passengers: booking.passengers, // array of { name, age, gender }
        payment: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          amount: booking.amount,
          status: "paid"
        }
      });
      console.log('newBooking', newBooking);
      await newBooking.save();
      await Trip.findByIdAndUpdate(tripId, {
        $inc: { "tripSchedule.enrolled": booking.passengers.length }
      });
      return res.status(200).json({ success: true, message: "Booking confirmed" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    console.error('❌ Error confirming booking:', error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post('/create-order', async (req, res) => {
  const { amount } = req.body; // in rupees

  const options = {
    amount: amount * 100, // convert to paise
    currency: 'INR',
    receipt: 'receipt_' + Date.now(),
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order); // send order_id to frontend
  } catch (err) {
    res.status(500).send('Error creating Razorpay order');
  }
});

module.exports = router;
