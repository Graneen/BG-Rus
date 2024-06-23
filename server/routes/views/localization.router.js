const express = require('express');
const router = express.Router();
const { LocalizationOrder } = require('../../db/models'); 

router.get('/localization-orders', async (req, res) => {
  try {
    const orders = await LocalizationOrder.findAll();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/localization-orders', async (req, res) => {
  try {
    const newOrder = await LocalizationOrder.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.post('/localization-orders/:id/comments', async (req, res) => {
  try {
    const order = await LocalizationOrder.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Localization order not found' });
    }

    const newComment = {
      userId: req.body.userId,
      comment: req.body.comment,
    };

    order.comments.push(newComment);
    await order.save();

    res.json(order.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/localization-orders/:id/comments', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await LocalizationOrder.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Localization order not found' });
    }

    res.json(order.comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;