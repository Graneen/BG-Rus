'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const estStack = [
      {
        user_id: 1,
        game_id: 3,
        value: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        game_id: 3,
        value: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        game_id: 3,
        value: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        game_id: 2,
        value: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        game_id: 2,
        value: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        game_id: 2,
        value: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        game_id: 4,
        value: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        game_id: 4,
        value: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        game_id: 4,
        value: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];
    await queryInterface.bulkInsert('Estimations', estStack, {});
    
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
