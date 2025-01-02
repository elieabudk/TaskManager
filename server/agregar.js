//  agregamos la tarea en la base de datos


const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const model_data = require('./model_data');

dotenv.config();

exports.agregar_tarea = async (req, res) => {

    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    try {
        // Tomar la tarea y el email que se envían desde el cliente
        const tarea = req.body;
    
        // Agregar la tarea a la base de datos
        const nuevaTarea = await model_data.create({
            email: email,
            task: tarea.task
           
        });

        // Responder con la nueva tarea creada
        res.json(nuevaTarea);
    } catch (error) {
        console.error('Error al cargar tareas:', error);
        res.status(500).json({ message: 'Error al cargar las tareas' });
    }
}
