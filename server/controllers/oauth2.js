// controlador para oauth2



const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const { email, name } = {
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

app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  );


app.get(
    '/auth/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
      const user = req.user;
  
      // Generar JWT con nombre y correo
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      // Configurar cookie
      res.cookie('token', token, { httpOnly: true });
      res.send('Inicio de sesión exitoso');
    }
  );
  
