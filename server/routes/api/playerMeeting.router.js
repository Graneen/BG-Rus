const express = require("express");
const router = express.Router();

const { PlayerMeeting } = require("../../db/models");

router.post("/api/meeting/players", async (req, res) => {
  console.log("yyyyyyyyyyyyyyyyyyyyyyyyy", req.body);
  try {
    const { gameMeetingId, userId } = req.body;
    console.log(req.body)
    await PlayerMeeting.create({
      user_id: Number(userId),
      gameMeeting_id: Number(gameMeetingId),
    });
    return res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
