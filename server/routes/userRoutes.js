const express = require('express');
const userController = require('../controllers/userController');
const inicio_registro = require('../controllers/inicio_registro');
const { isAuthenticated } = require('../middlewares/middelwers');
const tareas = require('../controllers/cargar_tareas');
const borrar_tarea = require('../controllers/borrar_tarea');
const agregar = require('../controllers/agregar');
const router = express.Router();
const resetear_tareas = require('../controllers/resetear_tareas');
const cerrar_sesion = require('../controllers/cerrar_secion');


//router.post('/NuevoDato', isAuthenticated, userController.Crear_Tarea);
//router.delete('/NuevoDato/:id', isAuthenticated, userController.Eliminar_Tarea);
router.put('/NuevoDato/:id', userController.Cambiar_Estado);
router.post('/register', inicio_registro.Registro);
router.post('/login', inicio_registro.login);
router.post('/cargar_tareas', isAuthenticated, tareas.cargar_tareas);
router.delete('/borrar_tarea/:id', isAuthenticated, borrar_tarea.borrar_tarea);
router.post('/agregar_tarea', agregar.agregar_tarea);
router.delete('/resetear_tareas', isAuthenticated, resetear_tareas.Resetear_Tareas);
router.delete('/cerrar_sesion', cerrar_sesion.cerrar_sesion);
module.exports = router;