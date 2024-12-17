// creamos el servidor con express
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbconnect = require('./config');
const userRoutes = require('./userRoutes');
//const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors({origin: 'http://127.0.0.1:5500'}));
app.use(express.json());
app.use('/api', userRoutes);
//app.use('/api/users', userRoutes);

// creamos el puerto
const port = 3000;

// creamos la ruta de la api
app.get('/', (req, res) => {
    res.send('SERVER TASK MANAGER');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

dbconnect();