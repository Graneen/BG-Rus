const { Model, literal } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LocalizationOrder extends Model {
    static associate(models) {
      LocalizationOrder.belongsTo(models.User, {
        foreignKey: 'user_id',
        targetKey: 'id'
      });
    }
  }

  LocalizationOrder.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    gameTitle: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    comments: { 
      type: DataTypes.JSONB 
    },
    commentId: {
      type: DataTypes.INTEGER
    },
    replies: {
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
    modelName: 'LocalizationOrder',
  });

  return LocalizationOrder;
};