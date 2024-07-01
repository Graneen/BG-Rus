const express = require('express');
const router = express.Router();
const { GameMeeting } = require('../../db/models'); 

router.post("/game-meetings/news", async (req, res) => {
    try {
      const {
        game_id,
        name,
        contacts,
        gameName,
        maxPlayers,
        location,
        img,
        place,
        date,
        time,
      } = req.body;

  console.log(req.body, 'begin')
      const newGameMeeting = await GameMeeting.create({
        game_id,
        name,
        contacts,
        gameName,
        maxPlayers,
        location,
        img,
        place: place || [0, 0],
        date,
        time,
      });
console.log(newGameMeeting, 'new')
      return res.status(201).json(newGameMeeting);
    } catch (error) {
      console.error("Error creating Game Meeting:", error);
      return res.status(500).json({ error: "Error creating Game Meeting" });
    }
  });
  

router.get('/api/meets', async (req, res) => {
    try {
        const gameMeets = await GameMeeting.findAll({attributes: ['id', 'game_id', 'name', 'contacts', 'gameName', 'maxPlayers', 'location', 'img', 'place', 'date', 'time']});
        const clearMeets = JSON.parse(JSON.stringify(gameMeets));
        const sortedMeets = clearMeets.sort((a,b) => a.date > b.date )
        // console.log(sortedMeets)
        res.json(gameMeets); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера при попытке принять данные о встречах' });
    }
});

module.exports = router;

