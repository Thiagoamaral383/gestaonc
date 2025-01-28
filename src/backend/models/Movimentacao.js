const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const NC = require('./NC');
const Empenho = require('./Empenho');

const Movimentacao = sequelize.define(
  'Movimentacao',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    id_nc: {
      type: DataTypes.INTEGER,
      references: { model: NC, key: 'id' },
    },
    id_empenho: {
      type: DataTypes.INTEGER,
      references: { model: Empenho, key: 'id' },
    },
    tipo_movimentacao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['recolhimento', 'anulacao', 'liquidacao', 'pagamento']],
      },
    },
    valor: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    data: { type: DataTypes.DATEONLY, allowNull: false },
    usuario: { type: DataTypes.STRING },
    descricao: { type: DataTypes.TEXT },
  },
  { timestamps: false }
);

Movimentacao.belongsTo(NC, { foreignKey: 'id_nc' });
Movimentacao.belongsTo(Empenho, { foreignKey: 'id_empenho' });

module.exports = Movimentacao;
