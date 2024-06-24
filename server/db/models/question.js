"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Answer }) {
      this.belongsTo(User, {
        foreignKey: "user_id",
      });
      this.hasMany(Answer, { foreignKey: "question_id" });
    }
  }
  Question.init(
    {
      user_id: DataTypes.INTEGER,
      game_id: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
