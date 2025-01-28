const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const NC = require('./NC');
const Empenho = require('./Empenho');

const EmpenhoNC = sequelize.define(
  'EmpenhoNC',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_empenho: {
      type: DataTypes.INTEGER,
      references: { model: Empenho, key: 'id' },
    },
    id_nc: {
      type: DataTypes.INTEGER,
      references: { model: NC, key: 'id' },
    },
    valor_utilizado: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
  },
  { timestamps: false }
);

EmpenhoNC.belongsTo(Empenho, { foreignKey: 'id_empenho' });
EmpenhoNC.belongsTo(NC, { foreignKey: 'id_nc' });

module.exports = EmpenhoNC;
