// middleware para verificar si el usuario esta logeado y si tiene una sesion activa con la cookie

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        // Si es una ruta API, devolver JSON error
        if (req.path.startsWith('/api/')) {
            return res.status(401).json({ valid: false, message: 'No token provided' });
        }
        // Redirigir a la página de inicio si el token no está presente
        return res.redirect('/inicio');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        // Limpiar cookie inválida
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            path: '/',
        });
        
        // Si es una ruta API, devolver JSON error
        if (req.path.startsWith('/api/')) {
            return res.status(401).json({ valid: false, message: 'Invalid token' });
        }
        // Redirigir a la página de inicio
        return res.redirect('/inicio');
    }
}




