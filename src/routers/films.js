const express = require("express");
const router = express.Router();
let { films } = require("../../data.js");

router.get("/", function (req, res) {
  let filteredFilms;
  if (Object.entries(req.query).length !== 0) {
    filteredFilms = films.filter(
      (film) => film.director === req.query.director
    );
    return res.json({ filteredFilms });
  }
  res.json({ films });
});

function check(res, req) {
  if (!films.some((film) => film.id === +req.params.id)) {
    return res.status(400).json({
      error: `film id: ${req.params.id} does not exist`,
    });
  }
}

router.get("/:id", function (req, res) {
  check(res, req);
  const film = films.find((film) => film.id === +req.params.id);

  res.json({ film });
});

router.post("/", function (req, res) {
  let id = films.length + 1;
  const film = { ...req.body, id };
  films.push(film);
  res.json({ film });
});

router.delete("/:id", function (req, res) {
  check(res, req);
  const film = films.find((film) => film.id === +req.params.id);
  films = films.filter((film) => film.id !== +req.params.id);
  res.json({ film });
});

router.put("/:id", function (req, res) {
  check(res, req);

  films = films.map((user) => {
    if (user.id === +req.params.id) {
      return { ...req.body, id: user.id };
    } else return user;
  });
  const film = films.find((films) => films.id === +req.params.id);
  res.json({ film });
});

router.patch("/:id", (req, res) => {
  check(res, req);

  const [key] = Object.keys(req.body);
  let foundIndex = films.findIndex((film) => film.id === +req.params.id);
  films[foundIndex][key] = req.body[key];
  res.json({ ...films[foundIndex] });
});

module.exports = router;
