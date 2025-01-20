// creamos el modelo de datos con mongoose
const mongoose = require('mongoose');
const crypto = require('crypto');

const dataSchema = new mongoose.Schema({
    // email del usuario
    email: {
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
        required: true,
        default: "false"
    },
    // fecha de creacion
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const model_data = mongoose.model('Data', dataSchema);

module.exports = model_data;
