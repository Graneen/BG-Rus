const express = require("express");
const serverConfig = require("./config/serverConfig");

const mainRouter = require("./routes/api/main.router");
const authRouter = require("./routes/api/auth.router");
const boardGameRouter = require("./routes/api/boardGame.router")
const gameCampsRouter = require('./routes/api/gameCamp.routes');
const playerCampRouter = require("./routes/api/playerCamp.router")




const app = express();
const PORT = 3000;
serverConfig(app);

app.use("/", mainRouter);
app.use("/auth", authRouter);
app.use("/", boardGameRouter);
app.use('/', gameCampsRouter);
app.use('/', playerCampRouter);

app.listen(PORT, () => {
  console.log(`Server started port: ${PORT}`);
});
