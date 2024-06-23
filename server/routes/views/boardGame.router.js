const express = require('express');
const router = express.Router();
const { BoardGame, Feedback } = require('../../db/models'); 

router.get('/api/boardgames', async (req, res) => {
    try {
        const boardGames = await BoardGame.findAll(); 
        res.json(boardGames);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

router.get('/api/boardgame/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const boardGame = await BoardGame.findOne({where: { id }}); 
        const feedbackGame = await Feedback.findAll({where: { game_id: id }}); 
        res.json({ boardGame, feedbackGame });
        // console.log({ boardGame, feedbackGame })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

module.exports = router;