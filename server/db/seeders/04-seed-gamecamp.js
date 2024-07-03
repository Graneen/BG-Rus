"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('GameCamps', [
      {
        title: 'Hobby World',
        location: 'Шоссейная улица, с4, деревня Голиково, городской округ Химки, Московская область',
        date: new Date('2024-09-02'),
        description: 'Вас ждёт безграничный круглосуточный доступ к лучшим настольным играм издательств Hobby World и Magellan, а также игротека с гейм-мастерами и сессии настольных ролевых игр. Мы привезём наши горячие новинки и предложим вам их протестировать!',
        gamesHeadliners: 'Жара!Гонка на трассе, Кто накормит Кракена?!, Тираны подземья',
        image1: 'https://hobbygames.ru/image/data/01/News/2023/08/Igrocamp2.0/Banners/02.jpg',
        image2: 'https://hobbygames.ru/image/data/-new/01/news/2024/01/igrokjemp-v-mae/osen-2023-2.jpg',
        image3: 'https://hobbygames.ru/image/data/-new/01/news/2024/01/igrokjemp-v-mae/osen-2023-1.jpg',
        image4: 'https://hobbygames.ru/image/data/-new/01/news/2024/01/igrokjemp-v-mae/vesna-2023-1.jpg',
        // geoLocation: Sequelize.fn('ST_GeomFromText', 'POINT(55.938407, 37.323261)'),
      },
      
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
   
    return queryInterface.bulkDelete('GameCamps', null, {});
  }
};
