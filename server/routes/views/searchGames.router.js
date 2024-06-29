//! GET path "/search_game"
const express = require("express");
const { BoardGame } = require("../../db/models");

const searchGamesRouter = express.Router();

searchGamesRouter.get("/", async (req, res) => {
    try {
        const allGame = JSON.parse(JSON.stringify(
            await BoardGame.findAll({ attributes: ["id", "title"], })
        ));

        res.status(200).json(allGame);
    } catch (error) {
        console.log({message: "error search game", error});
    }
});

module.exports = searchGamesRouter;