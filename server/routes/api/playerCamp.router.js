const express = require('express');
const router = express.Router();


const { PlayerCamp } = require('../../db/models');

router.post('/api/players', async (req, res) => {
  try {
    
    
const { gameCampId, userId } = req.body;
    console.log(userId);

    if (!userId || !gameCampId) {
      
      
return res.status(400).json({ message: 'Необходимо указать userId и gameCampId' });
    }

    const newPlayerCamp = await PlayerCamp.create({ user_id: userId, gameCamp_id: gameCampId });
    res.status(201).json(newPlayerCamp);
  } catch (error) {
    
  
console.error('Произошла ошибка при обработке заявки', error);
    res.status(500).json({ message: 'Произошла ошибка при обработке заявки' });
  }
});

module.exports = router;