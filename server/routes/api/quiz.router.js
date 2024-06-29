//! POST path "/api/quiz"
const express = require("express");
const { Quiz } = require("../../db/models");

const quizRouter = express.Router();

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