'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const usersStack = [
      {
        name: 'Admin',
        email: 'dim.granin@gmail.com',
        password: '$2b$10$kyxTMfvCWQBZxRq6H.S7SOaUBVroK/ckT6UeEM9MDDBYLY8Cw1Ntq',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'User1',
        email: 'dvregv@gmail.com',
        password: '$2b$10$kyxTMfvCWQBZxRq6H.S7SOaUBVroK/ckT6UeEM9MDDBYLY8Cw1Ntq',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Володя',
        email: 'volodya999@gmail.com',
        password: '$2b$10$kyxTMfvCWQBZxRq6H.S7SOaUBVroK/ckT6UeEM9MDDBYLY8Cw1Ntq',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Users', usersStack, {});
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
