const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String
});
const paymentSchema = new mongoose.Schema({
  orderId: String,
  paymentId: String,
  signature: String,
  amount: Number,
  status: String
});

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  trip: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip' },
  payment: paymentSchema,
  passengers:[passengerSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
