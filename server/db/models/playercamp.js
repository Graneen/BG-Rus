'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlayerCamp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlayerCamp.init({
    user_id: DataTypes.INTEGER,
    gameCamp_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlayerCamp',
  });
  return PlayerCamp;
};