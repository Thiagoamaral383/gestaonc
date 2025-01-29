const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ContaCorrente = require('./ContaCorrente');

const Empenho = sequelize.define(
  'Empenho',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    n_empenho: { type: DataTypes.STRING, allowNull: false, unique: true }, // Número do empenho (ex: 2025NE000001)
    id_conta_corrente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: ContaCorrente, key: 'id' },
    },
    ug: { type: DataTypes.INTEGER, allowNull: false }, // UG do empenho
    data_empenho: { type: DataTypes.DATEONLY, allowNull: false },
    valor_original: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    valor_anulado: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
  },
  {
    tableName: 'empenhos', // Nome exato da tabela
    timestamps: false,
  }
);

module.exports = Empenho;
