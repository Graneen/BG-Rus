const express = require("express");
const router = express.Router();
const { LocalizationOrder, User } = require("../../db/models");

router.get("/api/localization-orders", async (req, res) => {
  try {
    const orders = await LocalizationOrder.findAll();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/api/localization-orders", async (req, res) => {
  try {
    const { userId, gameTitle, description } = req.body;
    const newOrder = await LocalizationOrder.create({
      user_id: userId,
      gameTitle,
      description,
      comments: [],
    });

    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/api/localization-orders/:id/comments", async (req, res) => {
  try {
    const order = await LocalizationOrder.findByPk(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Localization order not found" });
    }

    const user = await User.findByPk(req.body.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = {
      userId: req.body.userId,
      userName: user.name,
      comment: req.body.comment,
      createdAt: new Date(),
      commentId: req.body.commentId,
    };

    const updatedComments = [...(order.comments || []), newComment];
    const temp = await order.update({ comments: updatedComments });
    res.json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post(
  "/api/localization-orders/:orderId/comments/:commentId/replies",
  async (req, res) => {
    try {
      const order = await LocalizationOrder.findByPk(req.params.orderId);
      if (!order) {
        return res
          .status(404)
          .json({ message: "Localization order not found" });
      }

      const user = await User.findByPk(req.body.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newReply = {
        userId: req.body.userId,
        userName: user.name,
        replies: req.body.replies,
        createdAt: new Date(),
        commentId: req.params.commentId,
      };

      let comments = order.comments || [];
      const updatedComments = comments.map((comment) => {
        if (comment.id === parseInt(req.params.commentId)) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }
        return comment;
      });

      await order.update({
        comments: updatedComments,
        replies: [...(order.replies || []), newReply],
      });
      res.json(newReply);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

router.get("/api/localization-orders/:id/comments", async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await LocalizationOrder.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: "Localization order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
