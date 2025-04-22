const jwt = require('jsonwebtoken');
const SECRET = 'your_jwt_secret';

const auth = (req, res, next) => {
  console.log(req);
  const token = req.headers.authorization?.split(' ')[1];
  console.log(token);
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
  next();
};

const isUser = (req, res, next) => {
  console.log(req.user);
  if (req.user.role !== 'user') return res.status(403).json({ error: 'Access denied' });
  next();
};

module.exports = { auth, isAdmin ,isUser };
