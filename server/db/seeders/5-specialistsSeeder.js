'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('SpecialistBuyers', [
      { 
         photo: 'https://img.freepik.com/free-photo/smiley-man-relaxing-outdoors_23-2148739334.jpg?size=626&ext=jpg&ga=GA1.1.1788614524.1718928000&semt=ais_user',
         firstName: 'Михаил', 
         lastName: 'Карандыр', 
         country: 'США' 
        },
        {
         photo: 'https://img.freepik.com/free-photo/front-view-of-smiley-man-outdoors-in-the-city_23-2148955558.jpg',
         firstName: 'Иван', 
         lastName: 'Зобов', 
         country: 'Испания' 
        },
        {
          photo: 'https://opis-cdn.tinkoffjournal.ru/mercury/neuro-real-people-2.ww3bgl..jpg',
          firstName: 'Александр', 
          lastName: 'Варшав', 
          country: 'Китай' 
        },
        {
          photo: 'https://vsetreningi.ru/avatars/objects/8-409_1_6.jpg?1718373241',
          firstName: 'Андрей', 
          lastName: 'Карасев', 
          country: 'Канада' 
        },
        {
          photo: 'https://cdn.maximonline.ru/ec/5b/70/ec5b701b6dc90d27cbde89b6e19a0d07/600x600_1_453c1a5e9b8239272a5b34d9d1f5b52b@1024x1024_0xac120002_17992516771550233711.jpg',
          firstName: 'Сергей', 
          lastName: 'Сафронов', 
          country: 'Тайланд' 
        },
        {
          photo: 'https://sotni.ru/wp-content/uploads/2023/08/leonardo-di-kaprio-1.webp',
          firstName: 'Михаил', 
          lastName: 'Полицеймако', 
          country: 'Южная Корея' 
        },
        {
          photo: 'https://watermark.lovepik.com/photo/20211204/large/lovepik-young-people-in-nature-picture_501509202.jpg',
          firstName: 'Владимир', 
          lastName: 'Ильин', 
          country: 'Австралия' 
        },
        {
          photo: 'https://img.freepik.com/premium-photo/face-handsome-man-natural-portrait-with-available-light-young-man_158235-1193.jpg',
          firstName: 'Олег', 
          lastName: 'Новожилов', 
          country: 'Англия' 
        },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SpecialistBuyers', null, {});
  }
};