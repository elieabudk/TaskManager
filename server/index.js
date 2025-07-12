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

const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('./controllers/oauth2');



dotenv.config();

const app = express();
//app.use(cors({origin: 'http://localhost:5501', credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', userRoutes);
app.use(morgan('dev'));

//app.use(passport.initialize());
//app.use('/api/users', userRoutes);

// creamos el puerto
const port = process.env.PORT || 3000;




app.use(express.static(path.join(__dirname, '../public/login')));
// creamos la ruta de la api


// Ruta raíz - redirige automáticamente a /inicio
app.get('/', (req, res) => {
    res.redirect('/inicio');
});

app.get('/inicio', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login/login.html'));
});

app.get('/task', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login/index2.html'));
});

// Ruta específica para verificar token - solo devuelve JSON
app.get('/api/verify-token', isAuthenticated, (req, res) => {
    res.json({ valid: true, user: req.user });
});

/////////////////////////////////////////////

  
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
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 36000000,
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
            // Sin dominio específico para que funcione en cualquier dominio
        });
        res.redirect('/task');
      }
    );
  //////////////////////////////////  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

dbconnect();