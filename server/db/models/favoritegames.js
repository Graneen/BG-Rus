'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteGames extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FavoriteGames.init({
    user_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
    toggler: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'FavoriteGames',
  });
  return FavoriteGames;
};