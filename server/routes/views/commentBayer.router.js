const express = require('express');
const router = express.Router();
const { BayerOrder, User } = require('../models');


router.post('/bayers/comments', async (req, res) => {
  const { orderId, userId, text } = req.body;

  try {
    const comment = await BayerOrder.create({
      text: text,
      OrderId: orderId,
      UserId: userId
    });

    res.status(201).json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ error: 'Error adding comment' });
  }
});

module.exports = router;