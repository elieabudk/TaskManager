// controlador para oauth2
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/model_user');
const bcrypt = require('bcrypt');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: 'https://taskmanager-production-e243.up.railway.app/auth/google/callback',

    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { email, name, password } = {
          email: profile.emails[0].value,
          name: profile.displayName,
          password: profile.id,
        };
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({ email, name, password: hashedPassword });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;