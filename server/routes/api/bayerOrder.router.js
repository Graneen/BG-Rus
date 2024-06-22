const express = require('express');
const router = express.Router();
const { BayerOrder } = require('../../db/models');

router.post('/bayerOrders', async (req, res) => {
  try {
    const { name, nameboard } = req.body;
    const newOrder = await BayerOrder.create({ name, nameboard });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create Bayer Order' });
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