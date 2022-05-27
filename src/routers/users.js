const express = require("express");
const router = express.Router();

const { users } = require("../../data.js");

let id = users.length;

router.get("/", (req, res) => {
  res.json({ users });
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);
  res.json({ user });
});

router.post("/", (req, res) => {
  const user = { ...req.body, id: id++ };
  users.push(user);
  res.json({ user });
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);
  console.log(user);
  users.splice(users.indexOf(user), 1);
  res.json(user);
});

router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);
  user.email = req.body.email;
  res.json({ user });
});

module.exports = router;
