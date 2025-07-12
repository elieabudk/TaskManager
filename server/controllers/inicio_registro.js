const mongoose = require('mongoose');
const model_user = require('../models/model_user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// creamos la funcion para registrar un usuario

// Ruta de registro
exports.Registro = async (req, res) => {
    const {name, email, password } = req.body;

    // Validar datos
    if ( !name || !email || !password) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }
    if (!/^[a-zA-Z\s]*$/.test(name)) {
        return res.status(400).json({ message: 'El nombre solo puede contener letras.' });
    }

    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return res.status(400).json({ message: 'El correo electrónico no es válido.' });
    }
    if (!/^[a-zA-Z0-9]{8,}$/.test(password)) {
        return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres.' });
    }
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await mongoose.model('User').findOne({ email: email });
    if (existingUser) {
        return res.status(409).json({ message: 'El usuario ya existe.' });
    }

    // Cifrar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Guardar usuario en la base de datos
    const newUser = new mongoose.model('User')({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado exitosamente.' });
};


// funcion para logear un usuario

// Ruta de inicio de sesión
exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Buscar usuario en la base de datos
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        return res.status(400).json({ message: 'El correo electrónico no es válido.' });
    }
  //  if (!/^[a-zA-Z0-9]{8,}$/.test(password)) {
        //return res.status(400).json({ message: 'La contraseña debe tener al menos 8 caracteres.' });
  //  }
    const user = await mongoose.model('User').findOne({ email: email });
    if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    
    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // Generar JWT sin expiración
    const token = jwt.sign({ email }, process.env.JWT_SECRET);

    // Configurar cookie con el token
    res.cookie('token', token, {
        httpOnly: true, // Mantener seguro - no accesible desde JavaScript
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        path: '/',
        // Sin dominio específico
    });
    res.json({ message: 'Inicio de sesión exitoso.' });
};
