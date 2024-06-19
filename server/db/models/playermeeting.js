'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PlayerMeeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PlayerMeeting.init({
    user_id: DataTypes.INTEGER,
    gameMeeting_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PlayerMeeting',
  });
  return PlayerMeeting;
};