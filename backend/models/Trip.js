const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  time: String,
  destination: String,
});

const passengerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String
});

const tripSchema = new mongoose.Schema({
  tripInfo: {
    tripName: String,
    boardingPoint: String,
    destination: String,
    cost: Number,
  },
  tripSchedule: {
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    capacity: Number,
    enrolled: {
      type: Number,
      default: 0
    }
  },
  busDetails: {
    busType: String,
    busNumber: String,
  },
  contactPerson: {
    name: String,
    phone: String,
  },
  schedule: [scheduleSchema],
  passengers: {
    type: [passengerSchema],
    default: null 
  }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
