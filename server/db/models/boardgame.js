"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BoardGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, GameMeeting, FavoriteGames }) {
      this.belongsToMany(User, {
        foreignKey: "game_id",
        through: "Estimations",
      });
      this.belongsToMany(User, {
        foreignKey: "game_id",
        through: "Feedbacks",
      });
      this.belongsToMany(User, {
        foreignKey: "game_id",
        through: "Questions",
      });
      this.belongsToMany(User, {
        foreignKey: "game_id",
        through: "Estimation",
      });
      this.hasMany(GameMeeting, { foreignKey: "game_id" });
      this.hasMany(FavoriteGames, { foreignKey: "game_id" });
    }
  }
  BoardGame.init(
    {
      poster: DataTypes.TEXT,
      image1: DataTypes.TEXT,
      image2: DataTypes.TEXT,
      video: DataTypes.TEXT,
      title: DataTypes.STRING,
      genre: DataTypes.STRING,
      theme: DataTypes.STRING,
      year: DataTypes.STRING,
      author: DataTypes.STRING,
      description: DataTypes.TEXT,
      difficulty: DataTypes.STRING,
      players: DataTypes.STRING,
      minPlayers: DataTypes.INTEGER,
      maxPlayers: DataTypes.INTEGER,
      time: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "BoardGame",
    }
  );
  return BoardGame;
};
