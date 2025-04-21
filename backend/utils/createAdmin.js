// utils/createAdmin.js
const User = require('../models/User');

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (!existingAdmin) {
      const admin = new User({
        username: 'admin',
        email:'admin@gmail.com',
        password: 'admin123', 
        role: 'admin'
      });
      await admin.save();
      console.log(' Admin created: username = admin, password = admin123');
    } else {
      console.log('Admin already exists');
    }
  } catch (err) {
    console.error(' Error creating admin:', err.message);
  }
};

module.exports = createAdmin;
