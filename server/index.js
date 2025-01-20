// creamos el servidor con express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbconnect = require('./config');
const userRoutes = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const {isAuthenticated} = require('./middlewares/middelwers');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/model_user');

dotenv.config();

const app = express();
//app.use(cors({origin: 'http://localhost:5501', credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', userRoutes);
app.use(morgan('dev'));
app.use(passport.initialize());
//app.use('/api/users', userRoutes);

// creamos el puerto
const port = 3000;


app.use(express.static(path.join(__dirname, '../public/login')));
// creamos la ruta de la api
app.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login/login.html'));
});

app.get('/task', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login/index2.html'));
});

/////////////////////////////////////////////
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',

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
        res.redirect('/task');
      }
    );
  //////////////////////////////////  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

dbconnect();