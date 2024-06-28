"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("GameMeetings", [
      { 
        game_id: 1, 
        name: "Андрей", 
        gameName: "Кровь и ярость",
        maxPlayers: 4, 
        location: "Берсеневский пер., 2 стр.1",
        date: new Date("2024-08-26"),
        time: "15:00:00"
       }, 
       { 
        game_id: 2, 
        name: "Ангелина", 
        gameName: "Остров кошек",
        maxPlayers: 4, 
        location: "Большая Серпуховская ул., 31 корп.9",
        date: new Date("2024-07-04"),
        time: "12:20:00"
       }, 
       { 
        game_id: 3, 
        name: "Юрий", 
        gameName: "Каркассон(со всеми дополнениями)",
        maxPlayers: 6, 
        location: "Народная ул., 8",
        date: new Date("2024-07-16"),
        time: "10:40:00"
       }, 
       { 
        game_id: 4, 
        name: "Дмитрий", 
        gameName: "Древний ужас",
        maxPlayers: 6, 
        location: "ул. Льва Толстого, 23к7с3",
        date: new Date("2024-08-01"),
        time: "18:00:00"
       }, 
       { 
        game_id: 5, 
        name: "Валерий", 
        gameName: "Кто накормит Кракена?!",
        maxPlayers: 8, 
        location: "ул. Сергия Радонежского, 29-31с1",
        date: new Date("2024-07-14"),
        time: "13:40:00"
       }, 
       { 
        game_id: 6, 
        name: "Виктор", 
        gameName: "Великий западный путь",
        maxPlayers: 4, 
        location: "Селезневская ул., 11а, стр.2",
        date: new Date("2024-07-08"),
        time: "15:30:00"
       }, 
       { 
        game_id: 7, 
        name: "Владислав", 
        gameName: "Колонизаторы",
        maxPlayers: 4, 
        location: "2-я Песчаная ул., 2к3",
        date: new Date("2024-07-16"),
        time: "12:00:00"
       }, 
       { 
        game_id: 8, 
        name: "Кирилл", 
        gameName: "Властелин колец: Странствия в Средиземье",
        maxPlayers: 4, 
        location: "Лялин пер., 8с2, 1 этаж",
        date: new Date("2024-07-20"),
        time: "10:00:00"
       }, 
       { game_id: 9, 
        name: "Святослав",
        gameName: "Война кольца. Карточная игра", 
        maxPlayers: 2, 
        location: "Болотниковская ул., 38, 5", 
        date: new Date("2024-07-15"),
        time: "11:00:00" },
     
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("GameMeetings", null, {});
  },
};
