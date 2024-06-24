const express = require("express");
const router = express.Router();
const { FavoriteGames } = require("../../db/models"); 

router.post("/api/favorites/add", async (req, res) => {
  try {
    const { id, user_id } = req.body; 
      console.log(req.body)
    const newFavoritePare = await FavoriteGames.create({
      user_id,
      game_id: id
    });

    return res.status(201).json(newFavoritePare); 
  } catch (error) {
    console.error("Error creating new Favorite Pare:", error);
    return res.status(500).json({ error: "Error creating new Favorite Pare" });
  }
});

module.exports = router;