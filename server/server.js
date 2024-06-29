const express = require("express");
const serverConfig = require("./config/serverConfig");

const mainRouter = require("./routes/api/main.router");
const authRouter = require("./routes/api/auth.router");
const boardGameRouter = require("./routes/views/boardGame.router");
const gameCampsRouter = require("./routes/views/gameCamp.routes");
const playerCampRouter = require("./routes/api/playerCamp.router");
const gameMeetNewMeet = require("./routes/api/gameNewMeet.routes");
const specialistRouter = require("./routes/views/specialist.routes");
const bayerOrderRouter = require("./routes/api/bayerOrder.router");
const commentBayersRouter = require("./routes/views/commentBayer.router")
const localizationOrderRouter = require("./routes/views/localization.router");
const favoritesRouter = require("./routes/api/favorites.router");
const profileRouter = require("./routes/api/profile.router");
const quizRouter = require("./routes/api/quiz.router");
const estimatesRouter = require("./routes/api/estimates.router")
const searchGamesRouter = require("./routes/views/searchGames.router");


const app = express();
const PORT = 3000;
serverConfig(app);

app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/", boardGameRouter);
app.use("/", gameCampsRouter);
app.use("/", playerCampRouter);
app.use("/", gameMeetNewMeet);
app.use("/", specialistRouter);
app.use("/", bayerOrderRouter);
app.use("/", localizationOrderRouter);
app.use("/", profileRouter);
app.use('/', favoritesRouter);
app.use('/', estimatesRouter);
app.use('/', commentBayersRouter);
app.use("/api/quiz", quizRouter);
app.use("/search_game", searchGamesRouter);




app.listen(PORT, () => {
  console.log(`Server started port: ${PORT}`);
});
