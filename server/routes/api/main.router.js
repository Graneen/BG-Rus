const express = require("express");

const router = express.Router();
const { User } = require("../../db/models");

///

router.get("/api/users", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name", "email", "password"],
    });
    const dataUsers = JSON.parse(JSON.stringify(users));
    res.send({ dataUsers });
  } catch (error) {
    console.log("ERROR WHILE GET USERS ARRAY: ", error);
    res.status(500).json({ message: "Error while get users list" });
  }
});

module.exports = router;
