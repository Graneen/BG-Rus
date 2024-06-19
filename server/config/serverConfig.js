const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const CORS = require('cors');
const cookieParser = require("cookie-parser");
const FileStore = require("session-file-store")(session);
const userSession = require('../middlewares/findUser')

const sessionConfig = {
  store: new FileStore(), // настройка файлового хранилища
  name: "user_sid", // имя куки для хранения id сессии
  secret: process.env.SESSION_SECRET ?? "14g8rgerg4re8g48vrew23", // для шифрования id сессии
  resave: false, // не пересохранять куку при каждом запросе
  saveUninitialized: false, // не создавать сессию без записи в req.session
  cookie: {
    maxAge: 1000 * 60 * 60 * 12, // срок действия куки в миллисекундах
    httpOnly: true
  },
};
const corsOptions = {
	origin: ['http://localhost:5173'],
	optionsSuccessStatus: 200,
	credentials: true, // принимать куки от сторонних источников
 };

const serverConfig = (app) => {
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static("public"));
  app.use(CORS(corsOptions));
  app.use(cookieParser())
  app.use(session(sessionConfig));
  app.use(userSession);

};

module.exports = serverConfig;
