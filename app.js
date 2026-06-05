// ============================================================
// app.js - Main Server File
// Smart Home Service Booking System - Assignment 3
// ============================================================

const express    = require('express');
const path       = require('path');
const mongoose   = require('mongoose');
const cookieParser = require('cookie-parser');

const app  = express();
const PORT = 3000;

// ── MongoDB Connection ────────────────────────────────────────
// Make sure MongoDB is running on your machine first
mongoose.connect('mongodb://localhost:27017/homeservice')
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log('MongoDB error:', err));

// ── View Engine ───────────────────────────────────────────────
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ── Middleware ────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));  // serve CSS/images
app.use(express.urlencoded({ extended: true }));           // parse form data
app.use(express.json());                                   // parse JSON
app.use(cookieParser());                                   // read cookies (for JWT)

// Make the logged-in user and admin existence flag available to all views
const jwt = require('jsonwebtoken');
const { SECRET } = require('./middleware/authMiddleware');
const User = require('./models/User');
app.use(async (req, res, next) => {
  // default values
  res.locals.user = null;
  res.locals.adminExists = false;

  // check token
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET);
      res.locals.user = decoded;
    } catch (err) {
      res.clearCookie('token');
    }
  }

  // check whether an admin user exists in the database
  try {
    const exists = await User.exists({ isAdmin: true });
    res.locals.adminExists = !!exists;
  } catch (err) {
    console.log('Could not check admin existence:', err);
  }

  next();
});

// ── Routes ────────────────────────────────────────────────────
const pageRoutes    = require('./routes/pageRoutes');
const authRoutes    = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const adminRoutes   = require('./routes/adminRoutes');

app.use('/', pageRoutes);
app.use('/auth', authRoutes);
app.use('/bookings', bookingRoutes);
app.use('/admin', adminRoutes);

// ── Start Server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
});
