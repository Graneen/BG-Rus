const express = require("express");
const router = express.Router();
const { Question, Answer, User } = require("../../db/models");

router.get("api/questions", async (req, res) => {
  try {
    const { game_id } = req.query;
    const questions = await Question.findAll({
      where: { game_id },
      include: [
        { model: User, attributes: ["name"] },
        { model: Answer, include: { model: User, attributes: ["name"] } },
      ],
    });
    res.json(questions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("api/questions", async (req, res) => {
  const { user_id, game_id, description } = req.body;
  try {
    const user = await User.findByPk(user_id);
    const newQuestion = await Question.create({
      user_id,
      game_id,
      description,
    });
    await newQuestion.setUser(user);
    res.status(201).json({ user: user.name, question: newQuestion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("api/answers", async (req, res) => {
  const { user_id, question_id, description } = req.body;
  try {
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newAnswer = await Answer.create({
      user_id,
      question_id,
      description,
    });

    await newAnswer.setUser(user);

    res.status(201).json({ user: user.name, answer: newAnswer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
