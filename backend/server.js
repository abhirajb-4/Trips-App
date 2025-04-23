const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth');
const createAdmin = require('./utils/createAdmin');
const enrollRoutes = require('./routes/enroll');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
const bookingRoutes = require('./routes/booking');
app.use('/api/booking', bookingRoutes);
// Routes
const tripRoutes = require('./routes/trips');
app.use('/api/trips', tripRoutes);

app.use('/api/enrollments', enrollRoutes);


// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
}).then(() => {
  console.log("MongoDB connected");
  createAdmin();
  })
  .catch(err => console.error("MongoDB error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
