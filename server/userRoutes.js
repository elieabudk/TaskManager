const express = require('express');
const userController = require('./userController');

const router = express.Router();


router.post('/NuevoDato', userController.Crear_Tarea);
router.delete('/NuevoDato/:id', userController.Eliminar_Tarea);
router.put('/NuevoDato/:id', userController.Cambiar_Estado);


module.exports = router;