'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const feedStack = [
      {
        user_id: 1,
        game_id: 3,
        description: 'Что мне приходит на ум, когда речь идет об UNO? Яркие карточки, быстрая реакция, громкие споры и веселый вечер с друзья. С этой игрой я познакомилась год назад и с тех пор таскаю ее на все выходные посиделки с друзья.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 2,
        game_id: 3,
        description: 'Очень удобно, захватывающее,отлично подходит для детей,можно играть большой компанией и лёгкие правила.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 3,
        game_id: 3,
        description: 'Сами карты достаточно крупного размера и яркие. Удобно держать в руках Так же в коробке с игрой есть подробные правила. Рассчитана yа 2-10 игроков. несмотря на всю простоту, ооочень азартная)) Всем,кто не играл в UNO ,рекомендую попробовать поиграть!',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];
    await queryInterface.bulkInsert('Feedbacks', feedStack, {});
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
