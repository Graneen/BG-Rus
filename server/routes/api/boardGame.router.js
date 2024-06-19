const express = require('express');
const router = express.Router();
const { BoardGame } = require('../../db/models'); 

router.get('/api/boardgames', async (req, res) => {
    try {
        const boardGames = await BoardGame.findAll(); 
        res.json(boardGames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

module.exports = router;