'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpecialistBuyer extends Model {
    static associate(models) {
      SpecialistBuyer.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    }
  }

  SpecialistBuyer.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    photo: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SpecialistBuyer',
  });

  return SpecialistBuyer;
};