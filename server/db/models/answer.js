"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Question, User }) {
      this.belongsTo(Question, { foreignKey: "question_id" });
      this.belongsTo(User, { foreignKey: "user_id" });
    }
  }
  Answer.init(
    {
      user_id: DataTypes.INTEGER,
      question_id: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Answer",
    }
  );
  return Answer;
};
