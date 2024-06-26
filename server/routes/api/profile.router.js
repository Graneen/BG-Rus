const express = require("express");
const router = express.Router();

const { Op } = require("sequelize");

const {
  User,
  FavoriteGames,
  BoardGame,
  Feedback,
  Question,
  Answer,
  PlayerMeeting,
  GameMeeting,
  PlayerCamp,
  GameCamp,
  Quiz,
} = require("../../db/models");

router.get("/api/profile/:id", async (req, res) => {
  try {
    const user = req.params.id;
    //Пользователь
    const searchUser = await User.findByPk(Number(user));
    const currentUser = JSON.parse(JSON.stringify(searchUser));
    //Игротеки
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
    //Игрокемпы
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
    //Отзывы
    const userFeedbacks = await Feedback.findAll({
      where: { user_id: Number(user) },
      include: {
        model: BoardGame,
        required: true,
        attributes: ["title"],
      },
      attributes: ["game_id", "description"],
    });
    const feedbacks = JSON.parse(JSON.stringify(userFeedbacks));
    //Вопросы-ответы
    //-------------------------------------------------------отбираем вопросы пользователя
    const userQuestion = await Question.findAll({
      where: { user_id: Number(user) },
    });
    const questions = JSON.parse(JSON.stringify(userQuestion));
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
    //рекомендуемые игры
    let recommendedGames = [];
    const userQuiz = await Quiz.findOne({ where: { user_id: Number(user) } });
    const userQuizResult = JSON.parse(JSON.stringify(userQuiz));
    if (userQuizResult) {
      const quizTheme = userQuizResult.theme.split(",");
      const quizGenre = userQuizResult.genre.split(",");

      const userSearchGames = await BoardGame.findAll({
        where: {
          minPlayers: { [Op.lte]: userQuizResult.players },
          maxPlayers: { [Op.gte]: userQuizResult.players },
        },
      });
      const searchGames = JSON.parse(JSON.stringify(userSearchGames));
      recommendedGames = searchGames.filter((game) => {
        return (
          quizTheme.some((theme) => game.theme.includes(theme)) ||
          quizGenre.some((genre) => game.genre.includes(genre))
        );
      });
    }

    res.status(200).json({
      currentUser,
      favoriteGames,
      feedbacks,
      questionsAndAnswers,
      userMeetings,
      userCamps,
      recommendedGames,
    });
  } catch (error) {
    console.error("Error while get profile first data:", error);
    res.status(500).json({ error: "Error while get profile first data" });
  }
});

module.exports = router;
