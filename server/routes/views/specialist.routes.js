const express = require('express');
const router = express.Router();
const { SpecialistBuyer, User } = require('../../db/models');

router.get('/specialists', async (req, res) => {
  try {
    const specialists = await SpecialistBuyer.findAll({
      include: {
        model: User,
        as: 'user'
      }
    });
    res.json(specialists);
  } catch (error) {
    console.error('Error fetching specialists:', error);
    res.status(500).json({ error: 'Failed to fetch specialists' });
  }
});


router.post('/specialists/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

   
    const specialist = await SpecialistBuyer.findByPk(id, {
      include: {
        model: User,
        as: 'user'
      }
    });

    if (!specialist) {
      return res.status(404).json({ error: 'Specialist not found' });
    }

    
    await specialist.update({ user_id });
    await specialist.setUser(await User.findByPk(user_id));

   
    res.json({ message: 'Specialist booked successfully' });
  } catch (error) {
    console.error('Error booking specialist:', error);
    res.status(500).json({ error: 'Failed to book specialist' });
  }
});




module.exports = router;