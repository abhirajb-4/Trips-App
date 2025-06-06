const jwt = require('jsonwebtoken');
const SECRET = 'hjkjhskdjhfjkshdjfhshfkjhds';

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, SECRET);
    console.log('user',req.user);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  next();
};

const isUser = (req, res, next) => {
  if (req.user.role !== 'user') return res.status(403).json({ error: 'Access denied' });
  next();
};

module.exports = { auth, isAdmin ,isUser };
