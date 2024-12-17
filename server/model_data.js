// creamos el modelo de datos con mongoose
const mongoose = require('mongoose');
const crypto = require('crypto');

const dataSchema = new mongoose.Schema({
    // id del usuario
    userId: {
        type: String,
        required: true
    },
    
    // tarea
    task: {
        type: String,
        required: true
    },
    // estado de la tarea
    status: {
        type: String,
        required: true
    },
    // fecha de creacion
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const model_data = mongoose.model('Data', dataSchema);

module.exports = model_data;
