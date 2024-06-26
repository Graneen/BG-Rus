const express = require("express");
const router = express.Router();
const { FavoriteGames } = require("../../db/models"); 


router.post("/api/favorite/", async (req, res) => {
  const { id, user_id } = req.body; 
    try {
      const findFav = await FavoriteGames.findOne({where: {user_id, game_id: Number(id) }});
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
    const { id, user_id, toggler } = req.body; 
      console.log(req.body)
    const findCouple = await FavoriteGames.findOne({where: {user_id, game_id: Number(id) }});
      if (!findCouple) {
        const newFavoriteCouple = await FavoriteGames.create({
          user_id,
          game_id: Number(id),
          toggler
        });
        return res.json(newFavoriteCouple); 
      }
      if (findCouple) {
          await FavoriteGames.destroy({where: { user_id, game_id: Number(id) }});
          return res.json({
          game_id: Number(id),
          toggler: false
        });
  }
  } catch (error) {
    console.error("Error creating new Favorite Couple:", error);
    return res.status(500).json({ error: "Error creating new Favorite Couple" });
  }
});

module.exports = router;


