"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ BoardGame }) {
      this.belongsTo(BoardGame, { foreignKey: "game_id" });
    }
  }
  Feedback.init(
    {
      user_id: DataTypes.INTEGER,
      game_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Feedback",
    }
  );
  return Feedback;
};
