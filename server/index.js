// creamos el servidor con express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbconnect = require('./config');
const userRoutes = require('./userRoutes');
const cookieParser = require('cookie-parser');
const {isAuthenticated} = require('./middelwers');
const path = require('path');
const morgan = require('morgan');

//const userRoutes = require('./routes/userRoutes');

const app = express();
//app.use(cors({origin: 'http://localhost:5501', credentials: true}));
app.use(express.json());
app.use(cookieParser());
app.use('/api', userRoutes);
app.use(morgan('dev'));
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

dbconnect();