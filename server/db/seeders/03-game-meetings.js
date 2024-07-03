"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("GameMeetings", [
      { 
        game_id: 29, 
        name: "Андрей", 
        contacts: "tg @andrej777 тел +78984561236",
        gameName: "Кровь и ярость",
        maxPlayers: 4, 
        location: "Берсеневский пер., 2 стр.1",
        place: [55.740841, 37.609937],
        img: "https://nvkz.znaemigraem.ru/upload/medialibrary/0ad/0ad389a2c9ece257e669d8c186c32659.jpg",
        date: new Date("2024-08-26"),
        time: "15:00:00"
       }, 
       { 
        game_id: 28, 
        name: "Ангелина",
        contacts: "+79031781243 whatsapp",
        gameName: "Остров кошек",
        maxPlayers: 4, 
        location: "Большая Серпуховская ул., 31 корп.9",
        place: [55.723389, 37.627669],
        img: "https://cdn.gaga-games.com/wp-content/uploads/2022/06/Beast-module-2.jpg",
        date: new Date("2024-07-04"),
        time: "12:20:00"
       }, 
       { 
        game_id: 8, 
        name: "Юрий", 
        contacts: "писать в телегу @yuramivsepr",
        gameName: "Каркассон(со всеми дополнениями)",
        maxPlayers: 6, 
        location: "Народная ул., 8",
        place: [55.723389, 37.627669],
        img: "https://22games.net/wp-content/uploads/2020/08/Carcassonne-Count-King-and-Robber-4.jpg",
        date: new Date("2024-07-16"),
        time: "10:40:00"
       }, 
       { 
        game_id: 34, 
        name: "Дмитрий", 
        contacts: "tg @wqwerf3",
        gameName: "Древний ужас",
        maxPlayers: 6, 
        location: "ул. Льва Толстого, 23к7с3",
        place: [55.735495, 37.584146],
        img: "https://i.ytimg.com/vi/z3JJJv7he8s/maxresdefault.jpg",
        date: new Date("2024-08-01"),
        time: "18:00:00"
       }, 
       { 
        game_id: 52, 
        name: "Валерий", 
        contacts: "79267840021",
        gameName: "Кто накормит Кракена?!",
        maxPlayers: 8, 
        location: "ул. Сергия Радонежского, 29-31с1",
        place: [55.746927, 37.679502],
        img: "https://www.mirf.ru/wp-content/uploads/2023/11/Kraken-2.jpg",  
        date: new Date("2024-07-14"),
        time: "13:40:00"
       }, 
       { 
        game_id: 60, 
        name: "Виктор", 
        contacts: "ват сапп: 8 909 416 18 22",
        gameName: "Великий западный путь",
        maxPlayers: 4, 
        location: "Селезневская ул., 11а, стр.2",
        place: [55.781266, 37.603675],
        img: "https://i.ytimg.com/vi/7dbehzCnkQE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDrE6uYAtU1_b_Hq2hmD_uQQfn7fg",  
        date: new Date("2024-07-08"),
        time: "15:30:00"
       }, 
       { 
        game_id: 121, 
        name: "Владислав", 
        contacts: "89197855623 Влад или 89091474562 Лена",
        gameName: "Колонизаторы",
        maxPlayers: 4, 
        location: "2-я Песчаная ул., 2к3",
        place: [55.793627, 37.517707],
        img: "https://avatars.mds.yandex.net/get-kinopoisk-post-img/1101693/791d925cdd9b80b2f55034b07edee2d3/960x540",
        date: new Date("2024-07-16"),
        time: "12:00:00"
       }, 
       { 
        game_id: 142, 
        name: "Кирилл", 
        contacts: "телеграмм: @rexit5666",
        gameName: "Властелин колец: Странствия в Средиземье",
        maxPlayers: 4, 
        location: "Лялин пер., 8с2, 1 этаж",
        place: [55.760079, 37.651214],
        img: "https://pronastolki.wordpress.com/wp-content/uploads/2021/04/img_4320.jpg?w=1008",
        date: new Date("2024-07-20"),
        time: "10:00:00"
       }, 
       { game_id: 13, 
        name: "Святослав",
        contacts: "писать телеграмм за всей инфо: @flexoid_na_style",
        gameName: "Война кольца. Карточная игра", 
        maxPlayers: 2, 
        location: "Болотниковская ул., 38, 5", 
        place: [55.663476, 37.590973],
        img: "https://avatars.dzeninfra.ru/get-zen_doc/1222645/pub_65118a785fbcba64db93eb32_65118a8e358ca621ee68c030/scale_1200",
        date: new Date("2024-07-15"),
        time: "11:00:00" },
     
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("GameMeetings", null, {});
  },
};
