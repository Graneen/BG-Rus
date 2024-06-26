'use strict';
const { Model, literal } = require('sequelize'); 

module.exports = (sequelize, DataTypes) => {
  class BayerOrder extends Model {
    static associate(models) {
      BayerOrder.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id'
      });
    }
  }

  BayerOrder.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nameboard: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    name: { 
      type: DataTypes.STRING, 
      allowNull: false
    },
    comments: { 
      type: DataTypes.JSONB 
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: literal('CURRENT_TIMESTAMP') 
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: literal('CURRENT_TIMESTAMP') 
    }
  }, {
    sequelize,
    modelName: 'BayerOrder',
  });

  return BayerOrder;
};