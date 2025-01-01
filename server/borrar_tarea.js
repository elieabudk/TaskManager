// funcion para borrar una tarea
const mongoose = require('mongoose');

exports.borrar_tarea = async (req, res) => {
    try {
        const id = req.params.id;
        const tarea = await mongoose.model('Data').findByIdAndDelete(id);
        res.json(tarea);
    } catch (error) {
        console.error('Error al borrar tarea:', error);
        res.status(500).json({ message: 'Error al borrar la tarea' });
    }
}
