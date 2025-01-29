const { Sequelize } = require('sequelize');
require('dotenv').config(); // Para carregar as variáveis de ambiente

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false, // Desativa logs SQL no console
  }
);

module.exports = sequelize;
