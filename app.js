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

// ── Routes ────────────────────────────────────────────────────
const pageRoutes    = require('./routes/pageRoutes');
const authRoutes    = require('./routes/authRoutes');
const bookingRoutes = require('./routes/bookingRoutes');

app.use('/', pageRoutes);
app.use('/auth', authRoutes);
app.use('/bookings', bookingRoutes);

// ── Start Server ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
});
