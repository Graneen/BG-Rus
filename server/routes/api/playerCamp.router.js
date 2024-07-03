const express = require('express');
const router = express.Router();


const { PlayerCamp } = require('../../db/models');
const { sendEmail } = require('../../utils/mail')


router.post('/api/players', async (req, res) => {
  try {
      const { gameCampId, userId, email } = req.body; 
      if (!userId || !gameCampId || !email) {
          return res.status(400).json({ message: 'Please provide userId, gameCampId, and email' });
      }

      const newPlayerCamp = await PlayerCamp.create({ user_id: userId, gameCamp_id: gameCampId, email });

      await sendEmail(
        email,
        'Ваша заявка на GameCamp',
        'Ваша заявка на GameCamp была успешно подана. Ожидайте дальнейших инструкций.'
      );

      res.status(201).json(newPlayerCamp);
  } catch (error) {
      console.error('Error processing application:', error);
      res.status(500).json({ message: 'An error occurred while processing the application' });
  }
});



module.exports = router;