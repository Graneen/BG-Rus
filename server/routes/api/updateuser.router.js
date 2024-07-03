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
    if (user && (name.length || email.length || password.length)) {
      const findUser = await User.findByPk(Number(user));

      const hashedPassword = await bcrypt.hash(password, 10);

      const whereBD = {};
      findUser.name !== name && name ? (whereBD.name = name) : whereBD;
      findUser.email !== email && email ? (whereBD.email = email) : whereBD;
      hashedPassword && password
        ? (whereBD.password = hashedPassword)
        : whereBD;

      const updateUser = await findUser.update(whereBD);

      const tokens = generateToken({
        id: updateUser.id,
        email: updateUser.email,
      });
      await saveToken(updateUser.id, tokens.refreshToken);
      res.cookie("refresh_token", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        token: tokens.accessToken,
        name: updateUser.name,
        email: updateUser.email,
      });
    } else {
      return res.status(204).json({ message: "Поля не заполнены" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error, while create user" });
  }
});
module.exports = router;
