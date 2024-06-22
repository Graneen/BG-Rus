'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpecialistBuyer extends Model {
    static associate(models) {
      // Define associations here if needed
    }
  }

  SpecialistBuyer.init({
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