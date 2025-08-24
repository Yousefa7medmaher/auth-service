import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const configureGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Find or create user
          let user = await User.findOne({ email: profile.emails[0].value });
          if (!user) {
            user = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              // You may want to set a random password or mark as Google user
              password: 'google-oauth',
              role: 'customer', // default role
            });
          }
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id).select('-password');
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });
};

export default configureGoogleStrategy;
