const { Sequelize } = require('sequelize');
require('dotenv').config(); // Para carregar as variáveis do .env

// Criar conexão com o PostgreSQL usando Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', // Define o banco como PostgreSQL
    logging: false, // Desativa logs SQL no console
  }
);

module.exports = sequelize;
