const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const mongoose = require('mongoose');

const dbconnect = async () => {
  try {
    await mongoose.set('strictQuery', true);
    await mongoose.connect(MONGO_URI);
    console.log('La base de datos está conectada');
  } catch (error) {
    console.error('Error en la conexión a la base de datos', error);
  }
};

module.exports = dbconnect;