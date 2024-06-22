const express = require('express');
const router = express.Router();
const { SpecialistBuyer } = require('../../db/models'); 

router.get('/specialists', async (req, res) => {
  try {
    const specialists = await SpecialistBuyer.findAll();
    res.json(specialists);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch specialists' });
  }
});

module.exports = router;