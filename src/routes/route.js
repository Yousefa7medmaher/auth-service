import express from "express";
const router = express.Router();
import register from "../../controllers/Register.js";
import login from "../../controllers/Login.js";
import { authenticate, authorize } from '../middleware/auth.js';
import { getProfile, updateProfile } from '../../controllers/Profile.js';
import passport from 'passport';
import configureGoogleStrategy from '../../controllers/passport.js';

// Initialize Google OAuth strategy
configureGoogleStrategy();

router.post("/register", register);
router.post("/login", login);

// Google OAuth login
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // For demo: send user info as JSON. In production, redirect or issue JWT.
    res.json({ message: 'Google login successful', user: req.user });
  }
);

router.get("/protected", authenticate, (req, res) => {
  res.json({ message: "You are authenticated!", user: req.user });
});

router.get("/admin", authenticate, authorize('admin'), (req, res) => {
  res.json({ message: "Welcome, admin!", user: req.user });
});

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

export default router;