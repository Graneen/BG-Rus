"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GameCamp extends Model {
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
      date: DataTypes.DATEONLY, 
      description: DataTypes.STRING,
      gamesHeadliners: DataTypes.STRING,
      image1: DataTypes.STRING,
      image2: DataTypes.STRING,
      image3: DataTypes.STRING,
      image4: DataTypes.STRING,
     
    },
    {
      sequelize,
      modelName: "GameCamp",
    }
  );
  return GameCamp;
};
