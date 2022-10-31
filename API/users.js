const express = require("express");
const usersRouter = express.Router();
const { getAllUsers } = require("../db");

usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.send({
    users,
  });
});

usersRouter.post("/login", async (req, res, next) => {
  console.log("made into login");
  const { username, password } = req.body;
  console.log(username, password);
  res.send();
});

module.exports = usersRouter;
