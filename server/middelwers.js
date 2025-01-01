// middleware para verificar si el usuario esta logeado y si tiene una sesion activa con la cookie

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

exports.isAuthenticated = (req, res, next) => {
   const token =req.cookies.token;
   
   if (!token) {
    return res.status(401).send("No tienes una sesión activa");
    
   }
   const decoded = jwt.verify(token, process.env.JWT_SECRET);
   req.user = decoded;
   
   next();
}




