const express = require("express");
const router = express.Router();
const { Estimation } = require("../../db/models"); 


router.post("/api/rates", async (req, res) => {
  const { user_id, game_id, value } = req.body; 

    try {
      const findRate = await Estimation.findOne({where: {user_id, game_id: Number(game_id) }});
        if (!findRate) { 
          await Estimation.create({
            user_id,
            game_id: Number(game_id),
            value: value 
          });
          const estimationsArray = await Estimation.findAll({ where: { game_id: Number(game_id)}});

          const rateArr = estimationsArray.length;
          const result = (estimationsArray.reduce((acc, curr) => {
            return acc + Number(curr.value)
          }, 0) / rateArr).toFixed(1);
          return res.json({result, rateArr}); 
        }
        if (findRate) {
          await Estimation.destroy({ where: {
            user_id,
            game_id: Number(game_id),
          }});
          await Estimation.create({
            user_id,
            game_id: Number(game_id),
            value: value 
          });
          const estimationsArray = await Estimation.findAll({ where: { game_id: Number(game_id)}});
          const rateArr = estimationsArray.length;
          const result = (estimationsArray.reduce((acc, curr) => {
            return acc + Number(curr.value)
          }, 0) / rateArr).toFixed(1);
          return res.json({result, rateArr}); 
        }
    } catch (error) {
      console.error("Error when try to get new Rate:", error);
      return res.status(500).json({ error: "Error when try to get new Rate" });
    }
})

module.exports = router;


