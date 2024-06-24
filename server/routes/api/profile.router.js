const express = require("express");
const router = express.Router();
const {
  FavoriteGames,
  BoardGame,
  Feedback,
  Question,
  Answer,
  PlayerMeeting,
  GameMeeting,
  PlayerCamp,
  GameCamp,
} = require("../../db/models");

router.get("/api/profile/:id", async (req, res) => {
  try {
    const user = req.params.id;
    //избранные игры
    const favoriteGamesArray = await FavoriteGames.findAll({
      where: { user_id: Number(user) },
      attributes: ["game_id"],
    });
    const gameId = favoriteGamesArray.map((obj) => obj.game_id);
    const favoriteGamesSearch = await BoardGame.findAll({
      where: {
        id: gameId,
      },
    });
    const favoriteGames = JSON.parse(JSON.stringify(favoriteGamesSearch));
    //
    //Отзывы
    //
    const userFeedbacks = await Feedback.findAll({
      where: { user_id: Number(user) },
    });
    const feedbacks = JSON.parse(JSON.stringify(userFeedbacks));
    //
    //Вопросы-ответы
    //
    //-------------------------------------------------------отбираем вопросы пользователя
    const userQuestion = await Question.findAll({
      where: { user_id: Number(user) },
    });
    const questions = JSON.parse(JSON.stringify(userQuestion));
    // console.log("questions", questions);
    //------------------------------------------------------отбираем игры по которым задавались вопросы
    const boardGamesId = questions.map((obj) => obj.id);
    const gamesWithQuestionsArr = await BoardGame.findAll({
      where: {
        id: boardGamesId,
      },
    });
    const gamesWithQuestions = JSON.parse(
      JSON.stringify(gamesWithQuestionsArr)
    );
    // console.log("gamesWithQuestions", gamesWithQuestions);
    //----------------------------------------------------------Отбираем ответы на вопросы
    const questionsId = questions.map((obj) => obj.game_id);
    const answersToQuestionsArr = await Answer.findAll({
      where: {
        question_id: questionsId,
      },
    });
    const answersToQuestions = JSON.parse(
      JSON.stringify(answersToQuestionsArr)
    );
    // console.log("answersToQuestions", answersToQuestions);
    //-------------------------------------------------------------------------Сводим в 1 массив
    const questionsAndAnswers = gamesWithQuestions.map((game) => {
      const questionsForGame = questions.filter(
        (question) => question.game_id === game.id
      );
      const data = {
        game_id: game.id,
        game: game.title,
        questions: questionsForGame.map((question) => {
          const answers = answersToQuestions
            .filter((answer) => answer.question_id === question.id)
            .map((answer) => answer.description);
          return {
            question: question.description,
            answers: answers,
          };
        }),
      };
      return data;
    });
    // console.log("questionsAndAnswers", questionsAndAnswers);
    // console.log("questions[0]", questionsAndAnswers[0].questions);
    // console.log("questions[1]", questionsAndAnswers[1].questions);
    //
    //Игротеки
    //
    const searchMeetingsId = await PlayerMeeting.findAll({
      where: { user_id: Number(user) },
      attributes: ["gameMeeting_id"],
    });
    const gameMeetingsId = searchMeetingsId.map((obj) => obj.gameMeeting_id);
    const meetings = await GameMeeting.findAll({
      where: {
        id: gameMeetingsId,
      },
    });
    const userMeetings = JSON.parse(JSON.stringify(meetings));
    // console.log("userMeeting", userMeeting);

    //Игрокемпы
    //
    const searchCampsId = await PlayerCamp.findAll({
      where: { user_id: Number(user) },
      attributes: ["gameCamp_id"],
    });
    const gameCampsId = searchCampsId.map((obj) => obj.gameCamp_id);
    const camps = await GameCamp.findAll({
      where: {
        id: gameCampsId,
      },
    });
    const userCamps = JSON.parse(JSON.stringify(camps));
    // console.log("userCamps", userCamps);
    //
    res.status(200).json({
      favoriteGames,
      feedbacks,
      questionsAndAnswers,
      userMeetings,
      userCamps,
    });
  } catch (error) {
    console.error("Error while get profile data:", error);
    res.status(500).json({ error: "Error while get profile data" });
  }
});

module.exports = router;
