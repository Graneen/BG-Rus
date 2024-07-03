const express = require("express");
const router = express.Router();
const { GameCamp } = require("../../db/models");

router.get("/api/gameCamps", async (req, res) => {
  try {
    const gameCamps = await GameCamp.findAll();
    res.json(gameCamps);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
