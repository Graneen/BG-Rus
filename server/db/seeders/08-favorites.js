'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const favStack = [
      {
        user_id: 1,
        game_id: 3,
        toggler: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        game_id: 16,
        toggler: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        game_id: 41,
        toggler: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        game_id: 2,
        toggler: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        game_id: 4,
        toggler: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        game_id: 7,
        toggler: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];
    await queryInterface.bulkInsert('FavoriteGames', favStack, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
