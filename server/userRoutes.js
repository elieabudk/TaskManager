const express = require('express');
const userController = require('./userController');
const inicio_registro = require('./inicio_registro');
const { isAuthenticated } = require('./middelwers');
const tareas = require('./cargar_tareas');
const borrar_tarea = require('./borrar_tarea');
const agregar = require('./agregar');
const router = express.Router();


//router.post('/NuevoDato', isAuthenticated, userController.Crear_Tarea);
//router.delete('/NuevoDato/:id', isAuthenticated, userController.Eliminar_Tarea);
router.put('/NuevoDato/:id', userController.Cambiar_Estado);
router.post('/register', inicio_registro.Registro);
router.post('/login', inicio_registro.login);
router.post('/cargar_tareas', isAuthenticated, tareas.cargar_tareas);
router.delete('/borrar_tarea/:id', isAuthenticated, borrar_tarea.borrar_tarea);
router.post('/agregar_tarea', agregar.agregar_tarea);
module.exports = router;