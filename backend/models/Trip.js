const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  time: String,
  destination: String,
});

const tripSchema = new mongoose.Schema({
  tripInfo: {
    tripName: String,
    boardingPoint: String,
    destination: String,
    cost:Number,
  },
  tripSchedule: {
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    capacity: Number,
  },
  busDetails: {
    busType: String,
    busNumber: String,
  },
  contactPerson: {
    name: String,
    phone: String,
  },
  schedule: [scheduleSchema]
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
