const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_Va99OvjJU36gup',         // Replace with your Test Key ID
  key_secret: '4Kvrx9qFr1qHLBgTRt6s3whk'         // Replace with your Test Secret
});

module.exports = razorpay;
