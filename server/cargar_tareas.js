// cargamos las tareas de la base de datos cuando se inicia secion el usuario en la aplicacion

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const model_data = require('./model_data');

dotenv.config();

exports.cargar_tareas = async (req, res) => {

    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    try {
        // tomamos las tareas de la bd que tengan ese email
        const tareas = await mongoose.model('Data').find({ email: email });
        res.json(tareas);
    } catch (error) {
        console.error('Error al cargar tareas:', error);
        res.status(500).json({ message: 'Error al cargar las tareas' });
    }
}


