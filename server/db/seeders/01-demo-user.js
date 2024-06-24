'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    const bcrypt = require('bcrypt');
    const password = "0000";
    const hashPassword = async (pass) => {
      const hash = await bcrypt.hash(pass, 10);
      return hash;
    };
    
    const usersStack = [
      {
        name: 'Admin',
        email: 'dim.granin@gmail.com',
        // password: '$2b$10$kyxTMfvCWQBZxRq6H.S7SOaUBVroK/ckT6UeEM9MDDBYLY8Cw1Ntq',
        password: await hashPassword(password),
      },
      {
        name: 'User1',
        email: 'dvregv@gmail.com',
        // password: '$2b$10$kyxTMfvCWQBZxRq6H.S7SOaUBVroK/ckT6UeEM9MDDBYLY8Cw1Ntq',
        password: await hashPassword(password),
      },
      {
        name: 'Володя',
        email: 'volodya999@gmail.com',
        // password: '$2b$10$kyxTMfvCWQBZxRq6H.S7SOaUBVroK/ckT6UeEM9MDDBYLY8Cw1Ntq',
        password: await hashPassword(password),
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
