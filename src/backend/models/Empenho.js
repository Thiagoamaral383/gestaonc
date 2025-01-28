const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ContaCorrente = require('./ContaCorrente');

const Empenho = sequelize.define(
  'Empenho',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_conta_corrente: {
      type: DataTypes.INTEGER,
      references: { model: ContaCorrente, key: 'id' },
    },
    data_empenho: { type: DataTypes.DATEONLY, allowNull: false },
    valor_original: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    valor_anulado: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
  },
  { timestamps: false }
);

Empenho.belongsTo(ContaCorrente, { foreignKey: 'id_conta_corrente' });

module.exports = Empenho;
