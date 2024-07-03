// const express = require("express");
// const router = express.Router();
// const { GameMeeting } = require("./../../db/models"); 

// router.post("/api/game-meetings/news", async (req, res) => {
//   try {
//     const { game_id, name, gameName, maxPlayers, location, date, time } = req.body; 

//     const newGameMeeting = await GameMeeting.create({
//       game_id,
//       name,
//       gameName,
//       maxPlayers,
//       location,
//       date,
//       time,
//     });

//     return res.status(201).json(newGameMeeting); 
//   } catch (error) {
//     console.error("Error creating Game Meeting:", error);
//     return res.status(500).json({ error: "Error creating Game Meeting" });
//   }
// });

// module.exports = router;