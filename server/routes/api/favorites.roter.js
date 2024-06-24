const express = require("express");
const router = express.Router();
const { Favorites } = require("./../../db/models"); 

router.post("/game-meetings/news", async (req, res) => {
  try {
    const { game_id,  } = req.body; 

    const newFavoritePare = await Favorites.create({
      game_id,

    });

    return res.status(201).json(newFavoritePare); 
  } catch (error) {
    console.error("Error creating new Favorite Pare:", error);
    return res.status(500).json({ error: "Error creating new Favorite Pare" });
  }
});

module.exports = router;