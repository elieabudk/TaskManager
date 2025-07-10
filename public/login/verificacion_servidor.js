// verificacion de servidor

export const verificacion_servidor = async () => {

    try {
        const request = await fetch('/inicio');
    if (request.status == 200) {
        console.log('Servidor disponible');
        return true;
    } else {
        console.log('Servidor no disponible');
        return false;
    }
} catch (error) {
    console.log('Servidor no disponible');
    return false;
}
};


