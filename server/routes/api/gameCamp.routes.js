const express = require('express');
const router = express.Router();
const { GameCamp } = require('../../db/models');


router.get('/', async (req, res) => {
    try {
      const gameCamps = await GameCamp.findAll();
      console.log(gameCamps);
      res.json(gameCamps);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

router.post('/:id/apply', async (req, res) => {
  const { userId } = req.body;
  const gameCampId = req.params.id;
  try {
    const gameCamp = await GameCamp.findByPk(gameCampId);
    const user = await User.findByPk(userId);
    await gameCamp.addUser(user, { through: { status: 'pending' } });
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;