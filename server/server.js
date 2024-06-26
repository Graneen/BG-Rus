const express = require("express");
const serverConfig = require("./config/serverConfig");

const mainRouter = require("./routes/api/main.router");
const authRouter = require("./routes/api/auth.router");
const boardGameRouter = require("./routes/views/boardGame.router");
const gameCampsRouter = require('./routes/views/gameCamp.routes');
const playerCampRouter = require("./routes/api/playerCamp.router");
const gameMeetNewMeet = require("./routes/api/gameNewMeet.routes");
const specialistRouter = require("./routes/views/specialist.routes");
const bayerOrderRouter = require("./routes/api/bayerOrder.router");
const commentBayersRouter = require("./routes/views/commentBayer.router")
const localizationOrderRouter = require("./routes/views/localization.router");




const app = express();
const PORT = 3000;
serverConfig(app);

app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/", boardGameRouter);
app.use('/', gameCampsRouter);
app.use('/', playerCampRouter);
app.use('/', gameMeetNewMeet);
app.use('/', specialistRouter);
app.use('/', bayerOrderRouter);
app.use('/', localizationOrderRouter);
app.use('/', commentBayersRouter);


app.listen(PORT, () => {
  console.log(`Server started port: ${PORT}`);
});
