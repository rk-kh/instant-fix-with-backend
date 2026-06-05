// middleware/authMiddleware.js
// Protects routes - only logged-in users can access them

const jwt = require('jsonwebtoken');

const SECRET = 'homeservice_secret_key_123';  // secret used to sign/verify JWT

// ── Middleware function ───────────────────────────────────────
// This runs BEFORE the controller on protected routes
function protect(req, res, next) {

  // 1. Get the token from the cookie
  const token = req.cookies.token;

  // 2. If no token → user is not logged in
  if (!token) {
    return res.redirect('/auth/login');  // send them to login page
  }

  // 3. Verify the token is valid and not expired
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;   // attach user info to request object
    next();               // proceed to the controller
  } catch (err) {
    // Token is invalid or expired
    res.clearCookie('token');
    return res.redirect('/auth/login');
  }

}

// ── Admin-only middleware ─────────────────────────────────────
// Ensures the logged-in user is an admin
function adminOnly(req, res, next) {
  // protect middleware should already have set req.user
  if (req.user && req.user.isAdmin) {
    return next();
  }
  // Not authorized
  return res.status(403).send('Access denied. Admins only.');
}

module.exports = { protect, SECRET, adminOnly };
