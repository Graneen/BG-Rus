"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BoardGames", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      poster: {
        type: Sequelize.TEXT,
      },
      image1: {
        type: Sequelize.TEXT,
      },
      image2: {
        type: Sequelize.TEXT,
      },
      video: {
        type: Sequelize.TEXT,
      },
      title: {
        type: Sequelize.STRING,
      },
      genre: {
        type: Sequelize.STRING,
      },
      theme: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
      },
      difficulty: {
        type: Sequelize.STRING,
      },
      
      players: {
        type: Sequelize.STRING,
      },
      minPlayers: {
        type: Sequelize.INTEGER,
      },
      maxPlayers: {
        type: Sequelize.INTEGER,
      },
      time: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date(),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("BoardGames");
  },
};
