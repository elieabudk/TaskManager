const express = require('express');
const userController = require('./userController');
const inicio_registro = require('./inicio_registro');

const router = express.Router();


router.post('/NuevoDato', userController.Crear_Tarea);
router.delete('/NuevoDato/:id', userController.Eliminar_Tarea);
router.put('/NuevoDato/:id', userController.Cambiar_Estado);
router.post('/register', inicio_registro.Registro);
router.post('/login', inicio_registro.login);



module.exports = router;