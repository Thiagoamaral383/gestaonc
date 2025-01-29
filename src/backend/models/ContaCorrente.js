const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ContaCorrente = sequelize.define(
  'ContaCorrente',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    ug: { type: DataTypes.INTEGER, allowNull: false }, // Adiciona a UG
    esfera: { type: DataTypes.STRING, allowNull: false },
    fonte: { type: DataTypes.STRING, allowNull: false },
    pi: { type: DataTypes.STRING, allowNull: false },
    nd: { type: DataTypes.STRING, allowNull: false },
    conta_corrente: {
      type: DataTypes.VIRTUAL, // Define como campo virtual para Sequelize
      get() {
        return `${this.ug} ${this.esfera} ${this.fonte} ${this.pi} ${this.nd}`;
      },
    },
  },
  {
    tableName: 'contas_correntes',
    timestamps: false,
  }
);

module.exports = ContaCorrente;
