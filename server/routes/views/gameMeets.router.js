const express = require('express');
const router = express.Router();
const { GameMeeting } = require('../../db/models'); 

router.get('/api/meets', async (req, res) => {
    try {
        const gameMeets = await GameMeeting.findAll({attributes: ['id', 'game_id', 'name', 'contacts', 'gameName', 'maxPlayers', 'location', 'img', 'place', 'date', 'time']});
        res.json(gameMeets); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера при попытке принять данные о встречах' });
    }
});

module.exports = router;