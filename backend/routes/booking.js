const express = require('express');
const crypto = require('crypto');
const razorpay = require('../utils/razorpay'); // adjust if needed
const router = express.Router();
const { auth, isUser } = require('../middlewares/auth');

router.post('/confirm-booking',auth,isUser ,async (req, res) => {
    console.log('Received booking confirmation request:', req.body);
  try {
    const { payment, booking, user } = req.body;

    if (!payment || !booking) {
      return res.status(400).json({ success: false, message: "Missing payment or booking details" });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = payment;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto.createHmac('sha256', razorpay.key_secret)
      .update(body.toString())
      .digest('hex');

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Save booking and payment to DB (replace with actual DB code)
      console.log('✅ Booking confirmed:');
      console.log('User:', user);
      console.log('Booking:', booking);
      console.log('Payment:', payment);

      return res.status(200).json({ success: true, message: "Booking confirmed" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid payment signature" });
    }
  } catch (error) {
    console.error('❌ Error confirming booking:', error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
