"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GameMeeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, BoardGame }) {
      this.belongsToMany(User, {
        foreignKey: "gameMeeting_id",
        through: "PlayerMeetings",
      });
      this.belongsTo(BoardGame, { foreignKey: "game_id" });
    }
  }
  GameMeeting.init(
    {
      game_id: DataTypes.INTEGER,
      gameName: DataTypes.STRING, 
      maxPlayers: DataTypes.INTEGER, 
      location: DataTypes.STRING,
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "GameMeeting",
    }
  );
  return GameMeeting;
};
