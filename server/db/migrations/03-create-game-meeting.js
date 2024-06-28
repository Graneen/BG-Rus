"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("GameMeetings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      game_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "BoardGames",
          key: "id",
        },
      },
      name: {
        type: Sequelize.STRING, 
      },
      contacts: {
        type: Sequelize.STRING, 
      },
      gameName: {
        type: Sequelize.STRING, 
      },
      maxPlayers: {
        type: Sequelize.INTEGER, 
      },
      location: {
        type: Sequelize.STRING,
      },
      img: {
        type: Sequelize.STRING,
      },
      place: {
        type: Sequelize.ARRAY(Sequelize.NUMERIC),
      },
      date: {
        type: Sequelize.DATE,
      },
      time: {
        type: Sequelize.TIME, 
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
    await queryInterface.dropTable("GameMeetings");
  },
};
