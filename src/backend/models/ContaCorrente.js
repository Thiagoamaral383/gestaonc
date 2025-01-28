const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContaCorrente = sequelize.define(
  'ContaCorrente',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    esfera: { type: DataTypes.STRING, allowNull: false },
    fonte: { type: DataTypes.STRING, allowNull: false },
    pi: { type: DataTypes.STRING, allowNull: false },
    nd: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: false }
);

module.exports = ContaCorrente;
