const express = require('express');
const router = express.Router();
const { BayerOrder, User } = require('../../db/models');

router.post('/bayer-orders/:id/comments', async (req, res) => {
  try {
    const order = await BayerOrder.findByPk(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'BayerOrder not found' });
    }

    const user = await User.findByPk(req.body.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newComment = {
      userId: req.body.userId,
      userName: user.name,
      text: req.body.comment,
      createdAt: new Date()
    };

    const updatedComments = [...(order.comments || []), newComment];

    await order.update({ comments: updatedComments });

    res.json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/bayer-orders/:id/comments', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await BayerOrder.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'BayerOrder not found' });
    }

    res.json(order.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;