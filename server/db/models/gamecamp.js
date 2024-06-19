"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GameCamp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsToMany(User, {
        foreignKey: "gameCamp_id",
        through: "PlayerCamps",
      });
    }
  }
  GameCamp.init(
    {
      title: DataTypes.STRING,
      location: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "GameCamp",
    }
  );
  return GameCamp;
};
