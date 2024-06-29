"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GameMeeting extends Model {
    
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
      name: DataTypes.STRING,
      contacts: DataTypes.STRING,
      gameName: DataTypes.STRING, 
      maxPlayers: DataTypes.INTEGER, 
      location: DataTypes.STRING,
      img: DataTypes.STRING,
      place: DataTypes.ARRAY(DataTypes.NUMERIC),
      date: DataTypes.DATE,
      time: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: "GameMeeting",
    }
  );
  return GameMeeting;
};
