// middleware para verificar si el usuario esta logeado y si tiene una sesion activa con la cookie

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        // Redirigir a la página de inicio si el token no está presente
        return res.redirect('/inicio');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        // Manejar errores de verificación del token
        return res.status(401).json({ error: 'Token inválido o expirado. Por favor, inicie sesión nuevamente.' });
    }
}




