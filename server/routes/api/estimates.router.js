const express = require("express");
const router = express.Router();
const { Estimation } = require("../../db/models"); 


router.post("/api/rates", async (req, res) => {
  const { user_id, game_id, value } = req.body; 
  console.log(req.body) 
    try {
      const findRate = await Estimation.findOne({where: {user_id, game_id: Number(game_id) }});
        if (!findRate) { 
          const newRateCouple = await Estimation.create({
            user_id,
            game_id: Number(game_id),
            value: value 
          });
          return res.json(newRateCouple); 
        }
        if (findRate) {
          await Estimation.destroy({ where: {
            user_id,
            game_id: Number(game_id),
          }});
          const newRateCouple = await Estimation.create({
            user_id,
            game_id: Number(game_id),
            value: value 
          });
          const estimationsArray = await Estimation.findAll({ where: { game_id: Number(game_id)}});
          const result = (estimationsArray.reduce((acc, curr) => {
            return acc + Number(curr.value)
          }, 0) / estimationsArray.length).toFixed(1);
          console.log(result)
          return res.json(result); 
        }
    } catch (error) {
      console.error("Error when try to get new Rate:", error);
      return res.status(500).json({ error: "Error when try to get new Rate" });
    }
})

module.exports = router;


