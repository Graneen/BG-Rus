const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db/models");
const {
  generateToken,
  saveToken,
  logoutToken,
  validateRefreshToken,
  findToken,
} = require("../../middlewares/token-service");

router.post("/api/profile/update", async (req, res) => {
  try {
    const { user, name, email, password } = req.body;

    const findUser = await User.findByPk(Number(user));

    if (findUser && name && email && password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const updateUser = await findUser.update({
        name,
        email,
        password: hashedPassword,
      });
      const tokens = generateToken({
        id: updateUser.id,
        email: updateUser.email,
      });
      await saveToken(updateUser.id, tokens.refreshToken);

      res.cookie("refresh_token", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res
        .status(200)
        .json({
          token: tokens.accessToken,
          name: updateUser.name,
          email: updateUser.email,
        });
    } else {
      console.log("Не все поля заполнены");
      return res.json({ message: "Не все поля заполнены" });
    }
  } catch (error) {
    console.log("Err register", error);
    res.status(500).json({ message: "Error, while create user" });
  }
});
module.exports = router;
