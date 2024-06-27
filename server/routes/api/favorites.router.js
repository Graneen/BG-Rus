const express = require("express");
const router = express.Router();
const { FavoriteGames } = require("../../db/models"); 


router.post("/api/favorite/", async (req, res) => {
  const { user_id, game_id } = req.body;
    try {
      const findFav = await FavoriteGames.findOne({where: {user_id, game_id: Number(game_id) }});
        if (!findFav) { 
          return res.json(false);
        }
        if (findFav) {
          return res.json(findFav);
        }
    } catch (error) {
      console.error("Error when try to get new Favorite:", error);
      return res.status(500).json({ error: "Error when try to get new Favorite" });
    }
})


router.post("/api/favorites/add", async (req, res) => {
  try {
    const { user_id, game_id, toggler } = req.body; 
    const findCouple = await FavoriteGames.findOne({where: {user_id, game_id: Number(game_id) }});
      if (!findCouple) {
        const newFavoriteCouple = await FavoriteGames.create({
          user_id,
          game_id: Number(game_id),
          toggler
        });
        return res.json(newFavoriteCouple); 
      }
      if (findCouple) {
          await FavoriteGames.destroy({where: { user_id, game_id: Number(game_id) }});
          return res.json({
          game_id: Number(game_id),
          toggler: false
        });
  }
  } catch (error) {
    console.error("Error creating new Favorite Couple:", error);
    return res.status(500).json({ error: "Error creating new Favorite Couple" });
  }
});

module.exports = router;


