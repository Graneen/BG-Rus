const express = require('express');
const router = express.Router();
const { BayerOrder } = require('../../db/models');

router.post('/bayer-orders', async (req, res) => {
  try {
    const userId = req.body.userId; 

    const newOrder = await BayerOrder.create({
      name: req.body.name,
      nameboard: req.body.nameboard,
      user_id: userId 
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/allBayersOrders', async (req, res) => {
    try {
      const allOrders =  await BayerOrder.findAll();
      res.status(200).json(allOrders); 
    } catch (error) {
      console.error('Error fetching all Bayer Orders:', error);
      res.status(500).json({ error: 'Failed to fetch all Bayer Orders' });
    }
});

module.exports = router;