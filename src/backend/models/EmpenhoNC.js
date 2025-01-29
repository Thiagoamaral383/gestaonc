const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Empenho = require('./Empenho');
const NC = require('./NC');

const EmpenhoNC = sequelize.define(
  'EmpenhoNC',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_empenho: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: Empenho, key: 'id' },
    },
    n_empenho: { type: DataTypes.STRING, allowNull: false }, // Número do empenho
    ug_empenho: { type: DataTypes.INTEGER, allowNull: false }, // UG do empenho
    id_nc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: NC, key: 'id' },
    },
    n_nc: { type: DataTypes.STRING, allowNull: false }, // Número da NC selecionada
    valor_utilizado: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  },
  {
    tableName: 'empenho_ncs',
    timestamps: false,
  }
);

module.exports = EmpenhoNC;
