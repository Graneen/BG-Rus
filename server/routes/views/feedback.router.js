const express = require("express");
const router = express.Router();
const { Feedback, BoardGame, User } = require("../../db/models");

router.post("/api/feedbacks", async (req, res) => {
  try {
    const { user_id, game_id, description } = req.body;
    const feedback = await Feedback.create({ user_id, game_id, description });
    const user = await User.findByPk(user_id);
    res.status(201).json({ feedback, userName: user.name });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/api/feedbacks/:gameId", async (req, res) => {
  try {
    const { gameId } = req.params;
    const feedbacks = await Feedback.findAll({ where: { game_id: gameId } });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
