const express = require('express');
const userController = require('./userController');
const inicio_registro = require('./inicio_registro');
const { isAuthenticated } = require('./middelwers');
const tareas = require('./cargar_tareas');
const router = express.Router();


router.post('/NuevoDato', isAuthenticated, userController.Crear_Tarea);
router.delete('/NuevoDato/:id', isAuthenticated, userController.Eliminar_Tarea);
router.put('/NuevoDato/:id', isAuthenticated, userController.Cambiar_Estado);
router.post('/register', inicio_registro.Registro);
router.post('/login', inicio_registro.login);
router.post('/cargar_tareas', tareas.cargar_tareas);

module.exports = router;