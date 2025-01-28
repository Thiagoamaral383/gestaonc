const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const ContaCorrente = require('./ContaCorrente');

const NC = sequelize.define(
  'NC',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_conta_corrente: {
      type: DataTypes.INTEGER,
      references: { model: ContaCorrente, key: 'id' },
    },
    ug: { type: DataTypes.INTEGER, allowNull: false },
    ugr: { type: DataTypes.INTEGER, allowNull: false },
    data_nc: { type: DataTypes.DATEONLY, allowNull: false },
    descricao: { type: DataTypes.TEXT },
    valor_original: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    valor_recolhido: { type: DataTypes.DECIMAL(15, 2), defaultValue: 0 },
  },
  { timestamps: false }
);

NC.belongsTo(ContaCorrente, { foreignKey: 'id_conta_corrente' });

module.exports = NC;
