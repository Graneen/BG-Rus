//! POST path "/api/quiz"
const express = require("express");
const { Quiz } = require("../../db/models");

const quizRouter = express.Router();


quizRouter.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
      const quizFinished = await Quiz.findOne({ where: { user_id: Number(id) }});
    //   console.log({quizFinished})
      if (quizFinished) {
        return res.json({statusQuiz: true})
      }
      return res.json({statusQuiz: false});
    } catch (error) {
      console.error(error);
      res.status(509).json({ message: 'Internal server error' });
    }
  });

quizRouter.post("/", async (req, res) => {
    try {
        const { finalyData: { user_id, theme, genre, players }} = req.body;
        const checkQuiz = JSON.parse(JSON.stringify(
            await Quiz.findOne({ where: { user_id }})
        ));

        if (checkQuiz) {
            const dataQuiz = JSON.parse(JSON.stringify(
                await Quiz.update({ theme, genre, players }, { where: { user_id }})
            ));
        } else {
            const dataQuiz = JSON.parse(JSON.stringify(
                await Quiz.create({ user_id, theme, genre, players })
            ));
        }
        
        res.sendStatus(200);
    } catch (error) {
        console.log({message: "Error with Quiz ", error});
    }
});

module.exports = quizRouter;