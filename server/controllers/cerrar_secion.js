// controlador para cerrar sesion

exports.cerrar_sesion = (req, res) => {
    res.clearCookie('token');
    res.redirect('/inicio');
}