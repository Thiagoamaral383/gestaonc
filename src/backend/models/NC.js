const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const EmpenhoNC = require('./EmpenhoNC');

const NC = sequelize.define(
  'NC',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    n_nc: { type: DataTypes.STRING, allowNull: false, unique: true },
    id_conta_corrente: { type: DataTypes.INTEGER, allowNull: false },
    ug: { type: DataTypes.INTEGER, allowNull: false },
    ugr: { type: DataTypes.INTEGER, allowNull: false },
    data_nc: { type: DataTypes.DATEONLY, allowNull: false },
    descricao: { type: DataTypes.STRING },
    valor_original: { type: DataTypes.DECIMAL(15, 2), allowNull: false },
    valor_recolhido: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
    valor_empenhado: {
      type: DataTypes.VIRTUAL,
      async get() {
        const empenhos = await EmpenhoNC.sum('valor_utilizado', {
          where: { id_nc: this.id },
        });
        return empenhos || 0; // Se não houver empenhos, retorna 0
      },
    },
    saldo: {
      type: DataTypes.VIRTUAL,
      get() {
        return (
          this.valor_original - (this.valor_recolhido + this.valor_empenhado)
        );
      },
    },
  },
  {
    tableName: 'ncs',
    timestamps: false,
  }
);

module.exports = NC;
