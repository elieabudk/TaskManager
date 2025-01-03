// resetear las tareas

const mongoose = require('mongoose');
const model_data = mongoose.model('Data');
const jwt = require('jsonwebtoken');

exports.Resetear_Tareas = async (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = decoded.email;
    const respuesta = await model_data.deleteMany({ email: email });
    res.send(respuesta);
    console.log(respuesta);
};
