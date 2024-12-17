const mongoose = require('mongoose');

const dbconnect = async () => {
  try {
    await mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://127.0.0.1:27017/Task_Manager');
    console.log('La base de datos está conectada');
  } catch (error) {
    console.error('Error en la conexión a la base de datos', error);
  }
};

module.exports = dbconnect;