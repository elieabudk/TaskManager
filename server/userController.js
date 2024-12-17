// Importamos mongoose y el model_data


const mongoose = require('mongoose');
const model_data = require('./model_data');

exports.Crear_Tarea = async (req, res) => {
    const body = req.body;
    const respuesta = await model_data.create(body);//
    res.send(respuesta);
    console.log(body);
};

exports.Eliminar_Tarea = async (req, res) => {
    const respuesta = await model_data.deleteOne({ _id: req.params.id });
    res.send(respuesta);
    console.log(respuesta);
};


exports.Cambiar_Estado = async (req, res) => {
    const respuesta = await model_data.updateOne({ _id: req.params.id }, { $set: { status: req.body.status } });
    res.send(respuesta);
    console.log(respuesta);
};

