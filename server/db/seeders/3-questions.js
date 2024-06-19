'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const questionsData = [
      {
        user_id: 1,
        game_id: 1,
        theme: 'Какую тематику предпочитаете?',
        genre: 'Какой жанр предпочитаете?',
        minPlayers: 'Каким минимальным количеством игроков вы предпочли бы играть?',
        maxPlayers: 'Каким максимальным количеством игроков вы предпочли бы играть?',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
     
    ];

    await queryInterface.bulkInsert('Questions', questionsData, {});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};