'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PlayerCamp extends Model {
    static associate(models) {
      PlayerCamp.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'player'
      });
      PlayerCamp.belongsTo(models.GameCamp, {
        foreignKey: 'gameCamp_id',
        as: 'camp'
      });
    }
  }
  
  PlayerCamp.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    gameCamp_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlayerCamp',
  });
  return PlayerCamp;
};