const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

const SECRET = 'hjkjhskdjhfjkshdjfhshfkjhds';

// Register
router.post('/register', async (req, res) => {
  try {
    const { username,email ,password, role } = req.body;
    const user = new User({ username, email,password, role });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id, role: user.role ,email:user.email,name:user.name}, SECRET, { expiresIn: '1h' });
  res.json({ token });

});

module.exports = router;
