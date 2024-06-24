"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ GameMeeting, GameCamp, BoardGame, Question, Quiz }) {
      this.belongsToMany(GameMeeting, {
        foreignKey: "user_id",
        through: "PlayerMeetings",
      });
      this.belongsToMany(GameCamp, {
        foreignKey: "user_id",
        through: "PlayerCamps",
      });
      this.belongsToMany(BoardGame, {
        foreignKey: "user_id",
        through: "Estimations",
      });
      this.belongsToMany(BoardGame, {
        foreignKey: "user_id",
        through: "Feedbacks",
      });
      this.belongsToMany(BoardGame, {
        foreignKey: "user_id",
        through: "Questions",
      });
      this.hasMany(Question, {
        foreignKey: "user_id",
      });
      this.hasOne(Quiz, {
        foreignKey: "user_id",
      });
    }
  }

  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      refreshToken: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
