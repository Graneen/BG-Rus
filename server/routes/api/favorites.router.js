const express = require("express");
const router = express.Router();
const { FavoriteGames } = require("../../db/models"); 

router.post("/api/favorites/add", async (req, res) => {
  try {
    const { id, user_id } = req.body; 
      // console.log(req.body)
    const findCouple = await FavoriteGames.findOne({where: {user_id, game_id: id }});
      if (!findCouple) {
        const newFavoriteCouple = await FavoriteGames.create({
          user_id,
          game_id: id
        });
        return res.status(201).json(true); 
      }
      if (findCouple) {
          await FavoriteGames.destroy({where: { user_id, game_id: id }});
        return res.json(false);
  }
  } catch (error) {
    console.error("Error creating new Favorite Couple:", error);
    return res.status(500).json({ error: "Error creating new Favorite Couple" });
  }
});

module.exports = router;


