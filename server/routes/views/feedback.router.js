const express = require('express');
const router = express.Router();
const { Feedback, BoardGame, User } = require('../../db/models');

router.post('/api/feedbacks', async (req, res) => {
  try {
    const { user_id, game_id, description } = req.body;
    
    const feedback = await Feedback.create({ user_id, game_id, description });
    res.status(201).json(feedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/api/feedbacks/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;
    const feedbacks = await Feedback.findAll({
      where: { game_id: gameId },
      include: [
        { model: BoardGame, attributes: ['name'] },
        { model: User, attributes: ['name'] },
      ],
    });
    console.log(feedbacks, 'feed')
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
