const express = require("express");
const router = express.Router();

const { PlayerMeeting } = require("../../db/models");

router.post("/api/meeting/players", async (req, res) => {
  try {
    const { gameMeetingId, userId } = req.body;

    await PlayerMeeting.create({
      user_id: userId,
      gameMeeting_id: gameMeetingId,
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
